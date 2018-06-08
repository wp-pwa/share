import { getEnv, flow } from 'mobx-state-tree';
import { set } from 'mobx';
import { format } from 'url';
import Network from './network';

export default Network.named('Facebook')
  .views(self => ({
    url({ type, id, quote, hashtag }) {
      const link = self.entityLink({ type, id });
      return format({
        protocol: 'https:',
        host: 'www.facebook.com',
        pathname: 'sharer/sharer.php',
        query: { u: link, quote, hashtag },
      });
    },
  }))
  .actions(self => ({
    requestCount: flow(function* requestCountFacebook({ type, id }) {
      const link = self.entityLink({ type, id });
      const requestUrl = format({
        protocol: 'https:',
        host: 'graph.facebook.com',
        query: { id: link },
      });

      let count;
      try {
        const response = yield getEnv(self).request.get(requestUrl);
        count = response.body.share.share_count;
      } catch (error) {
        console.warn(`share.facebook.requestCount`, error);
        count = null;
      }

      set(self.countsMap, { [`${type}_${id}`]: count });
    }),
  }));
