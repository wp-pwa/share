import Share from '..';

describe('Share', () => {
  test('works', () => {
    const share = Share.create({});
    expect(share.isWorking).toBe(true);
  });
});
