import Game from "./Classes/Game.js";
import Menu from "./Classes/Menu.js";
import MapSelector from "./Classes/MapSelector.js";
import gameUI from "./GameUI.js"
import CONFIGS from "./CONFIGS.js";
import CharacterCreation from "./Classes/CharacterCreation.js";

let currentMenu = null

function moveToMainMenu(){
    const mainMenu = new Menu("Main Menu")
    const savedMapGenData = JSON.parse(localStorage.getItem('mapGenData'))
        if(savedMapGenData !== null){
            mainMenu.addOption("Continue", moveToMapSelector)
        }
    mainMenu.addOption("New game", moveToCharacterCreation)
    mainMenu.addOption("Reset", ()=> {localStorage.clear(); location.reload()})

    currentMenu = mainMenu
}

function moveToCharacterCreation(){
    currentMenu.terminate()
    const charCreation = new CharacterCreation(moveToMapSelector)
    currentMenu = charCreation.currentMenu
}

function moveToMapSelector(newPlayerStats){

    let mapSelector
    const SEED = 1

    currentMenu.terminate()
    document.body.innerHTML = gameUI

    const savedMapGenData = JSON.parse(localStorage.getItem('mapGenData'))
    if(savedMapGenData !== null){
        mapSelector = new MapSelector(savedMapGenData.seed, moveToGame,{
            settlementsQTY: savedMapGenData.settlementsQTY,
            waterQTY: savedMapGenData.waterQTY,
            mountainQTY: savedMapGenData.mountainQTY
        }, true, newPlayerStats)
        mapSelector.start()

    }else{
        mapSelector = new MapSelector(SEED, moveToGame, {
            settlementsQTY: "10",
            waterQTY: "standard",
            mountainQTY: "standard"
        } ,false, newPlayerStats)
        mapSelector.start()
    }

    currentMenu = mapSelector
}

function moveToGame(seed, currentMap, newPlayerStats){
    const game = new Game(seed,currentMap,CONFIGS)
    const savedPlayer = JSON.parse(localStorage.getItem('player'))
    if(savedPlayer !== null){
        game.player = savedPlayer
    }else{
        game.setupPlayer(newPlayerStats)
        localStorage.setItem('player', JSON.stringify(game.player))
    }
    game.update()
    console.log(game);
}

function storageUsage(){
    const maxUsage = 5242870
    const currentUsage = maxUsage - (1024 * 1024 * 5 - escape(encodeURIComponent(JSON.stringify(localStorage))).length)
    console.log("localStorage: ", (currentUsage/maxUsage).toFixed(4) + "%")
}

moveToMainMenu()
storageUsage()