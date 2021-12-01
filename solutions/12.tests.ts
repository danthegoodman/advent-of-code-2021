import { TestBuilder } from "../util/test-builder.ts";

const example = `\
`;

new TestBuilder(import.meta)
  .section("a")
  .example(-1, () => solveA(example))
  .actual(solveA)
  .section("b")
  .example(-1, () => solveB(example))
  .actual(solveB);

function solveA(input: string) {
  return input.length;
}

function solveB(input: string) {
  return input.length;
}
