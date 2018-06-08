import { format } from 'url';
import Network from './network';

export default Network.named('Twitter').views(self => ({
  url({ type, id, text, via, hashtags }) {
    const url = self.entityLink({ type, id });
    return format({
      protocol: 'https:',
      host: 'twitter.com',
      pathname: 'share',
      query: {
        url,
        text,
        via,
        hashtags: hashtags.join(','),
      },
    });
  },
}));
