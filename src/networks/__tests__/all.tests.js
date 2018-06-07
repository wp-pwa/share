import { types, unprotect } from 'mobx-state-tree';
import { set } from 'mobx';
import All from '../all';
import Network from '../network';

describe('Share > All', () => {
  test('count', () => {
    const share = types
      .model('Share')
      .props({
        all: types.optional(All, {}),
        network1: types.optional(Network, {}),
        network2: types.optional(Network, {}),
      })
      .views(self => ({
        get networks() {
          return [self.network1, self.network2];
        },
      }))
      .create({});

    unprotect(share);

    expect(share.all.count({ type: 'post', id: 60 })).toBe(null);

    set(share.network1.countsMap, { post_60: 123 });
    expect(share.network1.count({ type: 'post', id: 60 })).toBe(123);
    expect(share.all.count({ type: 'post', id: 60 })).toBe(123);

    set(share.network2.countsMap, { post_60: 111 });
    expect(share.network2.count({ type: 'post', id: 60 })).toBe(111);
    expect(share.all.count({ type: 'post', id: 60 })).toBe(234);
  });

  test('requestCount', async () => {
    const requestCount = jest.fn();
    const NetworkMock = Network.actions(() => ({ requestCount }));

    const share = types
      .model('Share')
      .props({
        all: types.optional(All, {}),
        network1: types.optional(NetworkMock, {}),
        network2: types.optional(NetworkMock, {}),
      })
      .views(self => ({
        get networks() {
          return [self.network1, self.network2];
        },
      }))
      .create({});

    share.all.requestCount({ type: 'post', id: 60 });
    expect(requestCount.mock.calls.length).toBe(share.networks.length);
    expect(requestCount.mock.calls).toMatchSnapshot();
  });
});
