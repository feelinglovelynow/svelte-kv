import { enumSvelteKVPoint } from './enumSvelteKVPoint.js'


/**
 * @typedef { object } SvelteKVConstructor
 * @property { string } apiToken Found @ Cloudflare Dashboard > Workers & Pages > Manage API Tokens
 * @property { string } accountId Found @ Cloudflare Dashboard > Workers & Pages > Overview
 * @property { string } namespace Found @ Cloudflare Dashboard > Workers & Pages > KV
 * @property { string } namespaceId Found @ Cloudflare Dashboard > Workers & Pages > KV > Click namespace
 * @property { enumSvelteKVPoint } point Would you love `this.get()` and `this.put()` to use api or platform
 * @property { boolean } doJSONParse On `this.get()` would you love a `JSON.parse()` to happen
 * @property { boolean } doJSONStringify On `this.put()` would you love a `JSON.stringify()` to happen
 * @property { any } platform Used if `this.#point` is `platform`
*/
