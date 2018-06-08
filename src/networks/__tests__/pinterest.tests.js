import { when } from 'mobx';
import Pinterest from '../pinterest';

describe('Share > Pinterest', () => {
  test('url', () => {
    const pinterest = Pinterest.create({});
    pinterest.entityLink = jest.fn();
    pinterest.entityLink.mockReturnValueOnce('https://demo.frontity.com/the-beauties-of-gullfoss');

    expect(
      pinterest.url({
        type: 'post',
        id: 60,
        media: 'https://demo.frontity.com/wp-content/uploads/2016/11/Iceland-test-1200x726.jpg',
        description:
          'Gullfoss is a waterfall located in the canyon of the Hvítá river in southwest Iceland.',
      }),
    ).toMatchSnapshot();
  });

  test('requestCount success', done => {
    const request = { get: jest.fn() };
    const pinterest = Pinterest.create({}, { request });
    pinterest.entityLink = jest.fn();
    pinterest.entityLink.mockReturnValueOnce('https://demo.frontity.com/the-beauties-of-gullfoss');

    request.get.mockResolvedValueOnce({
      text: 'cb({"url":"https://demo.frontity.com/the-beauties-of-gullfoss","count":123})',
    });

    when(
      () => pinterest.count({ type: 'post', id: 60 }),
      () => {
        expect(pinterest.count({ type: 'post', id: 60 })).toBe(123);
        expect(pinterest.entityLink.mock.calls).toMatchSnapshot();
        expect(pinterest.entityLink.mock.results).toMatchSnapshot();
        expect(request.get.mock.calls).toMatchSnapshot();
        expect(request.get.mock.results).toMatchSnapshot();
        done();
      },
    );

    pinterest.requestCount({ type: 'post', id: 60 });
  });

  test('requestCount fails', async () => {
    const request = { get: jest.fn() };
    const pinterest = Pinterest.create({}, { request });
    pinterest.entityLink = jest.fn();
    pinterest.entityLink.mockReturnValue('https://demo.frontity.com/the-beauties-of-gullfoss');

    // First request (request fails)
    request.get.mockRejectedValueOnce('fail');
    await pinterest.requestCount({ type: 'post', id: 60 });
    expect(pinterest.count({ type: 'post', id: 60 })).toBe(null);

    // Second request (bad response)
    request.get.mockResolvedValueOnce({ bad: 'response' });
    await pinterest.requestCount({ type: 'post', id: 60 });
    expect(pinterest.count({ type: 'post', id: 60 })).toBe(null);

    expect(request.get.mock.calls).toMatchSnapshot();
  });
});
