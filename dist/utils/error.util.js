"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorMessage = void 0;
/**
 * Helper function to be sure that we resieved an error message as a string
 * @param error anything that has a behaviour of an error
 * @returns
 */
function getErrorMessage(error) {
    //if error is instance of Error class, return its message
    if (error instanceof Error)
        return error.message;
    //else, convert what we've gor to string and return
    return String(error);
}
exports.getErrorMessage = getErrorMessage;
