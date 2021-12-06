import { TestBuilder } from "../util/test-builder.ts";
import { memoize, sumBy } from "../util/common-fn.ts";

const example = `3,4,3,1,2`;

const memoCountFish: (n: number, daysRemain: number) => number = memoize(
  (n, daysRemain) => {
    if (daysRemain <= n) return 1;
    return memoCountFish(7, daysRemain - n) + memoCountFish(9, daysRemain - n);
  },
);

new TestBuilder(import.meta)
  .section("a")
  .example(26, () => solve(example, 18))
  .example(5934, () => solve(example, 80))
  .actual((input) => solve(input, 80))
  .section("b")
  .actual((input) => solve(input, 256));

function solve(input: string, days: number) {
  const fishes = input.split(",").map(Number);
  return sumBy(fishes, (f) => memoCountFish(f, days));
}
