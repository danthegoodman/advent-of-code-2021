import { TestBuilder } from "../util/test-builder.ts";

const example = `\
199
200
208
210
200
207
240
269
260
263`;

new TestBuilder(import.meta)
  .section("a")
  .example(7, () => solveA(example))
  .actual(solveA)
  .section("b")
  .example(5, () => solveB(example))
  .actual(solveB);

function solveA(input: string) {
  const vals = input.split("\n").map(Number);
  let prev = Number.POSITIVE_INFINITY;
  let count = 0;
  for (const v of vals) {
    if (v > prev) {
      count++;
    }
    prev = v;
  }
  return count;
}

function solveB(input: string) {
  const vals = input.split("\n").map(Number);
  let prev = vals[0] + vals[1] + vals[2];
  let count = 0;
  for (let i = 3; i < vals.length; i++) {
    const next = prev + vals[i] - vals[i - 3];
    if (next > prev) {
      count++;
    }
    prev = next;
  }
  return count + 1;
}
