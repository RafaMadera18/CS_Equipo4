export function range(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min); //NOSONAR not used in secure contexts
}
