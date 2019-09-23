/**
 *  A map is a collection of key-value pairs. JavaScript ships a built-in `Map` type. 
 *  This `maps` module introduces two more map data structures to the mix:
 *    - `HashMap`, a map implementation using an array and a hash function. Runtime `O(1)`.
 *    - `TreeMap`, a map implementation that uses a self-balanced {@link BinarySearchTree}.
 *      Runtime `O(logn)`
 *  
 *  A `HashMap` is more time-efficient, whereas a `TreeMap` is more space-efficient. The keys
 *  in a `TreeMap` are always sorted. This may or may not be the implementation detail in `HashMap`.
 *  Additionally, `TreeMap` offers some statistical data, such as maximum/minimum value, median,
 *  range of keys etc., for "free". `HashMap` does not.
 *  
 *  **`TreeMap` guarantees an `O(logn)` search complexity. `HashMap` offers an average complexity**
 *  **of `O(1)` but in the rare case of a rehash, it would take `O(n)`.**
 * 
 *  @module maps
 */
const HashMap = require("./hashmap")
// const TreeMap = require("./treemap")

module.exports = {
  /** @type HashMap */
  HashMap,
  /** @type TreeMap */
  // TreeMap
}
