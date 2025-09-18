// src/game/players.js
import fs from 'fs/promises';

function getTwoRandomPlayers(players) {
  for (let i = players.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [players[i], players[j]] = [players[j], players[i]];
  }

  return [players[0], players[1]];
}

export async function loadPlayers() {
  const data = await fs.readFile('src/characters.json', 'utf-8');
  const players = JSON.parse(data);

  if (players.length < 2) {
    throw new Error("É necessário pelo menos dois jogadores.");
  }

  return getTwoRandomPlayers(players);
}
