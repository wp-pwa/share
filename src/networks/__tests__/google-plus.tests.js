import { when } from 'mobx';
import GooglePlus from '../google-plus';

const requestMock = () => {
  const req = {};
  req.post = jest.fn(() => req);
  req.set = jest.fn(() => req);
  req.send = jest.fn();

  return req;
};

describe('Share > GooglePlus', () => {
  test('url', () => {
    const googlePlus = GooglePlus.create({});
    googlePlus.entityLink = jest.fn();
    googlePlus.entityLink.mockReturnValueOnce('https://demo.frontity.com/the-beauty-of-gullfoss');

    expect(googlePlus.url({ type: 'post', id: 60 })).toMatchSnapshot();
  });

  test('requestCount success', done => {
    const request = requestMock();
    const googlePlus = GooglePlus.create({}, { request });
    googlePlus.entityLink = jest.fn();
    googlePlus.entityLink.mockReturnValueOnce('https://demo.frontity.com/the-beauty-of-gullfoss');

    request.send.mockResolvedValueOnce({
      body: {
        id: 'p',
        result: {
          kind: 'pos#plusones',
          id: 'https://demo.frontity.com/the-beauty-of-gullfoss',
          isSetByViewer: false,
          metadata: {
            type: 'URL',
            globalCounts: {
              count: 123,
            },
          },
          abtk: '',
        },
      },
    });

    when(
      () => googlePlus.count({ type: 'post', id: 60 }),
      () => {
        expect(googlePlus.count({ type: 'post', id: 60 })).toBe(123);
        expect(googlePlus.entityLink.mock.calls).toMatchSnapshot();
        expect(googlePlus.entityLink.mock.results).toMatchSnapshot();
        expect(request).toMatchSnapshot();
        done();
      },
    );

    googlePlus.requestCount({ type: 'post', id: 60 });
  });

  test('requestCount fails', async () => {
    const request = requestMock();

    const googlePlus = GooglePlus.create({}, { request });
    googlePlus.entityLink = jest.fn();
    googlePlus.entityLink.mockReturnValue('https://demo.frontity.com/the-beauty-of-gullfoss');

    // First request (request fails)
    request.send.mockRejectedValueOnce('fail');
    await googlePlus.requestCount({ type: 'post', id: 60 });
    expect(googlePlus.count({ type: 'post', id: 60 })).toBe(null);

    // Second request (bad response)
    request.send.mockResolvedValueOnce({ bad: 'response' });
    await googlePlus.requestCount({ type: 'post', id: 60 });
    expect(googlePlus.count({ type: 'post', id: 60 })).toBe(null);

    expect(request.send.mock.calls).toMatchSnapshot();
  });
});
