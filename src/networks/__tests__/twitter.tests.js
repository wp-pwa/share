import Twitter from '../twitter';

describe('Share > Twitter', () => {
  test('url - all parameters', () => {
    const twitter = Twitter.create({});
    Object.defineProperty(twitter, 'entityLink', {value: jest.fn(), writable: true});
    twitter.entityLink.mockReturnValueOnce('https://demo.frontity.com/the-beauties-of-gullfoss');

    expect(
      twitter.url({
        type: 'post',
        id: 60,
        text: 'The Beauties of Gullfoss',
        via: 'frontity.com',
        hashtags: ['frontity', 'gullfoss', 'beauties'],
      }),
    ).toMatchSnapshot();
  });

  test('url - required parameters', () => {
    const twitter = Twitter.create({});
    Object.defineProperty(twitter, 'entityLink', {value: jest.fn(), writable: true});
    twitter.entityLink.mockReturnValueOnce('https://demo.frontity.com/the-beauties-of-gullfoss');

    expect(
      twitter.url({
        type: 'post',
        id: 60,
      }),
    ).toMatchSnapshot();
  });
});
