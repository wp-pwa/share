# @frontity/share

Share utilities for the [:fast_forward: Frontity](https://github.com/wp-pwa/wp-pwa) platform.

[![npm version](https://badge.fury.io/js/%40frontity%2Fshare.svg)](https://badge.fury.io/js/%40frontity%2Fshare) [![Build Status](https://travis-ci.org/frontity/share.svg?branch=master)](https://travis-ci.org/frontity/share)

## Usage

Install @frontity/share using [`npm`](https://www.npmjs.com/):

```bash
npm install @frontity/share
```

Then, import and use it in your [mobx-state-tree](https://github.com/mobxjs/mobx-state-tree) store:

```javascript
import { types } from 'mobx-state-tree';
import Share from '@frontity/share';

const myStore = types.model('MyStore')
  .props({
    share: types.optional(Share, {}),
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
### Share
* `share.networks` - Returns the list of all supported networks.

### Networks

#### counts
Permitted values for `network` are `all`, `facebook`, `googlePlus` and `pinterest`.
* `share[network].count({ type, id })`
* `share[network].requestCount({ type, id })`

#### urls
* `share.facebook.url({ type, id, quote, hashtag })`
* `share.googlePlus.url({ type, id })`
* `share.linkedin.url({ type, id, title, summary })`
* `share.twitter.url({ type, id, text, via, hashtags })`
* `share.whatsapp.url({ type, id, text })`
* `share.telegram.url({ type, id, text })`
* `share.email.url({ type, id, subject, body })`
* `share.pinterest.url({ type, id, media, description })`

## Contribute

Thank you for thinking about contributing to a Frontity project!

Please take a look at [this repo](https://github.com/frontity/contribute) to know how to do so.
