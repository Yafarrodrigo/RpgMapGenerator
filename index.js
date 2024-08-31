import Game from "./Classes/Game.js";
import GameManager from "./Classes/GameManager.js";

const gameManager = new GameManager(Math.random()*9999999)
gameManager.start()
//const game = new Game()

console.log(gameManager);
//game.start()
