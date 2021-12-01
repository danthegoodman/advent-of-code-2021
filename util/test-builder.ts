import { assertStrictEquals } from "https://deno.land/std@0.116.0/testing/asserts.ts";
import { getAocInput } from "./fetch-input.ts";
import { storedOutput } from "./local-storage.ts";

const year = 2021;

export class TestBuilder {
  readonly #day: number;
  readonly #dayStr: string;
  readonly #ignore: boolean;
  #section = "?";
  #example = 0;
  constructor(meta: { url: string }) {
    const match = meta.url.match(/\/0*(\d+).test.ts$/);
    if (!match) {
      throw new Error(
        "Test builder expected to be used from a [day].test.ts file",
      );
    }
    this.#day = Number.parseInt(match[1], 10);
    this.#dayStr = this.#day.toString().padStart(2, "0");

    const dateStr = `${year}-12-${this.#dayStr}T05:00:00Z`;
    this.#ignore = Date.now() < new Date(dateStr).getTime();
  }

  section(s: string): this {
    this.#section = s;
    this.#example = 0;
    return this;
  }

  example<T>(expected: T, fn: () => T): this {
    this.#example += 1;
    Deno.test({
      name: [
        this.#dayStr,
        this.#section,
        `ex${this.#example.toString().padStart(2)} `,
      ].join("/"),
      ignore: this.#ignore,
      fn: () => {
        assertStrictEquals(fn(), expected);
      },
    });
    return this;
  }

  actual(fn: (input: string) => unknown): this {
    const name = `${this.#dayStr}/${this.#section}/input`;
    Deno.test({
      name,
      ignore: this.#ignore,
      fn: async () => {
        const input = await getAocInput(year, this.#day);
        const output = fn(input);
        const storage = storedOutput(year, this.#day, name);

        const lastOutput = storage.read();
        if (Deno.env.get("AOC_SAVE_TESTS") === "true") {
          storage.write(JSON.stringify(output));
          testLog(`[saving] ${output}`);
        } else if (lastOutput === null) {
          testLog(output);
        } else {
          const lastOutVal = JSON.parse(lastOutput);
          assertStrictEquals(output, lastOutVal);
        }
      },
    });
    return this;
  }
}

// Write directly to stdout here without newlines to appear nicely in test log
function testLog(str: unknown) {
  Deno.stdout.writeSync(new TextEncoder().encode(` ${str}`));
}
