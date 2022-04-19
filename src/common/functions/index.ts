export const throttle = <T1 extends Array<any>, T2>(
  func: (...args: T1) => T2,
  limit: number
): typeof func => {
  let cached: T2 | undefined;
  const ret = (...args: T1): T2 => {
    if (!cached) {
      cached = func(...args);
      setTimeout(() => {
        cached = undefined;
      }, limit);
    }
    return cached;
  };

  return ret as typeof func;
};
