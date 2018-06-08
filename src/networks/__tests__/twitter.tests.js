import Twitter from '../twitter';

describe('Share > Twitter', () => {
  test('url', () => {
    const twitter = Twitter.create({});
    twitter.entityLink = jest.fn();
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

    expect(twitter.entityLink.mock.calls).toMatchSnapshot();
    expect(twitter.entityLink.mock.results).toMatchSnapshot();
  });
});
