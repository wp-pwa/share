import { types, unprotect } from 'mobx-state-tree';
import { set } from 'mobx';
import { shareViews, shareActions } from '..';
import Network from '../network';

describe('Share', () => {
  test('allCounts', () => {
    const share = types
      .model('Share')
      .props({ facebook: types.optional(Network, {}) })
      .views(shareViews)
      .actions(shareActions)
      .create({});

    unprotect(share);

    expect(share.allCounts({ type: 'post', id: 60 })).toBe(null);

    set(share.facebook.countsMap, { post_60: 123 });
    expect(share.facebook.count({ type: 'post', id: 60 })).toBe(123);
    expect(share.allCounts({ type: 'post', id: 60 })).toBe(123);
  });

  test('requestAllCounts', async () => {
    const requestCount = jest.fn();
    const NetworkMock = Network.actions(() => ({ requestCount }));

    const share = types
      .model('Share')
      .props({ facebook: types.optional(NetworkMock, {}) })
      .views(shareViews)
      .actions(shareActions)
      .create({});

    share.requestAllCounts({ type: 'post', id: 60 });
    expect(requestCount.mock.calls.length).toBe(share.networks.length);
    expect(requestCount.mock.calls).toMatchSnapshot();
  });
});
