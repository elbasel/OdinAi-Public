/**
 * @param s The number of seconds to delay the execution by.
 */
export const sleep = (s: number) =>
  new Promise((resolve) => setTimeout(resolve, s * 1000));
