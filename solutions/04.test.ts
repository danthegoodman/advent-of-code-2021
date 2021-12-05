import { TestBuilder } from "../util/test-builder.ts";
import { countWhere, sumBy } from "../util/common-fn.ts";

const example = `\
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

new TestBuilder(import.meta)
  .section("a")
  .example(4512, () => solveA(example))
  .actual(solveA)
  .section("b")
  .example(1924, () => solveB(example))
  .actual(solveB);

type Board = ReturnType<typeof parseInput>["boards"][number];

function parseInput(input: string) {
  const [numLine, ...boardSections] = input.trim().split("\n\n");
  return {
    nums: numLine.split(",").map(Number),
    boards: boardSections.map((s) => {
      const grid = s.split("\n").map((ln) => ln.match(/(\d+)/g)!.map(Number));
      return {
        gridNums: grid,
        gridCalled: grid.map((r) => r.map(() => false)),
        uncalled: new Set(grid.flat()),
        hasWon: false,
      };
    }),
  };
}
function updateBoard(b: Board, n: number) {
  b.uncalled.delete(n);

  for (const [r, row] of b.gridNums.entries()) {
    const c = row.indexOf(n);
    if (c !== -1) {
      b.gridCalled[r][c] = true;
      return;
    }
  }
  throw new Error("state error");
}
function isWinner({ gridCalled }: Board) {
  for (let i = 0; i < gridCalled.length; i++) {
    if (gridCalled[i].every((it) => it)) return true;
    if (gridCalled.every((row) => row[i])) return true;
  }
  return false;
}

function solveA(input: string) {
  const { nums, boards } = parseInput(input);

  for (const n of nums) {
    for (const b of boards) {
      if (!b.uncalled.has(n)) continue;
      updateBoard(b, n);
      if (isWinner(b)) {
        return sumBy(b.uncalled, (it) => it) * n;
      }
    }
  }

  throw new Error("not found");
}

function solveB(input: string) {
  const { nums, boards } = parseInput(input);

  for (const n of nums) {
    for (const b of boards) {
      if (b.hasWon) continue;
      if (!b.uncalled.has(n)) continue;
      updateBoard(b, n);

      if (isWinner(b)) {
        if (countWhere(boards, (it) => it.hasWon) < boards.length - 1) {
          b.hasWon = true;
        } else {
          return sumBy(b.uncalled, (it) => it) * n;
        }
      }
    }
  }

  throw new Error("not found");
}
