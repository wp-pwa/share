import { when } from 'mobx';
import Facebook from '../facebook';

describe('Share > Facebook', () => {
  test('url', () => {
    const facebook = Facebook.create({});
    facebook.entityLink = jest.fn();
    facebook.entityLink.mockReturnValueOnce('https://demo.frontity.com/the-beauty-of-gullfoss');

    expect(facebook.url({ type: 'post', id: 60, quote: 'q', hashtag: '#tag' })).toMatchSnapshot();
  });

  test('requestCount success', done => {
    const request = { get: jest.fn() };
    const facebook = Facebook.create({}, { request });
    facebook.entityLink = jest.fn();
    facebook.entityLink.mockReturnValueOnce('https://demo.frontity.com/the-beauty-of-gullfoss');

    request.get.mockResolvedValueOnce({
      share: {
        comment_count: 0,
        share_count: 123,
      },
      id: 'https://demo.frontity.com/the-beauty-of-gullfoss',
    });

    when(
      () => facebook.count({ type: 'post', id: 60 }),
      () => {
        expect(facebook.count({ type: 'post', id: 60 })).toBe(123);
        expect(facebook.entityLink.mock.calls).toMatchSnapshot();
        expect(facebook.entityLink.mock.results).toMatchSnapshot();
        expect(request.get.mock.calls).toMatchSnapshot();
        expect(request.get.mock.results).toMatchSnapshot();
        done();
      },
    );

    facebook.requestCount({ type: 'post', id: 60 });
  });

  test('requestCount fails', async () => {
    const request = { get: jest.fn() };
    const facebook = Facebook.create({}, { request });
    facebook.entityLink = jest.fn();
    facebook.entityLink.mockReturnValue('https://demo.frontity.com/the-beauty-of-gullfoss');

    // First request (request fails)
    request.get.mockRejectedValueOnce('fail');
    await facebook.requestCount({ type: 'post', id: 60 });
    expect(facebook.count({ type: 'post', id: 60 })).toBe(null);

    // Second request (bad response)
    request.get.mockResolvedValueOnce({ bad: 'response' });
    await facebook.requestCount({ type: 'post', id: 60 });
    expect(facebook.count({ type: 'post', id: 60 })).toBe(null);

    expect(request.get.mock.calls).toMatchSnapshot();
  });
});
