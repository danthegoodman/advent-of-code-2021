import { storedInput, storedSessionToken } from "./local-storage.ts";

/**
 * Gets the given year & day's Advent of code input.
 *
 * You will be prompted (via window.prompt) to provide your AOC session token.
 * A request will then be made to fetch your AOC input.
 *
 * Your AOC token and the returned input will be cached in local storage.
 * @param year
 * @param day
 */
export async function getAocInput(year: number, day: number) {
  const storage = storedInput(year, day);
  const cachedInput = storage.read();
  if (cachedInput !== null) return cachedInput;

  let input;
  while (!input) {
    input = await fetchInput(year, day);
  }
  storage.write(input);
  return input;
}

async function fetchInput(year: number, day: number) {
  const sessionToken = getSessionToken();
  const permissionDesc = { name: "net", host: "adventofcode.com" } as const;

  const perm = await Deno.permissions.request(permissionDesc);
  if (perm.state === "denied") {
    throw new Error("Cannot fetch input; permission denied");
  } else if (perm.state !== "granted") {
    throw new Error(`Unknown permission state: ${perm.state}`);
  }

  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  const resp = await fetch(url, {
    headers: { cookie: `session=${sessionToken}` },
  });
  const respText = await resp.text();
  if (resp.status === 404) {
    throw new Error(`404: ${url}`);
  }
  if (resp.status !== 200) {
    console.log(`Server response: ${resp.status}`);
    console.log("Assuming the session token is invalid. Clearing...");
    await resp.arrayBuffer();
    storedSessionToken().remove();
    return null;
  }

  return respText;
}

function getSessionToken() {
  const storage = storedSessionToken();
  const cachedToken = storage.read();
  if (cachedToken !== null) return cachedToken;

  const token = prompt(`

Please provide your session token from adventofcode.com
You can obtain it from the 'session' cookie, found by inspecting any of the
network requests once you are logged in. We will use it to fetch your input.
Session Token:`)?.trim();

  if (!token) throw new Error("No token provided");

  storage.write(token);
  return token;
}
