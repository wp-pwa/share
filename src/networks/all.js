import { getParent, flow } from 'mobx-state-tree';
import Network from './network';

export default Network.named('All')
  .views(self => ({
    count({ type, id }) {
      try {
        return getParent(self)
          .networks.map(network => network.count({ type, id }))
          .filter(count => typeof count === 'number')
          .reduce((all, count) => all + count);
      } catch (error) {
        return null;
      }
    },
  }))
  .actions(self => ({
    requestCount: flow(function* requestAllCounts({ type, id }) {
      yield Promise.all(
        getParent(self)
          .networks.filter(network => typeof network.requestCount === 'function')
          .map(network => network.requestCount({ type, id })),
      );
    }),
  }));
