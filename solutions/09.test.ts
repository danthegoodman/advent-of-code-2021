import { TestBuilder } from "../util/test-builder.ts";
import { sumBy } from "../util/common-fn.ts";

const example = `\
2199943210
3987894921
9856789892
8767896789
9899965678`;

new TestBuilder(import.meta)
  .section("a")
  .example(15, () => solveA(example))
  .actual(solveA)
  .section("b")
  .example(1134, () => solveB(example))
  .actual(solveB);

function solveA(input: string) {
  const grid = input.split("\n").map((ln) => ln.split("").map(Number));
  return sumBy(findLowPoints(grid), ([r, c]) => grid[r][c] + 1);
}

function findLowPoints(grid: number[][]) {
  const points = [];
  for (const [r, row] of grid.entries()) {
    for (const [c, cell] of row.entries()) {
      if (r > 0 && grid[r - 1][c] <= cell) continue;
      if (c > 0 && grid[r][c - 1] <= cell) continue;
      if (r < grid.length - 1 && grid[r + 1][c] <= cell) continue;
      if (c < row.length - 1 && grid[r][c + 1] <= cell) continue;
      points.push([r, c]);
    }
  }
  return points;
}

function solveB(input: string) {
  const grid = input.split("\n").map((ln) => ln.split("").map(Number));
  const sizes = findLowPoints(grid).map((low) => {
    const visited = new Set();
    const queue = [low];
    while (queue.length) {
      const [r, c] = queue.pop()!;
      const cell = grid[r]?.[c];
      if (cell === undefined) continue;
      if (cell === 9) continue;
      const key = `${r},${c}`;
      if (visited.has(key)) continue;
      visited.add(key);
      queue.push(
        [r - 1, c],
        [r + 1, c],
        [r, c - 1],
        [r, c + 1],
      );
    }
    return visited.size;
  });
  const [a, b, c] = sizes.sort((a, b) => b - a);
  return a * b * c;
}
