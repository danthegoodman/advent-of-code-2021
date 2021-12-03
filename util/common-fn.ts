export function countWhere<T>(data: Iterable<T>, fn: (t: T) => boolean) {
  let count = 0;
  for (const x of data) {
    if (fn(x)) count++;
  }
  return count;
}
