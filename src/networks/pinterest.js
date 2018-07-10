import { format } from 'url';
import Network from './network';

export default Network.named('Pinterest').views(self => ({
  url({ type, id, media, description }) {
    const url = self.entityLink({ type, id });
    return format({
      protocol: 'https:',
      host: 'pinterest.com',
      pathname: 'pin/create/button',
      query: { url, media, description },
    });
  },
}));
