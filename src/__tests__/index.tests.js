import { getType } from 'mobx-state-tree';
import Share from '../';

describe('Share', () => {
  test('networks', () => {
    const share = Share.create({});
    expect(share).toMatchSnapshot();
    expect(share.networks.map(n => getType(n).name)).toMatchSnapshot();
  });
});
