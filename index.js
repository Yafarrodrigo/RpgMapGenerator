import Game from "./Classes/Game.js";
import Menu from "./Classes/Menu.js";
import MapSelector from "./Classes/MapSelector.js";
import gameUI from "./GameUI.js"
import CONFIGS from "./CONFIGS.js";
import EditableStatsScreen from "./Classes/EditableStatsScreen.js"
import CharacterCreation from "./Classes/CharacterCreation.js"

let currentMenu = null

function moveToMainMenu(){
    document.body.innerHTML = ""
    const mainMenu = new Menu("Main Menu")
    const savedMapGenData = localStorage.getItem('gameMap')
        if(savedMapGenData !== null){
            mainMenu.addOption("Continue", moveToMapSelector)
        }
    mainMenu.addOption("New game", moveToCharacterCreation)
    mainMenu.addOption("Reset", moveToCheckForReset)

    currentMenu = mainMenu
}

export function moveToEditChar(attributes, skills){
    currentMenu.terminate()
    const editScreen = new EditableStatsScreen("Edit Stats", moveToMapSelector)
    editScreen.addOption("Strenght", 1, 99, attributes.str)
    editScreen.addOption("Agility", 1, 99, attributes.agi)
    editScreen.addOption("Intelligence", 1, 99, attributes.int)
    editScreen.addOption("Constitution", 1, 99, attributes.con)
    editScreen.addOption("spacer", 0, 0, 0)
    editScreen.addOption("One Handed Weapons", 1, 99, skills.oneHandedWeapons)
    editScreen.addOption("Ranged Weapons", 1, 99, skills.rangedWeapons)
    editScreen.addOption("Two Handed Weapons", 1, 99, skills.twoHandedWeapons)
    editScreen.addOption("spacer", 0, 0, 0)
    editScreen.addOption("Shields", 1, 99, skills.shields)
    editScreen.addOption("Quivers", 1, 99, skills.quivers)
    editScreen.addOption("Books", 1, 99, skills.books)
    editScreen.addOption("Orbs", 1, 99, skills.orbs)
    editScreen.addOption("spacer", 0, 0, 0)
    editScreen.addOption("Arcane mastery", 1, 99, skills.arcaneMastery)
    editScreen.addOption("Fire mastery", 1, 99, skills.fireMastery)
    editScreen.addOption("Water mastery", 1, 99, skills.waterMastery)
    editScreen.addOption("Air mastery", 1, 99, skills.airMastery)
    editScreen.addOption("Earth mastery", 1, 99, skills.earthMastery)
    editScreen.addOption("spacer", 0, 0, 0)
    editScreen.addOption("Herbalism", 1, 99, skills.herbalism)
    editScreen.addOption("Alchemy", 1, 99, skills.alchemy)
    editScreen.addOption("spacer", 0, 0, 0)
    editScreen.addOption("Finish", 0, 0, 0)
    currentMenu = editScreen.subMenu
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

    const savedMap = localStorage.getItem('gameMap')
    if(savedMap !== null){

        const loadGameWorker = new Worker("./Workers/decompressSave.js")
            loadGameWorker.postMessage(savedMap)
            loadGameWorker.onmessage = ({data}) => {
                const {tiles,settlements,paths} = JSON.parse(data)
                const mapData = {tiles,settlements,paths}
                moveToGame(mapData.seed, mapData, newPlayerStats)
                document.getElementById('blackscreen').style.display = "none"
                loadGameWorker.terminate()
            };
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

function moveToCheckForReset(){
    currentMenu.terminate()
    const checkMenu = new Menu("Are you sure?")
    checkMenu.addOption("No", () => location.reload())
    checkMenu.addOption("Yes", () => {localStorage.clear(); location.reload()})

    currentMenu = checkMenu
}

function moveToGame(seed, mapData, newPlayerStats){
    currentMenu = null
    const game = new Game(seed,mapData,CONFIGS)
    const savedPlayer = JSON.parse(localStorage.getItem('player'))
    if(savedPlayer !== null){
        game.player = savedPlayer
    }else{
        game.setupPlayer(newPlayerStats)
        localStorage.setItem('player', JSON.stringify(game.player))
        game.saveGame()
    }
    game.update()
}

function storageUsage(){
    console.log("localStorage usage: ", localStorageSize()+"kb")
}

function localStorageSize() {
    let _lsTotal = 0,_xLen, _x;
    for (_x in localStorage) {
    if (!localStorage.hasOwnProperty(_x)) continue;
        _xLen = (localStorage[_x].length + _x.length) * 2;
        _lsTotal += _xLen;
    }
  return  (_lsTotal / 1024).toFixed(2);
 }

moveToMainMenu()
storageUsage()