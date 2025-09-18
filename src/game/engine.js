
import { getRandomBlock } from './blocks.js';
import { processBlock, updatePoints } from './race.js';
import { sleep } from './utils.js';

export async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);
    await sleep(1000);

    const block = await getRandomBlock();
    console.log(`Bloco: ${block}`);
    await sleep(1000);

    const { totalTestSkill1, totalTestSkill2 } = await processBlock(character1, character2, block);

    if (block !== "CONFRONTO") {
      updatePoints(character1, character2, totalTestSkill1, totalTestSkill2);
    }

    console.log("-----------------------------");
    await sleep(1000);
  }
}

export function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS)
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
  else if (character2.PONTOS > character1.PONTOS)
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
  else
    console.log("A corrida terminou em empate");
}
