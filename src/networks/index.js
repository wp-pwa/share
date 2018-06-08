import { types } from 'mobx-state-tree';
import All from './all';
import Facebook from './facebook';
import GooglePlus from './google-plus';
import Linkedin from './linkedin';
import Twitter from './twitter';
import Whatsapp from './whatsapp';
import Email from './email';

export const all = types.optional(All, {});

export default {
  facebook: types.optional(Facebook, {}),
  googlePlus: types.optional(GooglePlus, {}),
  linkedin: types.optional(Linkedin, {}),
  twitter: types.optional(Twitter, {}),
  whatsapp: types.optional(Whatsapp, {}),
  email: types.optional(Email, {}),
};
