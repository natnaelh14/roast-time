/** Combines multiple class strings into one. Separate by comma */
export function classNames(...classes: unknown[]): string {
    return classes.filter(Boolean).join(" ");
  }

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const parseJwt = (token: string) => {
    if (!token) throw new Error("No token found.")
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    if(typeof window !== "undefined") {
      return JSON.parse(window.atob(base64));
    }
}