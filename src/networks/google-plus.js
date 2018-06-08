import { getEnv, flow } from 'mobx-state-tree';
import { set } from 'mobx';
import { format } from 'url';
import Network from './network';

export default Network.named('GooglePlus')
  .views(self => ({
    url({ type, id }) {
      const link = self.entityLink({ type, id });
      return format({
        protocol: 'https:',
        host: 'plus.google.com',
        pathname: 'share',
        query: { url: link },
      });
    },
  }))
  .actions(self => ({
    requestCount: flow(function* requestCountGooglePlus({ type, id }) {
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
          .send(request);

        ({ count } = response.body.result.metadata.globalCounts);
      } catch (error) {
        console.warn('shared.googlePlus.requestCount', error);
        count = null;
      }

      set(self.countsMap, { [`${type}_${id}`]: count });
    }),
  }));
