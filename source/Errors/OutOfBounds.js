/**
 *  Thrown when a data structure is accessed at an index that falls
 *  outside the bounds [0, size).
 *  
 *  @class
 */
class OutOfBoundsError extends Error {
  constructor(message = "Index out of bounds") {
    super(message)
    this.name = "OutOfBoundsError"
  }
}

module.exports = OutOfBoundsError
