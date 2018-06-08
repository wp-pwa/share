import { when } from 'mobx';
import Linkedin from '../linkedin';

describe('Share > Linkedin', () => {
  test('url', () => {
    const linkedin = Linkedin.create({});
    linkedin.entityLink = jest.fn();
    linkedin.entityLink.mockReturnValueOnce('https://demo.frontity.com/the-beauties-of-gullfoss');

    expect(
      linkedin.url({
        type: 'post',
        id: 60,
        title: 'The Beauties of Gullfoss',
        summary:
          'Gullfoss is a waterfall located in the canyon of the Hvítá river in southwest Iceland.',
      }),
    ).toMatchSnapshot();

    expect(linkedin.entityLink.mock.calls).toMatchSnapshot();
    expect(linkedin.entityLink.mock.results).toMatchSnapshot();
  });

  test('requestCount success', done => {
    const request = { get: jest.fn() };
    const linkedin = Linkedin.create({}, { request });
    linkedin.entityLink = jest.fn();
    linkedin.entityLink.mockReturnValueOnce('https://demo.frontity.com/the-beauties-of-gullfoss');

    request.get.mockResolvedValueOnce(
      'IN.Tags.Share.handleCount({"count":123,"fCnt":"0","fCntPlusOne":"1","url":"https://demo.frontity.com/the-beauties-of-gullfoss"});',
    );

    when(
      () => linkedin.count({ type: 'post', id: 60 }),
      () => {
        expect(linkedin.count({ type: 'post', id: 60 })).toBe(123);
        expect(linkedin.entityLink.mock.calls).toMatchSnapshot();
        expect(linkedin.entityLink.mock.results).toMatchSnapshot();
        expect(request.get.mock.calls).toMatchSnapshot();
        expect(request.get.mock.results).toMatchSnapshot();
        done();
      },
    );

    linkedin.requestCount({ type: 'post', id: 60 });
  });

  test('requestCount fails', async () => {
    const request = { get: jest.fn() };
    const linkedin = Linkedin.create({}, { request });
    linkedin.entityLink = jest.fn();
    linkedin.entityLink.mockReturnValue('https://demo.frontity.com/the-beauties-of-gullfoss');

    // First request (request fails)
    request.get.mockRejectedValueOnce('fail');
    await linkedin.requestCount({ type: 'post', id: 60 });
    expect(linkedin.count({ type: 'post', id: 60 })).toBe(null);

    // Second request (bad response)
    request.get.mockResolvedValueOnce({ bad: 'response' });
    await linkedin.requestCount({ type: 'post', id: 60 });
    expect(linkedin.count({ type: 'post', id: 60 })).toBe(null);

    expect(request.get.mock.calls).toMatchSnapshot();
  });
});
