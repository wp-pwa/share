import { types } from 'mobx-state-tree';

const something = { a: 1 };

export default types
  .model('Share')
  .props({
    isWorking: true,
    something: types.optional(types.frozen, { ...something }),
  });
