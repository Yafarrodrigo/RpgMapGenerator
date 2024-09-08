import Game from "./Classes/Game.js";
import MainMenu from "./Classes/MainMenu.js";
import MapSelector from "./Classes/MapSelector.js";
import gameUI from "./GameUI.js"
import CONFIGS from "./CONFIGS.js";


const mainMenu = new MainMenu()
let currentScreen = mainMenu
mainMenu.AddOption("Continue", moveToMapSelector)
mainMenu.AddOption("New Game", moveToMapSelector)
mainMenu.AddOption("Options", moveToMapSelector)

function moveToMapSelector(){
    mainMenu.terminate()
    document.body.innerHTML = gameUI
    const mapSelector = new MapSelector(1, moveToGame)
    currentScreen = mapSelector
    mapSelector.start()
}

function moveToGame(currentMap){
    const game = new Game(1,currentMap,CONFIGS)
    currentScreen = game
    game.setupPlayer()
    game.update()
}
// bypass main menu :)
moveToMapSelector()