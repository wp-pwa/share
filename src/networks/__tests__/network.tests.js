import { types, unprotect } from 'mobx-state-tree';
import { set, when } from 'mobx';
import Network from '../network';

describe('Share > Network', () => {
  test('count', done => {
    const network = Network.create({ countsMap: { post_63: 9001 } });
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

  test('entityLink', () => {
    const link1 = 'https://demo.frontity.com/the-beauty-of-gullfoss';
    const link2 = 'https://demo.frontity.com/shinjuku-gyoen-national-garden';

    const Stores = types.model('Stores', {
      theme: types.optional(
        types.model('Theme', {
          share: types.model('Share', { network1: types.optional(Network, {}) }),
        }),
        { share: {} },
      ),
      connection: types.optional(types.frozen, {
        entity: jest
          .fn()
          .mockReturnValueOnce({ link: link1 })
          .mockReturnValueOnce({ link: link2 }),
      }),
    });

    const stores = Stores.create({});

    expect(stores.theme.share.network1.entityLink({ type: 'post', id: 63 })).toBe(link1);
    expect(stores.theme.share.network1.entityLink({ type: 'post', id: 60 })).toBe(link2);
  });
});
