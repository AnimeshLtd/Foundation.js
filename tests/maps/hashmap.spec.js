const HashMap = require("../../source/maps").HashMap

describe("Maps ◊ HashMap", function() {
  it("should initialise an empty map",            testInit)
  it("should return null for non-existing key",   testGet)
  it("should over-write existing key-value pair", testAddDuplicate)
  it("should remove key-value pair",              testDelete)
  it("should be able to tell if key is present",  testHas)
  it("should return all keys",                    testGetKeys)
  it("should rehash when map is nearly full",     testRehash)
})

function testInit() {
  const hashmap = new HashMap()
  hashmap.add("project", "Foundation.js")
  expect(hashmap.count).toBe(1)
  expect(hashmap.get("project")).toBe("Foundation.js")
}

function testGet() {
  const hashmap = new HashMap()
  hashmap.add("project", "Foundation.js")
  expect(hashmap.count).toBe(1)
  expect(hashmap.get("project")).toBe("Foundation.js")
  expect(hashmap.get("library")).toBe(null)
}

function testAddDuplicate() {
  const hashmap = new HashMap()
  hashmap.add("project", "Foundation.js")
  hashmap.add("project", "Collections")
  expect(hashmap.count).toBe(1)
  expect(hashmap.get("project")).toBe("Collections")
}

function testDelete() {
  const hashmap = new HashMap()
  hashmap.add("project", "Foundation.js")
  hashmap.add("module", "Collections")
  expect(hashmap.count).toBe(2)

  hashmap.delete("project")
  expect(hashmap.get("project")).toBe(null)
  expect(hashmap.get("module")).toBe("Collections")
  expect(hashmap.count).toBe(1)
}

function testHas() {
  const hashmap = new HashMap()
  hashmap.add("project", "Foundation.js")
  hashmap.add("module", "Collections")
  expect(hashmap.has("project")).toBe(true)
  expect(hashmap.has("folder")).toBe(false)
}

function testGetKeys() {
  const hashmap = new HashMap()
  hashmap.add("project", "Foundation.js")
  hashmap.add("module", "Collections")
  expect(hashmap.keys.toString()).toMatch("project,module")
}

function testRehash() {
  const hashmap = new HashMap(4)
  hashmap.add("England", "London")
  hashmap.add("Northern Ireland", "Belfast")
  hashmap.add("Scotland", "Edinburgh")
  hashmap.add("Wales", "Cardiff")
  expect(hashmap._initialCapacity).toBe(8)
}
