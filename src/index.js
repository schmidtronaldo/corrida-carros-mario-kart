import fs from 'fs/promises';

// let randomPlayer1 = Math.floor(Math.random()* 6);
// let randomPlayer2 = Math.floor(Math.random()* 6);
// while(randomPlayer1 == randomPlayer2){
//   randomPlayer2 = Math.floor(Math.random()* 6);
// }

function getTwoRandomPlayers(players) {
  // Embaralha o array (algoritmo Fisher-Yates)
  for (let i = players.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [players[i], players[j]] = [players[j], players[i]];
  }

  return [players[0], players[1]];
}

// Carregar os personagens do arquivo JSON
async function loadPlayers() {
  const data = await fs.readFile('src/characters.json', 'utf-8');
  const players = JSON.parse(data);

  const [player1, player2] = getTwoRandomPlayers(players);
  return [player1, player2];
  
}

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  const random = Math.random();
  return random < 0.33 ? "RETA" : random < 0.66 ? "CURVA" : "CONFRONTO";
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`
  );
}

// Função genérica para calcular e logar o resultado de qualquer atributo (velocidade, manobrabilidade, poder)
async function processBlock(character1, character2, block) {
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

  // Calculando o resultado para ambos os personagens
  let diceResult1 = await rollDice();
  let diceResult2 = await rollDice();

  totalTestSkill1 = diceResult1 + attribute1;
  totalTestSkill2 = diceResult2 + attribute2;

  await logRollResult(character1.NOME, attributeName, diceResult1, attribute1);
  await logRollResult(character2.NOME, attributeName, diceResult2, attribute2);

  return { totalTestSkill1, totalTestSkill2 };
}

// Função para lidar com o "CONFRONTO"
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

  console.log(powerResult2 === powerResult1 ? "Confronto empatado! Nenhum ponto foi perdido" : "");
}

// Função para verificar o vencedor da rodada
function updatePoints(character1, character2, totalTestSkill1, totalTestSkill2) {
  if (totalTestSkill1 > totalTestSkill2) {
    console.log(`${character1.NOME} marcou um ponto!`);
    character1.PONTOS++;
  } else if (totalTestSkill2 > totalTestSkill1) {
    console.log(`${character2.NOME} marcou um ponto!`);
    character2.PONTOS++;
  }
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    
    console.log(`🏁 Rodada ${round}`);
    await sleep(1000);
    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);
    await sleep(1000);
    // processar o bloco e obter os resultados
    let { totalTestSkill1, totalTestSkill2 } = await processBlock(character1, character2, block);

    if (block !== "CONFRONTO") {
      updatePoints(character1, character2, totalTestSkill1, totalTestSkill2);
    }

    console.log("-----------------------------");
    await sleep(1000);
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado final:");
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS)
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
  else if (character2.PONTOS > character1.PONTOS)
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
  else console.log("A corrida terminou em empate");
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


(async function main() {
  try {
    const [player1, player2] = await loadPlayers();

    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);
    await sleep(1000);
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
  } catch (error) {
    console.error("Erro ao iniciar a corrida:", error.message);
  }
})();

