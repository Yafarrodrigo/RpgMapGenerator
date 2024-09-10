import Game from "./Classes/Game.js";
import MainMenu from "./Classes/MainMenu.js";
import MapSelector from "./Classes/MapSelector.js";
import gameUI from "./GameUI.js"
import CONFIGS from "./CONFIGS.js";


const mainMenu = new MainMenu()
const savedMapGenData = JSON.parse(localStorage.getItem('mapGenData'))
    if(savedMapGenData !== null){
        mainMenu.addOption("Continue", moveToMapSelector)
    }
mainMenu.addOption("New game", startNewGame)
mainMenu.addOption("Reset", ()=> {localStorage.clear(); location.reload()})

/* mainMenu.addOption("Warrior",()=>console.log("Warrior selected"))
mainMenu.addOption("Mage",()=>console.log("Mage selected"))
mainMenu.addOption("Rogue",()=>console.log("Rogue selected"))
mainMenu.addOption("Hunter",()=>console.log("Hunter selected"))
mainMenu.addOption("Priest",()=>console.log("Priest selected")) */

/* mainMenu.AddOption("Continue", moveToMapSelector)
mainMenu.AddOption("New Game", startNewGame)
mainMenu.AddOption("Options", ()=>console.log("nothing yet :(")) */

function startNewGame(){
    localStorage.clear()
    moveToMapSelector()
}

function moveToMapSelector(){

    let mapSelector
    const SEED = 1

    mainMenu.terminate()
    document.body.innerHTML = gameUI

    const savedMapGenData = JSON.parse(localStorage.getItem('mapGenData'))
    if(savedMapGenData !== null){
        mapSelector = new MapSelector(savedMapGenData.seed, moveToGame,{
            settlementsQTY: savedMapGenData.settlementsQTY,
            waterQTY: savedMapGenData.waterQTY,
            mountainQTY: savedMapGenData.mountainQTY
        }, true)
        mapSelector.start()

    }else{
        mapSelector = new MapSelector(SEED, moveToGame, {
            settlementsQTY: "10",
            waterQTY: "standard",
            mountainQTY: "standard"
        } ,false)
        mapSelector.start()
    }
}

function moveToGame(seed, currentMap){
    const game = new Game(seed,currentMap,CONFIGS)
    const savedPlayer = JSON.parse(localStorage.getItem('player'))
    if(savedPlayer !== null){
        game.player = savedPlayer
    }else{
        game.setupPlayer()
        localStorage.setItem('player', JSON.stringify(game.player))
    }
    game.update()
}


// skip to game
//moveToMapSelector()