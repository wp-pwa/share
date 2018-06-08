import Whatsapp from '../whatsapp';

describe('Share > Whatsapp', () => {
  test('url', () => {
    const whatsapp = Whatsapp.create({});
    whatsapp.entityLink = jest.fn();
    whatsapp.entityLink.mockReturnValueOnce('https://demo.frontity.com/the-beauties-of-gullfoss');

    expect(
      whatsapp.url({
        type: 'post',
        id: 60,
        text: 'The Beauties of Gullfoss',
      }),
    ).toMatchSnapshot();

    expect(whatsapp.entityLink.mock.calls).toMatchSnapshot();
    expect(whatsapp.entityLink.mock.results).toMatchSnapshot();
  });
});
