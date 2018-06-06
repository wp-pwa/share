import { types } from 'mobx-state-tree';

export default types
  .model('Share')
  .props({
    isWorking: true,
  });
