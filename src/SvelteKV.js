import { enumSvelteKVPoint } from './enumSvelteKVPoint.js'


export class SvelteKV {
  /** @type { enumSvelteKVPoint } */
  #point
  /** @type { any } */
  #platform
  #apiToken = ''
  #accountId = ''
  #namespace = ''
  #namespaceId = ''
  #doJSONParse = false
  #doJSONStringify = false


  /**
   * Brings ease to SvelteKit & Cloudflare KV development allowing you to call [Cloudflare's API](https://developers.cloudflare.com/api/operations/workers-kv-namespace-read-key-value-pair) during local development and utilize the platform object when deployed
   * @param { import('./typedefs.js').SvelteKVConstructor } param
   */
  constructor ({ apiToken, accountId, namespace, namespaceId, point, doJSONParse, doJSONStringify, platform }) {
    this.#constructorValidation({ apiToken, accountId, namespace, namespaceId, point, doJSONParse, doJSONStringify, platform })

    this.#point = point
    this.#apiToken = apiToken
    this.#platform = platform
    this.#accountId = accountId
    this.#namespace = namespace
    this.#namespaceId = namespaceId
    this.#doJSONParse = doJSONParse
    this.#doJSONStringify = doJSONStringify
  }


  /**
   * Get from Cloudflare KV via its key
   * @param { string } key 
   * @returns { Promise<any> }
  */
  async get (key) {
    /** @type { any } */
    let value

    if (!key) throw { id: 'fln__svelte-kv__missing-key', message: 'Get function needs a key', _errorData: { key } }
    else {
      switch (this.#point) {
        case enumSvelteKVPoint.platform:
          if (!this.#platform) throw { id: 'fln__svelte-kv__missing-platform', message: 'Get function IF this.#point === enumSvelteKVPoint.platform needs this.#platform to be defined', _errorData: { platform: this.#platform } }
          else {
            value = await this.#platform.env[ this.#namespace ].get(key)
            if (this.#doJSONParse) value = JSON.parse(value) 
          }
          break
        case enumSvelteKVPoint.api:
          const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${ this.#apiToken }` }
          const rFetch = await fetch(this.#getUrl(key), { headers })
          value = await rFetch[ this.#doJSONParse ? 'json' : 'text' ]()
          break
      }

      return value
    }
  }


  /**
   * Put into Cloudflare KV
   * @param { string } key 
   * @param { any } value 
   * @param { [string] } metadata 
   * @returns { Promise<{ result: any, success: boolean, errors: { code: number, message: string }[], messages: { code: number, message: string }[] }> }
  */
  async put (key, value, metadata) {
    if (!key) throw { id: 'fln__svelte-kv__missing-key', message: 'Put function needs a key', _errorData: { key } }
    else if (!value) throw { id: 'fln__svelte-kv__missing-value', message: 'Put function needs a value', _errorData: { value } }
    else {
      switch (this.#point) {
        case enumSvelteKVPoint.platform:
          if (!this.#platform) throw { id: 'fln__svelte-kv__missing-platform', message: 'Put function IF this.#point === enumSvelteKVPoint.platform needs this.#platform to be defined', _errorData: { platform: this.#platform } }
          else return await this.#platform.env[ this.#namespace ].put(key, this.#doJSONStringify ? JSON.stringify(value) : value)
        case enumSvelteKVPoint.api:
          const headers = { 'Authorization': `Bearer ${ this.#apiToken }` }
          const formData  = new FormData()
          formData.append('value', this.#doJSONStringify ? JSON.stringify(value) : value)
          formData.append('metadata', metadata || JSON.stringify({}))
          const rFetch = await fetch(this.#getUrl(key), { method: 'PUT', body: formData, headers })
          return await rFetch.json()
      }
    }
  }


  /**
   * Get the API url
   * @param { string } key 
   * @returns 
  */
  #getUrl (key) {
    return `https://api.cloudflare.com/client/v4/accounts/${ this.#accountId }/storage/kv/namespaces/${ this.#namespaceId }/values/${ key }`
  }


  /**
   * Validate params sent to constructor
   * @param { import('./typedefs.js').SvelteKVConstructor } param0 
  */
  #constructorValidation ({ apiToken, accountId, namespace, namespaceId, point, doJSONParse, doJSONStringify, platform }) {
    if (!apiToken) throw { id: 'fln__svelte-kv__missing-apiToken', message: 'SvelteKV constructor needs a apiToken', _errorData: { apiToken } }
    if (!accountId) throw { id: 'fln__svelte-kv__missing-accountId', message: 'SvelteKV constructor needs a accountId', _errorData: { platform } }
    if (!namespace) throw { id: 'fln__svelte-kv__missing-namespace', message: 'SvelteKV constructor needs a namespace', _errorData: { namespace } }
    if (!namespaceId) throw { id: 'fln__svelte-kv__missing-namespaceId', message: 'SvelteKV constructor needs a namespaceId', _errorData: { namespaceId } }
    if (typeof doJSONParse !== 'boolean') throw { id: 'fln__svelte-kv__missing-doJSONParse', message: 'SvelteKV constructor needs a doJSONParse', _errorData: { doJSONParse } }
    if (typeof doJSONStringify !== 'boolean') throw { id: 'fln__svelte-kv__missing-doJSONStringify', message: 'SvelteKV constructor needs a doJSONStringify', _errorData: { doJSONStringify } }
    if (!point) throw { id: 'fln__svelte-kv__missing-point', message: 'SvelteKV constructor needs a point', _errorData: { point } }
    if (point === enumSvelteKVPoint.platform && !platform) throw { id: 'fln__svelte-kv__missing-platform', message: 'SvelteKV constructor needs a IF this.#point === enumSvelteKVPoint.platform', _errorData: { point, platform } }
  }
}
