import { TestBuilder } from "../util/test-builder.ts";

const example = `\
forward 5
down 5
forward 8
up 3
down 8
forward 2
`;

new TestBuilder(import.meta)
  .section("a")
  .example(150, () => solveA(example))
  .actual(solveA)
  .section("b")
  .example(900, () => solveB(example))
  .actual(solveB);

function solveA(input: string) {
  let d = 0;
  let x = 0;
  const s = input.split("\n").map((it) => it.split(" "));
  for (const [name, countS] of s) {
    const n = Number.parseInt(countS);
    if (name === "forward") {
      x += n;
    }
    if (name === "down") {
      d += n;
    }
    if (name === "up") {
      d -= n;
    }
  }
  return x * d;
}

function solveB(input: string) {
  let d = 0;
  let x = 0;
  let a = 0;
  const s = input.split("\n").map((it) => it.split(" "));
  for (const [name, countS] of s) {
    const n = Number.parseInt(countS);
    if (name === "forward") {
      x += n;
      d += n * a;
    }
    if (name === "down") {
      a += n;
    }
    if (name === "up") {
      a -= n;
    }
  }
  return x * d;
}
