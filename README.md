# 🕉 @feelinglovelynow/svelte-kv


## 💎 Install
```bash
pnpm add @feelinglovelynow/svelte-kv
```


## 🙏 Description
* From SvelteKit [documentation](https://kit.svelte.dev/docs/adapter-cloudflare-workers#bindings-testing-locally): `platform.env is only available in the final build and not in dev mode`
* This package brings ease to SvelteKit & Cloudflare KV development allowing you to call [Cloudflare's API](https://developers.cloudflare.com/api/operations/workers-kv-namespace-read-key-value-pair) during local development and utilize the platform object when deployed


## 💚 Add svelteKVOptions to your code base
```ts
import { PUBLIC_ENVIRONMENT } from '$env/static/public'
import { enumSvelteKVPoint } from '@feelinglovelynow/svelte-kv'
import { CLOUDFLARE_KV_API_TOKEN, CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_KV_NAMESPACE_ID } from '$env/static/private'

export default {
  doJSONParse: true, // on .get() would you love a JSON.parse() to happen
  doJSONStringify: true, // on .put() would you love a JSON.stringify() to happen
  accountId: CLOUDFLARE_ACCOUNT_ID, // Found @ Cloudflare Dashboard > Workers & Pages > Overview
  apiToken: CLOUDFLARE_KV_API_TOKEN, // Found @ Cloudflare Dashboard > Workers & Pages > Manage API Tokens
  namespace: 'CACHE', // Found @ Cloudflare Dashboard > Workers & Pages > KV
  namespaceId: CLOUDFLARE_KV_NAMESPACE_ID, // Found @ Cloudflare Dashboard > Workers & Pages > KV > Click namespace
  point: PUBLIC_ENVIRONMENT === 'local' ? enumSvelteKVPoint.api : enumSvelteKVPoint.platform, // Would you love .get() and .put() to use api or platform - PUBLIC_ENVIRONMENT is defined via @feelinglovelynow/env-write
}
```


## 💛 Put Example
```ts
import type { RequestHandler } from './$types'
import { serverCatch } from '$lib/global/catch'
import { SvelteKV } from '@feelinglovelynow/svelte-kv'
import svelteKVOptions from '$lib/global/svelteKVOptions'


export const GET = (async ({ locals, platform }) => {
  try {
    const svelteKV = new SvelteKV({ ...svelteKVOptions, platform })
    await svelteKV.put('key', [ 'value', 'hello', 'world' ])
  } catch (e) {
    return serverCatch(e) // from @feelinglovelynow/svelte-catch
  }
}) satisfies RequestHandler
```


## 🧡 Get Example
```ts
import type { LayoutServerLoad } from './$types'
import { pageServerCatch } from '$lib/global/catch'
import { SvelteKV } from '@feelinglovelynow/svelte-kv'
import svelteKVOptions from '$lib/global/svelteKVOptions'


export const load = (async ({ platform }) => {
  try {
    const svelteKV = new SvelteKV({ ...svelteKVOptions, platform })

    const [ sources, products ] = await Promise.all([
      svelteKV.get('sources'),
      svelteKV.get('products')
    ])
  } catch (e) {
    return pageServerCatch(e) // from @feelinglovelynow/svelte-catch
  }
}) satisfies LayoutServerLoad
```


## 🎁 All Our Packages
1. @feelinglovelynow/datetime-local: [NPM](https://www.npmjs.com/package/@feelinglovelynow/datetime-local) ⋅ [Github](https://github.com/feelinglovelynow/datetime-local)
1. @feelinglovelynow/dgraph: [NPM](https://www.npmjs.com/package/@feelinglovelynow/dgraph) ⋅ [Github](https://github.com/feelinglovelynow/dgraph)
1. @feelinglovelynow/env-write: [NPM](https://www.npmjs.com/package/@feelinglovelynow/env-write) ⋅ [Github](https://github.com/feelinglovelynow/env-write)
1. @feelinglovelynow/get-form-entries: [NPM](https://www.npmjs.com/package/@feelinglovelynow/get-form-entries) ⋅ [Github](https://github.com/feelinglovelynow/get-form-entries)
1. @feelinglovelynow/get-relative-time: [NPM](https://www.npmjs.com/package/@feelinglovelynow/get-relative-time) ⋅ [Github](https://github.com/feelinglovelynow/get-relative-time)
1. @feelinglovelynow/global-style: [NPM](https://www.npmjs.com/package/@feelinglovelynow/global-style) ⋅ [Github](https://github.com/feelinglovelynow/global-style)
1. @feelinglovelynow/jwt: [NPM](https://www.npmjs.com/package/@feelinglovelynow/jwt) ⋅ [Github](https://github.com/feelinglovelynow/jwt)
1. @feelinglovelynow/loop-backwards: [NPM](https://www.npmjs.com/package/@feelinglovelynow/loop-backwards) ⋅ [Github](https://github.com/feelinglovelynow/loop-backwards)
1. @feelinglovelynow/slug: [NPM](https://www.npmjs.com/package/@feelinglovelynow/slug) ⋅ [Github](https://github.com/feelinglovelynow/slug)
1. @feelinglovelynow/svelte-catch: [NPM](https://www.npmjs.com/package/@feelinglovelynow/svelte-catch) ⋅ [Github](https://github.com/feelinglovelynow/svelte-catch)
1. @feelinglovelynow/svelte-kv: [NPM](https://www.npmjs.com/package/@feelinglovelynow/svelte-kv) ⋅ [Github](https://github.com/feelinglovelynow/svelte-kv)
1. @feelinglovelynow/svelte-loading-anchor: [NPM](https://www.npmjs.com/package/@feelinglovelynow/svelte-loading-anchor) ⋅ [Github](https://github.com/feelinglovelynow/svelte-loading-anchor)
1. @feelinglovelynow/svelte-modal: [NPM](https://www.npmjs.com/package/@feelinglovelynow/svelte-modal) ⋅ [Github](https://github.com/feelinglovelynow/svelte-modal)
1. @feelinglovelynow/svelte-turnstile: [NPM](https://www.npmjs.com/package/@feelinglovelynow/svelte-turnstile) ⋅ [Github](https://github.com/feelinglovelynow/svelte-turnstile)
1. @feelinglovelynow/toast: [NPM](https://www.npmjs.com/package/@feelinglovelynow/toast) ⋅ [Github](https://github.com/feelinglovelynow/toast)
