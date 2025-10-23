type ClassValue = string | number | false | null | undefined | ClassDictionary | ClassValue[];

interface ClassDictionary {
  [key: string]: boolean | undefined | null;
}

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input && input !== 0) continue;

    if (typeof input === "string" || typeof input === "number") {
      if (String(input).trim()) {
        classes.push(String(input).trim());
      }
      continue;
    }

    if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) {
        classes.push(nested);
      }
      continue;
    }

    if (typeof input === "object") {
      for (const key in input) {
        if (input[key]) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(" ");
}
