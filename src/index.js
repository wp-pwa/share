import { types } from 'mobx-state-tree';
import All from './all';
import Facebook from './facebook';

const networks = {
  facebook: types.optional(Facebook, {}),
};

export default types
  .model('Share')
  .props({
    all: types.optional(All, {}),
    ...networks,
  })
  .views(self => ({
    get networks() {
      return Object.keys(networks).map(network => self[network]);
    },
  }));
