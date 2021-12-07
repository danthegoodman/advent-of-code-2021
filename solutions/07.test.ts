import { TestBuilder } from "../util/test-builder.ts";
import { maxBy, minBy, sumBy } from "../util/common-fn.ts";

const example = `\
16,1,2,0,4,2,7,1,2,14`;

new TestBuilder(import.meta)
  .section("a")
  .example(37, () => solveA(example))
  .actual(solveA)
  .section("b")
  .example(168, () => solveB(example))
  .actual(solveB);

function solveA(input: string) {
  const positions = input.split(",").map(Number);
  return minBy(iterCostsA(positions), Number);
}

function* iterCostsA(positions: number[]) {
  const start = minBy(positions, Number);
  const end = maxBy(positions, Number);
  for (let i = start; i < end; i++) {
    yield sumBy(positions, (it) => Math.abs(it - i));
  }
}

function solveB(input: string) {
  const positions = input.split(",").map(Number);
  return minBy(iterCostsB(positions), Number);
}

function* iterCostsB(positions: number[]) {
  const start = minBy(positions, Number);
  const end = maxBy(positions, Number);
  for (let i = start; i < end; i++) {
    let cost = 0;
    for (const n of positions) {
      for (let k = 1; k <= Math.abs(n - i); k++) {
        cost += k;
      }
    }
    yield cost;
  }
}
