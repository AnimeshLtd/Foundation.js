const Foundation = require("../source/foundation")

describe("Foundation.js spec", function () {
  it("should import fine", testImport)
})

function testImport() {
  const library = new Foundation()
  expect(library.name).toBe("Foundation v0.0.1")
}
