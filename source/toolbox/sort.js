/**
 *  Sorting is one most common operation on a collection of data.
 *  This modules provides the following algorithms:
 * 
 *  - Insertion sort `O(n²)`
 *  - Selection sort `O(n²)`
 *  - Insertion sort `O(n²)`
 *  - Merge sort `O(n log n)`
 *  - Quicksort `O(n log n)`
 * 
 *  ## Sorting properties
 *  
 *  ### Stability
 *  An algorithm is said to be stable if it uses a secondary criteria to ensure
 *  some order for items that fall in the same group based on the primary 
 *  criteria.
 * 
 *  For example, given
 *  ```
 *  const users = [
 *    { name: 'Animesh', age: 26 },
 *    { name: 'Nicoleta', age: 25 }, 
 *    { name: 'Chris', age: 32 },
 *    { name: 'Adam', age: 32 },
 *  ];
 *  ```
 *  A stable sorting algorithm (ascending order by age) will **always** return
 *  ```
 *  const users = [
 *    { name: 'Nicoleta', age: 25 }, 
 *    { name: 'Animesh', age: 26 },
 *    { name: 'Adam', age: 32 },
 *    { name: 'Chris', age: 32 },
 *  ];
 *  ```
 *  Notice that Adam and Chris were sorted alphabetically within their primary group 
 *  (age = 32).
 * 
 *  An unstable algorithm may or may not return the same result. It will sort by age
 *  alright, but may place Chris before Adam. 
 * 
 *  ### In-place
 *  An in-place sorting algorithm has a space complexity of `O(1)`. It doesn't require
 *  extra memory because it shuffles the item within the collection itself. Such algorithm
 *  are extremely useful in memory contraint environments such as embedded devices.
 * 
 *  ### Online
 *  Online sorting algorithm don't need to resort the whole collection if a new item
 *  is added.
 * 
 *  ### Adaptive
 *  An adaptive algorithm takes advantage of helpful properties of the input. Non-adaptive 
 *  doesn't. A simple example from manual arithmetic is methods for multiplying. Non-adaptive 
 *  means you multiply every digit no matter what, adaptive would, say, tack a 0 to the end
 *  of a number when multiplying by 10 without ever carrying out the actual multiplication.
 *  
 *  In the context of sorting, an non-adaptive algorithm takes the same(ish) amount of time 
 *  for a given number of values no matter what. An adaptive algorithm takes advantage of 
 *  properties of the data. This usually means taking advantage of any near sorted or already 
 *  sorted portions.  
 *  
 *  @module toolbox/sort
 */

/**
 *  Bubble sort repeatedly steps through the collection to be sorted, compares each pair of 
 *  adjacent items and swaps them if they are in the wrong order. This continues until no
 *  swaps are needed.
 *  
 *  Returns the sorted collection as an array.
 *  
 *  #### Properties
 *  - ✅ Stable
 *  - ✅ In-place
 *  - ✅ Online
 *  - ✅ Adaptive, `O(n)` if the array is already sorted
 *  - Time complexity: `O(n²)`
 *  - Space complexity: `O(1)`
 * 
 *  @public
 *  @param {Iterable} collection Collection items **must** support comparison operations <, >, ==
 *  @returns {Array} 
 */
function BubbleSort(collection) {
  const array = Array.from(collection)

  for (let i = 1; i < array.length; i++) {
    let swapped = false

    for (let current = 0; current < array.length - i; current++) {
      if (array[current] > array[current + 1]) {
        swap(array, current, current + 1)
        swapped = true
      }
    }

    if (!swapped) {
      break
    }
  }

  return array
}

/**
 *  The "natural" way of sorting. Starts from the second element, and checks whether
 *  it's smaller than values that come before it. If so, it's placed to its rightful
 *  place. Otherwise, moves on the next element.
 * 
 *  Returns the sorted collection as an array.
 * 
 *  #### Properties
 *  - ✅ Stable
 *  - ✅ In-place
 *  - ✅ Online
 *  - ✅ Adaptive
 *  - Time complexity: `O(n²)`
 *  - Space complexity: `O(1)`
 *  
 *  @param {Iterable} collection Collection items **must** support comparison operations <, >, ==
 *  @returns {array}
 */
function InsertionSort(collection) {
  const array = Array.from(collection)

  for (let right = 1; right < array.length; right++) {
    for (let left = right; array[left - 1] > array[left]; left--) {
      swap(array, left - 1, left)
    }
  }

  return array
}

/**
 *  Sorts an array by repeatedly finding the minimum element (considering ascending order) from 
 *  unsorted part and putting it at the beginning. The algorithm maintains two subarrays in a 
 *  given array.
 * 
 *  1. The subarray which is already sorted.
 *  2. Remaining subarray which is unsorted.
 * 
 *  In every iteration of selection sort, the minimum element (considering ascending order) from 
 *  the unsorted subarray is picked and moved to the sorted subarray. **Selection sort minimises**
 *  **the number of swaps.** Unlike insertion and bubble sort, it does only one swap in each 
 *  iteration of the whole collection. 
 *  
 *  ```
 *  arr[] = 64 25 12 22 11
 *  
 *  // Find the minimum element in arr[0...4]
 *  // and place it at beginning
 *  11 25 12 22 64
 *  
 *  // Find the minimum element in arr[1...4]
 *  // and place it at beginning of arr[1...4]
 *  11 12 25 22 64
 * 
 *  // Find the minimum element in arr[2...4]
 *  // and place it at beginning of arr[2...4]
 *  11 12 22 25 64
 * 
 *  // Find the minimum element in arr[3...4]
 *  // and place it at beginning of arr[3...4]
 *  11 12 22 25 64 
 *  ```
 *
 *  Returns the sorted collection as an array.
 * 
 *  #### Properties
 *  - ❌ Stable
 *  - ✅ In-place
 *  - ❌ Online
 *  - ❌ Adaptive
 *  - Time complexity: `O(n²)`
 *  - Space complexity: `O(1)`
 *  
 *  @param {Iterable} collection Collection items **must** support comparison operations <, >, ==
 *  @returns {array}
 */
function SelectionSort(collection) {
  const array = Array.from(collection)

  for (let left = 0; left < array.length; left++) {
    let selection = left

    for (let right = left + 1; right < array.length; right++) {
      if (array[selection] > array[right]) {
        selection = right
      }
    }

    if (selection !== left) {
      swap(array, left, selection)
    }
  }

  return array
}

/**
 *  An efficient sorting algorithm that uses divide and conquer technique to
 *  accomplish its task faster.
 *  
 *  Splits the array into halves until 2 or fewer elements are left in each half. 
 *  It sorts these two elements and then merges back all halves until the whole 
 *  collection is sorted.
 * 
 *  Returns the sorted collection as an array.
 * 
 *  #### Properties
 *  - ✅ Stable
 *  - ❌ In-place
 *  - ❌ Online
 *  - ❌ Adaptive
 *  - Time complexity: `O(n log n)`
 *  - Space complexity: `O(n)`
 *  
 *  @param {Iterable} collection Collection items **must** support comparison operations <, >, ==
 *  @returns {array}
 */
function MergeSort(collection) {
  const array = Array.from(collection)
  return split(array)
}

/** @private */
function split(array) {
  const size = array.length
  
  if (size < 2) {
    return array
  }

  if (size == 2) {
    return array[0] < array[1] ? array : [array[1], array[0]]
  }

  const half = Math.ceil(size / 2)
  return merge(
    split(array.slice(0, half)),
    split(array.slice(half))
  )
}

/** @private */
function merge(firstHalf, secondHalf = []) {
  const mergedSize = firstHalf.length + secondHalf.length
  const mergedArray = Array(mergedSize)

  for (let index = 0, j = 0, k = 0; index < mergedSize; index++) {
    if (k >= secondHalf.length || (j < firstHalf.length && firstHalf[j] <= secondHalf[k])) {
      mergedArray[index] = firstHalf[j]
      j += 1
    }
    else {
      mergedArray[index] = secondHalf[k]
      k += 1
    }
  }

  return mergedArray
}

/**
 *  An efficient sorting algorithm that uses divide and conquer technique to
 *  accomplish its task faster. Unlike {@link MergeSort} it works in-place, 
 *  and doesn't require additional memory.
 *  
 *  Quicksort works by picking a "pivot" element (preferably random) and move
 *  all elements that are smaller than the pivot to the right. The ones that
 *  are larger than the pivot are moved to the left of it. This is done recursively
 *  until the collection is sorted.
 * 
 *  Returns the sorted collection as an array.
 * 
 *  #### Properties
 *  - ❌ Stable
 *  - ✅ In-place
 *  - ❌ Online
 *  - ❌ Adaptive
 *  - Time complexity: `O(n log n)`
 *  - Space complexity: `O(1)`
 *  
 *  Typically, an array sorted in descending order gives the worst-case performance
 *  of quick sort `O(n²)`. To avoid this, the 
 *  
 *  @param {Iterable} collection Collection items **must** support comparison operations <, >, ==
 *  @returns {array}
 */
function QuickSort(collection) {
  const array = Array.from(collection)
  shuffle(array)
  return _quicksort(array)
}

/** @private */
function shuffle(array) {
  for (let index = 0; index < array.length; index++) {
    const newIndex = Math.floor(Math.random() * array.length)
    swap(array, index, newIndex)
  }
  return array
}

/** @private */
function _quicksort(array, start = 0, end = array.length - 1) {
  if (start < end) {
    const pivotIndex = partition(array, start, end)
    _quicksort(array, start, pivotIndex - 1)
    _quicksort(array, pivotIndex + 1, end) 
  }
  return array
}

/** @private */
function partition(array, start, end) {
  let pivotIndex = start

  for (let current = start + 1; current <= end; current++) {
    if (array[current] < array[start]) {
      pivotIndex += 1
      swap(array, current, pivotIndex)
    }
  }

  swap(array, start, pivotIndex)
  return pivotIndex
}

/**
 *  Swap array elements in place
 *  Runtime: `O(1)`
 * 
 *  @private
 *  @param {array} array array to be modified
 *  @param {integer} from index of the first element
 *  @param {integer} to index of the second element
 */
function swap(array, from, to) {
  [array[from], array[to]] = [array[to], array[from]]
}

module.exports = {
  BubbleSort,
  InsertionSort,
  MergeSort,
  QuickSort,
  SelectionSort
}
