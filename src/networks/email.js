import { format } from 'url';
import Network from './network';

export default Network.named('Email').views(self => ({
  url({ type, id, subject, body }) {
    const link = self.entityLink({ type, id });
    return format({
      protocol: 'mailto:',
      query: {
        to: '',
        subject,
        body: body ? `${body}\n\n${link}` : link,
      },
    });
  },
}));
