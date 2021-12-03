import { TestBuilder } from "../util/test-builder.ts";
import { countWhere } from "../util/common-fn.ts";

const example = `\
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

new TestBuilder(import.meta)
  .section("a")
  .example(198, () => solveA(example))
  .actual(solveA)
  .section("b")
  .example(230, () => solveB(example))
  .actual(solveB);

function getCommonFull(isMost: boolean, data: string[]) {
  let result = "";
  for (let i = 0; i < data[0].length; i++) {
    result += getCommonOne(isMost, data, i);
  }
  return result;
}

function getCommonOne(isMost: boolean, data: string[], ndx: number) {
  const oneCount = countWhere(data, (it) => it[ndx] === "1");
  const half = Math.round(data.length / 2);
  if (isMost) {
    return oneCount >= half ? "1" : "0";
  } else {
    return oneCount >= half ? "0" : "1";
  }
}

function solveA(input: string) {
  const data = input.split("\n");
  const gamma = getCommonFull(true, data);
  const epsil = getCommonFull(false, data);
  return Number.parseInt(gamma, 2) * Number.parseInt(epsil, 2);
}

function solveB(input: string) {
  const data = input.split("\n");

  let oxy = data;
  let co2 = data;
  let ndx = 0;
  while (ndx < data[0].length) {
    if (oxy.length > 1) {
      const common = getCommonOne(true, oxy, ndx);
      oxy = oxy.filter((x) => x[ndx] === common);
    }
    if (co2.length > 1) {
      const common = getCommonOne(false, co2, ndx);
      co2 = co2.filter((x) => x[ndx] === common);
    }
    ndx += 1;
  }
  return Number.parseInt(oxy[0], 2) * Number.parseInt(co2[0], 2);
}
