import { types } from 'mobx-state-tree';
import All from './all';
import Facebook from './facebook';
import GooglePlus from './google-plus';

export const all = types.optional(All, {});

export default {
  facebook: types.optional(Facebook, {}),
  googlePlus: types.optional(GooglePlus, {}),
};
