import { types, flow } from 'mobx-state-tree';
import Facebook from './facebook';

export const shareViews = self => ({
  get networks() {
    return [self.facebook];
  },
  allCounts({ type, id }) {
    try {
      return self.networks
        .map(network => network.count({ type, id }))
        .filter(count => typeof count === 'number')
        .reduce((all, count) => all + count);
    } catch (error) {
      return null;
    }
  },
});

export const shareActions = self => ({
  requestAllCounts: flow(function* requestAllCounts({ type, id }) {
    yield Promise.all(self.networks.map(network => network.requestCount({ type, id })));
  }),
});

export default types
  .model('Share')
  .props({
    facebook: types.optional(Facebook, {}),
  })
  .views(shareViews)
  .actions(shareActions);
