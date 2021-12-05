import { TestBuilder } from "../util/test-builder.ts";
import { countWhere, maxBy, sumBy } from "../util/common-fn.ts";

const example = `\
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

new TestBuilder(import.meta)
  .section("a")
  .example(5, () => solve(example, true))
  .actual((input) => solve(input, true))
  .section("b")
  .example(12, () => solve(example, false))
  .actual((input) => solve(input, false));

function solve(input: string, onlyLinear: boolean) {
  const segments = Array.from(
    input.matchAll(/(\d+),(\d+) -> (\d+),(\d+)/g),
    (it) => {
      const [, a, b, c, d] = it.map(Number);
      const pairs = [[a, b], [c, d]];
      return pairs.sort((x, y) =>
        x[0] === y[0] ? (x[1] - y[1]) : (x[0] - y[0])
      );
    },
  );

  const maxX = maxBy(segments, (it) => it[1][0]);
  const maxY = maxBy(segments, (it) => it[1][1]);

  const grid = Array.from(
    { length: maxX + 1 },
    () => Array.from({ length: maxY + 1 }, () => 0),
  );

  for (const [[a1x, a1y], [a2x, a2y]] of segments) {
    let x = a1x;
    let y = a1y;
    let delta, steps;
    if (a1x === a2x) {
      delta = { x: 0, y: 1 };
      steps = a2y - a1y;
    } else if (a1y == a2y) {
      delta = { x: 1, y: 0 };
      steps = a2x - a1x;
    } else {
      if (onlyLinear) continue;
      delta = { x: 1, y: (a2y < a1y ? -1 : 1) };
      steps = a2x - a1x;
    }
    for (let i = 0; i <= steps; i++) {
      grid[x][y] += 1;
      x += delta.x;
      y += delta.y;
    }
  }

  return sumBy(grid, (row) => countWhere(row, (it) => it >= 2));
}
