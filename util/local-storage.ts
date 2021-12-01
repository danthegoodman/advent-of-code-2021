export function storedInput(year: number, day: number) {
  return storedThing(`input-${year}-${day}`);
}

export function storedSessionToken() {
  return storedThing(`sessionToken`);
}

export function storedOutput(year: number, day: number, name: string) {
  return storedThing(`output-${year}-${day}-${name}`);
}

function storedThing(key: string) {
  return {
    read(): string | null {
      return localStorage.getItem(key);
    },
    write(val: string) {
      localStorage.setItem(key, val);
    },
    remove() {
      localStorage.removeItem(key);
    },
  };
}
