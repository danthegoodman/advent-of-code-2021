# Advent of Code 2021

<https://www.typescriptlang.org/>

<https://deno.land/>

<http://adventofcode.com/2021/>

## Compiling & Running

Run a day's set of code

```
$ ./run test 01 

Check file:///Users/me/advent-of-code-2021/solutions/01.test.ts
running 4 tests from file:///Users/me/advent-of-code-2021/solutions/01.test.ts
test 01/a/ex 1  ... ok (10ms)
test 01/a/input ... 9273 ok (11ms)
test 01/b/ex 1  ... ok (9ms)
test 01/b/input ... 8374 ok (10ms)

test result: ok. 4 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (59ms)
```

Once you've gotten your two stars, save the output to perform validations
against later. You can resave any time.

```
$ ./run save 01
...

$ ./run test 01

Check file:///Users/me/advent-of-code-2021/solutions/01.test.ts
running 4 tests from file:///Users/me/advent-of-code-2021/solutions/01.test.ts
test 01/a/ex 1  ... ok (10ms)
test 01/a/input ... ok (11ms)
test 01/b/ex 1  ... ok (15ms)
test 01/b/input ... FAILED (9ms)

failures:

01/b/input
AssertionError: Values are not strictly equal:

    [Diff] Actual / Expected

-   8000
+   8374
...
```

Also available:

- Run all the solutions: `./run test`
  - Tests won't run if they haven't been released yet.
- Save all the solutions: `./run save`
- Script Utilities
  - `./run script print-storage.ts`
  - `./run script print-storage.ts`

## Notes

When running, you will be prompted for you AOC session token so that your input
may be fetched. Your token and the fetched input will be cached in local
storage.

Tested with Deno 1.16.3
