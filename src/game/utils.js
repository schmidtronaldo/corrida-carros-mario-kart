
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}
