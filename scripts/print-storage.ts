const len = localStorage.length;
for (let i = 0; i < len; i++) {
  const key = localStorage.key(i)!;
  const val = localStorage.getItem(key)!;
  if (key.startsWith("input-")) {
    console.log(key, "=", `[string len=${val.length}]`);
  } else if (key.startsWith("output-")) {
    console.log(key, "=", JSON.parse(val));
  } else {
    console.log(key, "=", val);
  }
}
