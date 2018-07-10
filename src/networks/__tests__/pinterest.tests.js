import Pinterest from '../pinterest';

describe('Share > Pinterest', () => {
  test('url', () => {
    const pinterest = Pinterest.create({});
    Object.defineProperty(pinterest, 'entityLink', {
      value: jest.fn(),
      writable: true,
    });
    pinterest.entityLink.mockReturnValueOnce(
      'https://demo.frontity.com/the-beauties-of-gullfoss',
    );

    expect(
      pinterest.url({
        type: 'post',
        id: 60,
        media:
          'https://demo.frontity.com/wp-content/uploads/2016/11/Iceland-test-1200x726.jpg',
        description:
          'Gullfoss is a waterfall located in the canyon of the Hvítá river in southwest Iceland.',
      }),
    ).toMatchSnapshot();
  });
});
