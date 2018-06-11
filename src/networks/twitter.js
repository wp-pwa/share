import { format } from 'url';
import Network from './network';

export default Network.named('Twitter').views(self => ({
  url({ type, id, text, via, hashtags }) {
    const url = self.entityLink({ type, id });

    const query = { url };
    if (text) query.text = text;
    if (via) query.via = via;
    if (hashtags) query.hashtags = hashtags.join(',');

    return format({
      protocol: 'https:',
      host: 'twitter.com',
      pathname: 'share',
      query,
    });
  },
}));
