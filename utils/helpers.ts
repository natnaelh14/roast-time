/** Combines multiple class strings into one. Separate by comma */
export function classNames(...classes: unknown[]): string {
    return classes.filter(Boolean).join(" ");
  }

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));