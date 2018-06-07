import { unprotect } from 'mobx-state-tree';
import { set, when } from 'mobx';
import Network from '../network';

describe('Share > Network', () => {
  test('count', done => {
    const network = Network.create({ countsMap: { post_63: 9001 }});
    unprotect(network);

    expect(network.count({ type: 'post', id: 63 })).toBe(9001);
    expect(network.count({ type: 'post', id: 60 })).toBe(undefined);

    when(
      () => network.count({ type: 'post', id: 60 }),
      () => {
        expect(network.count({ type: 'post', id: 60 })).toBe(666);
        done();
      },
    );

    set(network.countsMap, { post_60: 666 });
  });
});
