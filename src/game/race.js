// src/game/race.js
import { rollDice } from './utils.js';

export async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`
  );
}

export async function processBlock(character1, character2, block) {
  let totalTestSkill1 = 0;
  let totalTestSkill2 = 0;
  let attribute1, attribute2, attributeName;

  if (block === "RETA") {
    attribute1 = character1.VELOCIDADE;
    attribute2 = character2.VELOCIDADE;
    attributeName = "velocidade";
  } else if (block === "CURVA") {
    attribute1 = character1.MANOBRABILIDADE;
    attribute2 = character2.MANOBRABILIDADE;
    attributeName = "manobrabilidade";
  } else if (block === "CONFRONTO") {
    await processConfrontation(character1, character2);
    return { totalTestSkill1: null, totalTestSkill2: null };
  }

  let diceResult1 = await rollDice();
  let diceResult2 = await rollDice();

  totalTestSkill1 = diceResult1 + attribute1;
  totalTestSkill2 = diceResult2 + attribute2;

  await logRollResult(character1.NOME, attributeName, diceResult1, attribute1);
  await logRollResult(character2.NOME, attributeName, diceResult2, attribute2);

  return { totalTestSkill1, totalTestSkill2 };
}

async function processConfrontation(character1, character2) {
  let diceResult1 = await rollDice();
  let diceResult2 = await rollDice();

  let powerResult1 = diceResult1 + character1.PODER;
  let powerResult2 = diceResult2 + character2.PODER;

  console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);
  await logRollResult(character1.NOME, "poder", diceResult1, character1.PODER);
  await logRollResult(character2.NOME, "poder", diceResult2, character2.PODER);

  if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
    console.log(`${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`);
    character2.PONTOS--;
  }

  if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
    console.log(`${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`);
    character1.PONTOS--;
  }

  if (powerResult2 === powerResult1) {
    console.log("Confronto empatado! Nenhum ponto foi perdido");
  }
}

export function updatePoints(character1, character2, totalTestSkill1, totalTestSkill2) {
  if (totalTestSkill1 > totalTestSkill2) {
    console.log(`${character1.NOME} marcou um ponto!`);
    character1.PONTOS++;
  } else if (totalTestSkill2 > totalTestSkill1) {
    console.log(`${character2.NOME} marcou um ponto!`);
    character2.PONTOS++;
  }
}
