import { types, unprotect } from 'mobx-state-tree';
import { set } from 'mobx';
import All from '../all';
import Network from '../network';

let share;
beforeEach(() => {
  share = types
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
});

describe('Share > All', () => {
  test('count', () => {
    expect(share.all.count({ type: 'post', id: 60 })).toBe(null);

    set(share.network1.countsMap, { post_60: 100 });
    expect(share.network1.count({ type: 'post', id: 60 })).toBe(100);
    expect(share.all.count({ type: 'post', id: 60 })).toBe(100);

    set(share.network2.countsMap, { post_60: 200 });
    expect(share.network2.count({ type: 'post', id: 60 })).toBe(200);
    expect(share.all.count({ type: 'post', id: 60 })).toBe(300);
  });

  test('requestCount', async () => {
    const requestCount = jest.fn();
    share.network1.requestCount = requestCount;
    share.network2.requestCount = requestCount;

    share.all.requestCount({ type: 'post', id: 60 });
    expect(requestCount.mock.calls.length).toBe(share.networks.length);
    expect(requestCount.mock.calls).toMatchSnapshot();
  });
});
