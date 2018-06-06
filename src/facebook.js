import { getRoot, flow } from 'mobx-state-tree';
import { set } from 'mobx';
import url from 'url';
import request from 'superagent';
import Network from './network';

export default Network.named('Facebook')
  .views(self => ({
    url({ type, id, quote, hashtag }) {
      const { link } = getRoot(self).connection.entity(type, id);
      return url({
        protocol: 'http:',
        host: 'www.facebook.com',
        pathname: 'sharer/sharer.php',
        query: { u: link, quote, hashtag },
      });
    },
  }))
  .actions(self => ({
    requestCount: flow(function* requestCountFacebook({ type, id }) {
      const { link } = getRoot(self).connection.entity(type, id);
      const endpoint = {
        protocol: 'http:',
        host: 'graph.facebook.com',
        query: { id: link },
      };

      const response = yield request.get(endpoint).accept('json');

      set(self.countsMap, `${type}_${id}`, response.body.share.share_count);
    }),
  }));
