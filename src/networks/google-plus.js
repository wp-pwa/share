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
      const request = {
        method: 'pos.plusones.get',
        id: 'p',
        params: {
          nolog: true,
          id: link,
          source: 'widget',
          userId: '@viewer',
          groupId: '@self',
        },
        jsonrpc: '2.0',
        key: 'p',
        apiVersion: 'v1',
      };

      let count;
      try {
        const response = yield getEnv(self)
          .request.post('https://clients6.google.com/rpc')
          .set('Accept', 'application/json')
          .set('Content-type', 'application/json;charset=UTF-8')
          .send(request)
          .end();

        ({ count } = response.result.metadata.globalCounts);
      } catch (error) {
        count = null;
      }

      set(self.countsMap, { [`${type}_${id}`]: count });
    }),
  }));
