const TreeMap = require("../../source/maps").TreeMap

let map;

describe("Maps ◊ TreeMap", function() {
  beforeEach(() => {
    map = new TreeMap()
    map.add("Mongolia", "Ulan Bator")
    map.add("India", "New Delhi")
    map.add("Kenya", "Nairobi")
  })

  it("should initialise a TreeMap correctly",       testInit)
  it("should add key-value pair to the map",        testAdd)
  it("should overwrite if a key already exits",     testAddExistingKey)
  it("should get a key-value pair",                 testGet)
  it("should be able to tell if a key is present",  testHas)
  it("should delete the key-value pair",            testDelete)
  it("should keep the keys sorted",                 testKeySort)
  it("should iterate over value in key sort-order", testGetValues)
})

function testInit() {
  expect(map).not.toBe(null)
  expect(map.count).toBe(3)
}

function testAdd() {
  map.add("Brazil", "Brasilia")
  expect(map.count).toBe(4)
}

function testAddExistingKey() {
  map.add("India", "Bhopal")
  expect(map.count).toBe(3)
  expect(map.get("India")).toBe("Bhopal")
}

function testGet() {
  expect(map.get("Kenya")).toBe("Nairobi")
  expect(map.get("Australia")).toBe(null)
}

function testHas() {
  expect(map.has("Australia")).toBe(false)
  expect(map.has("India")).toBe(true)
}

function testDelete() {
  map.delete("India")
  expect(map.has("India")).toBe(false)
  expect(map.count).toBe(2)
}

function testKeySort() {
  let keys = []
  for (const key of map.keys()) {
    keys.push(key)
  }
  expect(keys.toString()).toBe("India,Kenya,Mongolia")
}

function testGetValues() {
  for (const a of map) {
    console.log(a)
  }
  let values = []
  for (const value of map.values()) {
    values.push(value)
  }
  expect(values.toString()).toBe("New Delhi,Nairobi,Ulan Bator")
}
