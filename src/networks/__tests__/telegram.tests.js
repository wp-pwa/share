import Telegram from '../telegram';

describe('Share > Telegram', () => {
  test('url', () => {
    const telegram = Telegram.create({});
    telegram.entityLink = jest.fn();
    telegram.entityLink.mockReturnValueOnce('https://demo.frontity.com/the-beauties-of-gullfoss');

    expect(
      telegram.url({
        type: 'post',
        id: 60,
        text: 'The Beauties of Gullfoss',
      }),
    ).toMatchSnapshot();
  });
});
