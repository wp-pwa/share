import { getEnv, flow } from 'mobx-state-tree';
import { set } from 'mobx';
import { format } from 'url';
import Network from './network';

export default Network.named('Pinterest')
  .views(self => ({
    url({ type, id, media, description }) {
      const url = self.entityLink({ type, id });
      return format({
        protocol: 'https:',
        host: 'pinterest.com',
        pathname: 'pin/create/button',
        query: { url, media, description },
      });
    },
  }))
  .actions(self => ({
    requestCount: flow(function* requestCountPinterest({ type, id }) {
      const url = self.entityLink({ type, id });
      const requestUrl = format({
        protocol: 'https:',
        host: 'api.pinterest.com',
        pathname: 'v1/urls/count.json',
        query: { cb: 'cb', url },
      });

      let count;
      try {
        const response = yield getEnv(self).request.get(requestUrl);
        const data = /\((.+)\)/.exec(response)[1];
        ({ count } = JSON.parse(data));
      } catch (error) {
        count = null;
      }

      set(self.countsMap, { [`${type}_${id}`]: count });
    }),
  }));
