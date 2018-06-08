# @frontity/share

Share utilities for the [:fast_forward: Frontity](https://github.com/wp-pwa/wp-pwa) platform.

## Usage

Install @frontity/share using [`npm`](https://www.npmjs.com/):

```bash
npm install @frontity/wp-pwa
```

Then, import and use it in your [mobx-state-tree](https://github.com/mobxjs/mobx-state-tree) store:

```javascript
import { types } from 'mobx-state-tree';
import Share from '@frontity/share';

const myStore = types.model('MyStore')
  .props({
    share: types.optional(Share),
  })
  .create({});

...

await myStore.share.facebook.requestCount({ type: 'post', id: 60 });

// Returns the share count of the item with type 'post' and id '60'.
myStore.share.facebook.count({ type: 'post', id: 60 });

// Returns the url for sharing the link of the item with type 'post' and id '60'.
myStore.share.facebook.url({ type: 'post', id: 60 });

```

## API
### share
* `share.networks`

### network
Permitted values for network are: `all`, `facebook`
* `share[network].count({ type, id })`
* `share[network].requestCount({ type, id })`

#### network-specific functions
* `share.facebook.url({ type, id, quote, hashtag })`
* `share.googlePlus.url({ type, id })`
* `share.linkedin.url({ type, id, title, summary })`
* `share.twitter.url({ type, id, text, via, hashtags })`
* `share.whatsapp.url({ type, id, text })`
* `share.telegram.url({ type, id, text })`
* `share.email.url({ type, id, subject, body })`
* `share.pinterest.url({ type, id, media, description })`
