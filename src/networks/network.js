import { getRoot, types } from 'mobx-state-tree';
import { get } from 'mobx';

export default types
  .model('Network')
  .props({
    countsMap: types.optional(types.map(types.maybe(types.number)), {}),
  })
  .views(self => ({
    count({ type, id }) {
      return get(self.countsMap, `${type}_${id}`);
    },
    entityLink({ type, id }) {
      return getRoot(self).connection.entity(type, id).link;
    },
  }));
