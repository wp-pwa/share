import Whatsapp from '../whatsapp';

describe('Share > Whatsapp', () => {
  test('url - all parameters', () => {
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
  });

  test('url - required parameters', () => {
    const whatsapp = Whatsapp.create({});
    whatsapp.entityLink = jest.fn();
    whatsapp.entityLink.mockReturnValueOnce('https://demo.frontity.com/the-beauties-of-gullfoss');

    expect(
      whatsapp.url({
        type: 'post',
        id: 60,
      }),
    ).toMatchSnapshot();
  });
});
