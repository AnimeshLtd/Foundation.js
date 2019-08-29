/**
 *  JavaScript built-in error type is purposefully generic and bare-bones.
 *  I haven't tried souping it up, but this `errors` module does provide some 
 *  oft-needed error types to better communicate error states and responses.
 * 
 *  You could choose to use these in your application, but do keep in mind
 *  that error handling is not the focus of this project for now.
 * 
 *  @module errors
 */
const OutOfBoundsError = require("./outOfBounds")

module.exports = {
  /** @type OutOfBoundsError */
  OutOfBoundsError
}
