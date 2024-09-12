import Game from "./Classes/Game.js";
import Menu from "./Classes/Menu.js";
import MapSelector from "./Classes/MapSelector.js";
import gameUI from "./GameUI.js"
import CONFIGS from "./CONFIGS.js";
import CharacterCreation from "./Classes/CharacterCreation.js";
import EditableStatsScreen from "./Classes/EditableStatsScreen.js"

let currentMenu = null

function moveToMainMenu(){
    const mainMenu = new Menu("Main Menu")
    const savedMapGenData = JSON.parse(localStorage.getItem('mapGenData'))
        if(savedMapGenData !== null){
            mainMenu.addOption("Continue", moveToMapSelector)
        }
    mainMenu.addOption("New game", moveToEditChar)
    mainMenu.addOption("Reset", ()=> {localStorage.clear(); location.reload()})

    currentMenu = mainMenu
}

function moveToEditChar(){
    currentMenu.terminate()
    const editScreen = new EditableStatsScreen("Edit Stats", moveToMapSelector)
    editScreen.addOption("Strenght", 1, 99, 3)
    editScreen.addOption("Agility", 1, 99, 3)
    editScreen.addOption("Intelligence", 1, 99, 3)
    editScreen.addOption("Constitution", 1, 99, 3)
    editScreen.addOption("spacer", 0, 0, 0)
    editScreen.addOption("One Handed Weapons", 1, 99, 3)
    editScreen.addOption("Ranged Weapons", 1, 99, 3)
    editScreen.addOption("Two Handed Weapons", 1, 99, 3)
    editScreen.addOption("spacer", 0, 0, 0)
    editScreen.addOption("Shields", 1, 99, 3)
    editScreen.addOption("Quivers", 1, 99, 3)
    editScreen.addOption("Books", 1, 99, 3)
    editScreen.addOption("Orbs", 1, 99, 3)
    editScreen.addOption("spacer", 0, 0, 0)
    editScreen.addOption("Arcane mastery", 1, 99, 3)
    editScreen.addOption("Fire mastery", 1, 99, 3)
    editScreen.addOption("Water mastery", 1, 99, 3)
    editScreen.addOption("Air mastery", 1, 99, 3)
    editScreen.addOption("Earth mastery", 1, 99, 3)
    editScreen.addOption("spacer", 0, 0, 0)
    editScreen.addOption("Herbalism", 1, 99, 3)
    editScreen.addOption("Alchemy", 1, 99, 3)
    editScreen.addOption("spacer", 0, 0, 0)
    editScreen.addOption("Finish", 0, 0, 0)
    currentMenu = editScreen.subMenu
}

/* function moveToCharacterCreation(){
    currentMenu.terminate()
    const charCreation = new CharacterCreation(moveToMapSelector)
    currentMenu = charCreation.currentMenu
} */

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