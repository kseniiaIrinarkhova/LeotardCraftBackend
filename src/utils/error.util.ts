/**
 * Helper function to be sure that we resieved an error message as a string
 * @param error anything that has a behaviour of an error
 * @returns 
 */
export function getErrorMessage(error: unknown) : string {
    //if error is instance of Error class, return its message
    if (error instanceof Error) return error.message;
    //else, convert what we've gor to string and return
    return String(error);
}