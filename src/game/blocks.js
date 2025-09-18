// src/game/blocks.js
export async function getRandomBlock() {
  const random = Math.random();
  return random < 0.33 ? "RETA" : random < 0.66 ? "CURVA" : "CONFRONTO";
}
