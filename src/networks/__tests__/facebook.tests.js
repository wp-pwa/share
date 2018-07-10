import { when } from 'mobx';
import Facebook from '../facebook';

describe('Share > Facebook', () => {
  test('url', () => {
    const facebook = Facebook.create({});
    Object.defineProperty(facebook, 'entityLink', {
      value: jest.fn(),
      writable: true,
    });
    facebook.entityLink.mockReturnValueOnce(
      'https://demo.frontity.com/the-beauty-of-gullfoss',
    );

    expect(
      facebook.url({ type: 'post', id: 60, quote: 'q', hashtag: '#tag' }),
    ).toMatchSnapshot();
  });

  test('requestCount success', async () => {
    const request = {
      get: jest.fn(() => ({
        accept: jest.fn().mockResolvedValueOnce({
          body: {
            share: {
              comment_count: 0,
              share_count: 123,
            },
            id: 'https://demo.frontity.com/the-beauty-of-gullfoss',
          },
        }),
      })),
    };
    const facebook = Facebook.create({}, { request });

    Object.defineProperty(facebook, 'entityLink', {
      value: jest.fn(),
      writable: true,
    });

    facebook.entityLink.mockReturnValueOnce(
      'https://demo.frontity.com/the-beauty-of-gullfoss',
    );

    facebook.requestCount({ type: 'post', id: 60 });

    await when(() => facebook.count({ type: 'post', id: 60 }));

    expect(facebook.count({ type: 'post', id: 60 })).toBe(123);
    expect(facebook.entityLink.mock.calls).toMatchSnapshot();
    expect(facebook.entityLink.mock.results).toMatchSnapshot();
    expect(request.get.mock.calls).toMatchSnapshot();
    expect(request.get.mock.results).toMatchSnapshot();
  });

  test('requestCount fails', async () => {
    const request = {
      get: jest.fn(() => ({
        accept: jest
          .fn()
          .mockResolvedValueOnce('fail')
          .mockResolvedValueOnce({ bad: 'response' }),
      })),
    };
    const facebook = Facebook.create({}, { request });
    Object.defineProperty(facebook, 'entityLink', {
      value: jest.fn(),
      writable: true,
    });
    facebook.entityLink.mockReturnValue(
      'https://demo.frontity.com/the-beauty-of-gullfoss',
    );

    // First request (request fails)
    await facebook.requestCount({ type: 'post', id: 60 });
    expect(facebook.count({ type: 'post', id: 60 })).toBe(null);

    // Second request (bad response)
    await facebook.requestCount({ type: 'post', id: 60 });
    expect(facebook.count({ type: 'post', id: 60 })).toBe(null);

    expect(request.get.mock.calls).toMatchSnapshot();
  });
});
