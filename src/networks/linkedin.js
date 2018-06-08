import { format } from 'url';
import Network from './network';

export default Network.named('Linkedin')
  .views(self => ({
    url({ type, id, title, summary }) {
      const link = self.entityLink({ type, id });
      return format({
        protocol: 'https:',
        host: 'www.linkedin.com',
        pathname: 'shareArticle',
        query: { url: link, title, summary },
      });
    },
  }));
