import '@babel/polyfill';
import { types } from 'mobx-state-tree';
import All from './networks/all';
import Facebook from './networks/facebook';
import GooglePlus from './networks/google-plus';
import Linkedin from './networks/linkedin';
import Twitter from './networks/twitter';
import Whatsapp from './networks/whatsapp';
import Telegram from './networks/telegram';
import Email from './networks/email';
import Pinterest from './networks/pinterest';

const all = types.optional(All, {});

const networks = {
  facebook: types.optional(Facebook, {}),
  googlePlus: types.optional(GooglePlus, {}),
  linkedin: types.optional(Linkedin, {}),
  twitter: types.optional(Twitter, {}),
  whatsapp: types.optional(Whatsapp, {}),
  telegram: types.optional(Telegram, {}),
  email: types.optional(Email, {}),
  pinterest: types.optional(Pinterest, {}),
};

export default types
  .model('Share')
  .props({ all, ...networks })
  .views(self => ({
    get networks() {
      return Object.keys(networks).map(network => self[network]);
    },
  }));
