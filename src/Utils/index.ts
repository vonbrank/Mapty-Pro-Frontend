export function delay(t: number, v?: number) {
  return new Promise((resolve) => setTimeout(resolve, t, v));
}
