const List = require("../linear").List

/**
 *  A `HashMap` is composed of two things:
 *  - a *hash function*, and
 *  - a collection (typically an array) to store values
 * 
 *  The hash function transforms the keys (e.g. length, width etc.) into a number which
 *  is used as an array index. The values are placed in a **buckets** array at the hashed
 *  index. A perfect hash function is one that assigns a unique array index for each 
 *  unique key. It's not practical and memory wasteful to have a perfect hash function.
 *  This `HashMap` implements a cost-effective hash function instead.
 *  
 *  What happens if two different keys map to the same index? Then we have a **collision**.
 *  In this case, the value at the index will be an array of values instead of a single value.
 *  Naturally, this reduces the search complexity from `O(1)` to `O(n)`.
 * 
 *  Collisions can be avoided by having a big bucket size. This `HashMap` implementation
 *  re-sizes itself when it is getting full. This avoids collision and keeps memory usage
 *  to a minimum.
 * 
 *  This structure uses a buckets array where each bucket is a {@link List}.
 *  
 *  @class
 */
class HashMap {
  /**
   *  @constructor
   *  @param {number} [capacity=19] initial size of the HashMap data array (preferably a 
   *    prime number)
   *  @param {number} [rehashThreshold=0.75] a rehash is triggered when array reaches this 
   *    occupancy threshold
   */
  constructor(capacity = 19, rehashThreshold = 0.75) {
    this._initialCapacity = capacity
    this._rehashThreshold = rehashThreshold
    this._buckets = new Array(capacity)
    this._keys = []
    this._size = 0
    this._collisions = 0
  }

  /**
   *  Returns the number of items in the hash map
   *  @returns {number}
   */
  get count() {
    return this._size
  }

  /**
   *  Returns a measure of how full the hash map is, i.e. the ratio between items 
   *  on the map and the total size of the bucket.
   *  
   *  @returns {number} A number ∈ [0, 1]
   */
  get occupancyFactor() {
    return this._size / this._buckets.length
  }

  /**
   *  The map is rehashed if the occupancy factor exceeds the `rehashThreshold` set
   *  at the time of instantiation.
   *  
   *  @private
   *  @returns {boolean}
   */
  get shouldRehash() {
    return this.occupancyFactor > this._rehashThreshold
  }

  /**
   *  Returns an array of all keys. May or may not be in insertion order.
   *  
   *  @return {array}
   */
  get keys() {
    return this._keys
  }

  /**
   *  Get value for each element in the map. Result in no particular order of the
   *  corresponding keys.
   *  
   *  @returns {Iterator} values
   */
  * values() {
    for (const key of this._keys) {
      yield this.get(key)
    }
  }

  /**
   *  Get nodes for each element in the map. Result in no particular order of the
   *  corresponding keys.
   *  
   *  @private
   *  @returns {Iterator} values
   */
  * nodes() {
    for (const key of this._keys) {
      yield this.getNodeFor(key)
    }
  }

  /**
   *  Get the value for the given `key`. Runtime is usually `O(1)` but if there are 
   *  collisions it could be `O(n)`.
   *  
   *  Returns `null` if no such key exists in the map.
   *  
   *  @param {any} key
   *  @returns {?any}
   */
  get(key) {
    const node = this.getNodeFor(key)
    return node ? node.data.value : null
  }

  /**
   *  Returns a boolean indicating whether an element with the given `key` exists
   *  or not. Runtime: `O(1)`
   * 
   *  @param {any} key
   *  @returns {boolean} 
   */
  has(key) {
    return this._keys.includes(key)
  }

  /**
   *  Removes the specified key from the map. Runtime `O(1)`.
   *  Return the value removed or `null` if the key wasn't found in the map.
   *  @param {any} key 
   */
  delete(key) {
    let entry = this.getNodeFor(key)
    if (!entry) {
      return null
    }
    // Deep copy entry before removing the key-value pair from the map
    entry = JSON.parse(JSON.stringify(entry))

    const index = this.hash(key)
    const bucket = this._buckets[index]
    const indexToRemove = bucket.indexOf(entry.data)
    bucket.remove(indexToRemove)
    this._size -= 1

    return entry
  }

  /**
   *  Returns the {@link Node} for the given `key` or `null` if no such key exists.
   *  Runtime is usually `O(1)` but if there are collisions it could be `O(n)`.
   * 
   *  @private
   *  @param {any} key key to search for
   *  @returns {?any}
   */
  getNodeFor(key) {
    const bucket = this.getBucketFor(key)
    if (!bucket) {
      return null
    }

    const listNode = bucket.find((node, position) => {
      if (key === node.data.key) {
        return node
      }
      return null
    })

    return listNode
  }

  /**
   *  Returns the bucket for given `key`. If no such bucket exists, returns `null`.
   *  @private
   *  @param {?any} key 
   */
  getBucketFor(key) {
    const index = this.hash(key)
    return this._buckets[index] || null
  }

  /**
   *  Insert a key/value pair into the map. If the key is already present, replaces
   *  its value. Runtime: `O(1)`, in case a rehash is needed `O(n)`.
   * 
   *  Returns the map instance to allow command chaining.
   * 
   *  @param {any} key 
   *  @param {any} value 
   *  @returns {HashMap}
   */
  add(key, value) {
    let bucket = this.getBucketFor(key)
    if (!bucket) {
      bucket = new List()
      this._buckets[this.hash(key)] = bucket
    }

    const entry = this.getNodeFor(key)

    if (!entry) {
      bucket.add({ key, value })
      this._keys.push(key)
      this._size += 1

      if (bucket.count > 1) { 
        this._collisions += 1 
      }

      if (this.shouldRehash) { 
        this.rehash() 
      }
    }
    else {
      entry.data.value = value 
    }

    return this
  }

  /**
   *  Rehashing minimises collisions when a hash map reaches full occupancy.
   *  It doubles the size of the map, recomputes all the hash codes, and then
   *  distributes data among the new buckets.
   * 
   *  When increasing the map size, we try to find the next prime as that is
   *  optimal for minimising collisions.
   *  
   *  @private
   */
  rehash() {
    const newCapacity = Math.max(this._size, this._buckets.length) * 2
    const newMap = new HashMap(newCapacity)

    for (const key of this._keys) {
      newMap.add(key, this.get(key))
    }

    this._initialCapacity = newMap._initialCapacity
    this._rehashThreshold = newMap._rehashThreshold
    this._buckets = newMap._buckets
    this._keys = newMap._keys
    this._size = newMap._size
    this._collisions = newMap._collisions
  }

  /**
   *  Polynomial hash codes are used to hash keys. The given `key` is first
   *  converted to a string like so, `String(key)`.
   *  Uses FVN-1a hashing algorithm for 32 bits.
   *  
   *  @private
   *  @see http://bit.ly/fvn-1a
   *  @param {any} key 
   */
  hash(key) {
    const str = String(key)
    let hash = 2166136261   // FNV_offset_basis (32 bit)
    for (let i = 0; i < str.length; i++) {
      hash ^= str.codePointAt(i)  // XOR
      hash *= 16777619  // 32-bit FNV_prime
    }

    return (hash >>> 0) % this._buckets.length
  }

}

module.exports = HashMap
