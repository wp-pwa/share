import { getEnv, flow } from 'mobx-state-tree';
import { set } from 'mobx';
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
  }))
  .actions(self => ({
    requestCount: flow(function* requestCountLinkedin({ type, id }) {
      const link = self.entityLink({ type, id });
      const requestUrl = format({
        protocol: 'https:',
        host: 'www.linkedin.com',
        pathname: 'countserv/count/share',
        query: { url: link },
      });


      let count;
      try {
        const response = yield getEnv(self).request.get(requestUrl);
        const data = /^IN.Tags.Share.handleCount\((.+)\)/.exec(response)[1];
        ({ count } = JSON.parse(data));
      } catch (error) {
        count = null;
      }

      set(self.countsMap, { [`${type}_${id}`]: count });
    }),
  }));
