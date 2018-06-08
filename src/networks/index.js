import { types } from 'mobx-state-tree';
import All from './all';
import Facebook from './facebook';
import GooglePlus from './google-plus';
import Linkedin from './linkedin';
import Twitter from './twitter';
import Whatsapp from './whatsapp';
import Telegram from './telegram';
import Email from './email';
import Pinterest from './pinterest';

export const all = types.optional(All, {});

export default {
  facebook: types.optional(Facebook, {}),
  googlePlus: types.optional(GooglePlus, {}),
  linkedin: types.optional(Linkedin, {}),
  twitter: types.optional(Twitter, {}),
  whatsapp: types.optional(Whatsapp, {}),
  telegram: types.optional(Telegram, {}),
  email: types.optional(Email, {}),
  pinterest: types.optional(Pinterest, {}),
};
