import { types } from 'mobx-state-tree';
import networks, { all } from './networks';

export default types
  .model('Share')
  .props({ all, ...networks })
  .views(self => ({
    get networks() {
      return Object.keys(networks).map(network => self[network]);
    },
  }));
