import { format } from 'url';
import Network from './network';

export default Network.named('Telegram').views(self => ({
  url({ type, id, text }) {
    const url = self.entityLink({ type, id });
    return format({
      protocol: 'https:',
      host: 'telegram.me',
      pathname: 'share',
      query: { url, text },
    });
  },
}));
