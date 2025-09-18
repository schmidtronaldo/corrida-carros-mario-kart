// src/index.js
import { loadPlayers } from './game/players.js';
import { playRaceEngine, declareWinner } from './game/engine.js';
import { sleep } from './game/utils.js';

(async function main() {
  try {
    const [player1, player2] = await loadPlayers();
    await sleep(1000);
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);
    

    await playRaceEngine(player1, player2);
    declareWinner(player1, player2);

  } catch (error) {
    console.error("Erro ao iniciar a corrida:", error.message);
  }
})();


