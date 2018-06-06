import { types, flow } from 'mobx-state-tree';
import Facebook from './facebook';

export default types
  .model('Share')
  .props({
    facebook: types.optional(Facebook, {}),
  })
  .views(self => ({
    get networks() {
      return [self.facebook];
    },
    allCounts({ type, id }) {
      return self.networks
        .map(network => network.count({ type, id }))
        .reduce((all, count) => all + count);
    },
  }))
  .actions(self => ({
    requestAllCounts: flow(function* requestAllCounts({ type, id }) {
      yield Promise.all(self.networks.map(network => network.requestCount({ type, id })));
    }),
  }));
