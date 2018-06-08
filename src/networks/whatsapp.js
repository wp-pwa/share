import { format } from 'url';
import Network from './network';

export default Network.named('Whatsapp').views(self => ({
  url({ type, id, text }) {
    const link = self.entityLink({ type, id });
    return format({
      protocol: 'https:',
      host: 'api.whatsapp.com',
      pathname: 'send',
      query: {
        text: `${text} ${link}`,
      },
    });
  },
}));
