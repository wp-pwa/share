import { types } from 'mobx-state-tree';
import { get } from 'mobx';

export default types
  .model('Network')
  .props({
    itemMap: types.optional(types.map(types.number), {}),
  })
  .views(self => ({
    count({ type, id }) {
      return get(self.itemMap, `${type}_${id}`);
    },
  }));
