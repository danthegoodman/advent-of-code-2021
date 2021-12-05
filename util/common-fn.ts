export function countWhere<T>(data: Iterable<T>, fn: (t: T) => boolean) {
  let count = 0;
  for (const x of data) {
    if (fn(x)) count++;
  }
  return count;
}

export function sumBy<T>(data: Iterable<T>, fn: (t: T) => number) {
  let sum = 0;
  for (const s of data) {
    sum += fn(s);
  }
  return sum;
}
