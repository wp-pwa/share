import Email from '../email';

describe('Share > Email', () => {
  test('url', () => {
    const email = Email.create({});
    Object.defineProperty(email, 'entityLink', {value: jest.fn(), writable: true});
    email.entityLink.mockReturnValueOnce('https://demo.frontity.com/the-beauties-of-gullfoss');

    expect(
      email.url({
        type: 'post',
        id: 60,
        subject: 'The Beauties of Gullfoss',
        body:
          'Gullfoss is a waterfall located in the canyon of the Hvítá river in southwest Iceland.',
      }),
    ).toMatchSnapshot();
  });
});
