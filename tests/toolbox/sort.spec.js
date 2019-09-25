const { 
  BubbleSort, 
  InsertionSort, 
  MergeSort,
  QuickSort,
  SelectionSort
} = require("../../source").Toolbox

let sorted = [24, 121, 452, 1889, 9821, 10231, 34511, 871231]
let unsorted = [452, 871231, 24, 10231, 1889, 34511, 9821, 121]

describe("Toolbox ◊ Sorting", function() {
  it("should bubble sort an unsorted array",    testBubbleSortUnsorted)
  it("should bubble sort a sorted array",       testBubbleSortSorted)

  it("should insertion sort an unsorted array", testInsertionSortUnsorted)
  it("should insertion sort a sorted array",    testInsertionSortSorted)

  it("should selection sort an unsorted array", testSelectionSortUnsorted)
  it("should selection sort a sorted array",    testSelectionSortSorted)

  it("should merge sort an unsorted array",     testMergeSortUnsorted)
  it("should merge sort a sorted array",        testMergeSortSorted)

  it("should quicksort an unsorted array",      testQuickSortUnsorted)
  it("should quicksort a sorted array",         testQuickSortSorted)
  it("should quicksort a counter-sorted array", testQuickSortCounterSorted)
})

function testBubbleSortUnsorted() {
  expect(BubbleSort(unsorted)).toEqual(sorted)
}

function testBubbleSortSorted() {
  expect(BubbleSort(sorted)).toEqual(sorted)
}

function testInsertionSortUnsorted() {
  expect(InsertionSort(unsorted)).toEqual(sorted)
}

function testInsertionSortSorted() {
  expect(InsertionSort(sorted)).toEqual(sorted)
}

function testSelectionSortUnsorted() {
  expect(SelectionSort(unsorted)).toEqual(sorted)
}

function testSelectionSortSorted() {
  expect(SelectionSort(sorted)).toEqual(sorted)
}

function testMergeSortUnsorted() {
  expect(MergeSort(unsorted)).toEqual(sorted)
}

function testMergeSortSorted() {
  expect(MergeSort(sorted)).toEqual(sorted)
}

function testQuickSortUnsorted() {
  expect(QuickSort(unsorted)).toEqual(sorted)
}

function testQuickSortSorted() {
  expect(QuickSort(sorted)).toEqual(sorted)
}

function testQuickSortCounterSorted() {
  // Quick sort peforms worst when the collection is sorted in descending
  // order. So we shuffle the given collection before running quicksort.
  // This test is here to make sure that works.
  expect(QuickSort([10, 7, 5, 4, 2, 1])).toEqual([1, 2, 4, 5, 7, 10])
}
