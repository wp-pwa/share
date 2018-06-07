import { when } from 'mobx';
import Facebook from '../facebook';

describe('Share > Facebook', () => {
  test('url', () => {
    const entityLinkMock = { entityLink: jest.fn() };

    const facebook = Facebook.named('FacebookMocked')
      .views(() => entityLinkMock)
      .create({});

    const entityLink = 'https://demo.frontity.com/the-beauty-of-gullfoss';
    facebook.entityLink.mockReturnValueOnce(entityLink);

    expect(facebook.url({ type: 'post', id: 60, quote: 'q', hashtag: '#tag' })).toMatchSnapshot();
    expect(facebook.entityLink.mock.calls).toMatchSnapshot();
    expect(facebook.entityLink.mock.results).toMatchSnapshot();
  });

  test('requestCount success', async done => {
    const request = jest.fn().mockReturnValue(
      Promise.resolve({
        share: {
          comment_count: 0,
          share_count: 123,
        },
        id: 'https://demo.frontity.com/the-beauty-of-gullfoss',
      }),
    );

    const entityLinkMock = { entityLink: jest.fn() };
    const facebook = Facebook.named('FacebookMocked')
      .views(() => entityLinkMock)
      .create({}, { request });

    const entityLink = 'https://demo.frontity.com/the-beauty-of-gullfoss';
    facebook.entityLink.mockReturnValueOnce(entityLink);

    when(
      () => facebook.count({ type: 'post', id: 60 }),
      () => {
        expect(facebook.count({ type: 'post', id: 60 })).toBe(123);
        expect(facebook.entityLink.mock.calls).toMatchSnapshot();
        expect(facebook.entityLink.mock.results).toMatchSnapshot();
        expect(request.mock.calls).toMatchSnapshot();
        expect(request.mock.results).toMatchSnapshot();
        done();
      },
    );

    await facebook.requestCount({ type: 'post', id: 60 });
  });

  test('requestCount fails', async () => {
    const request = jest.fn();

    const entityLinkMock = { entityLink: jest.fn() };
    const facebook = Facebook.named('FacebookMocked')
      .views(() => entityLinkMock)
      .create({}, { request });

    const entityLink = 'https://demo.frontity.com/the-beauty-of-gullfoss';
    facebook.entityLink.mockReturnValue(entityLink);

    // First request (request fails)
    request.mockReturnValue(Promise.reject(new Error()));
    await facebook.requestCount({ type: 'post', id: 60 });
    expect(facebook.count({ type: 'post', id: 60 })).toBe(null);

    // Second request (bad response)
    request.mockReturnValue(Promise.resolve({ bad: 'response'}));
    await facebook.requestCount({ type: 'post', id: 60 });
    expect(facebook.count({ type: 'post', id: 60 })).toBe(null);

    expect(request.mock.calls).toMatchSnapshot();
  });
});
