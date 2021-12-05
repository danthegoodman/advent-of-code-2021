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

export function minBy<T>(data: Iterable<T>, fn: (t: T) => number) {
  let result = Number.POSITIVE_INFINITY;
  for (const s of data) {
    const val = fn(s);
    if (val < result) {
      result = val;
    }
  }
  return result;
}

export function maxBy<T>(data: Iterable<T>, fn: (t: T) => number) {
  let result = Number.NEGATIVE_INFINITY;
  for (const s of data) {
    const val = fn(s);
    if (val > result) {
      result = val;
    }
  }
  return result;
}
