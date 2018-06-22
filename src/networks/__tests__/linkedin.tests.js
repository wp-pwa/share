import Linkedin from '../linkedin';

describe('Share > Linkedin', () => {
  test('url', () => {
    const linkedin = Linkedin.create({});
    Object.defineProperty(linkedin, 'entityLink', {value: jest.fn(), writable: true});
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
  });
});
