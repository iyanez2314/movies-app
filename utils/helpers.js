export function generateMinMaxRandomNumbers(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
