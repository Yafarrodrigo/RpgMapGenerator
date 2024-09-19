import Game from "./Classes/Game.js";
import Menu from "./Classes/PreGame/Menu.js";
import MapSelector from "./Classes/PreGame/MapSelector.js";
import gameUI from "./GameUI.js"
import CONFIGS from "./CONFIGS.js";
import EditableStatsScreen from "./Classes/PreGame/EditableStatsScreen.js"
import CharacterCreation from "./Classes/PreGame/CharacterCreation.js"
import NameSelector from "./Classes/PreGame/NameSelector.js";

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

export function moveToEditChar(stats){
    currentMenu.terminate()
    const editScreen = new EditableStatsScreen("Edit Stats", moveToNameSelector)
    editScreen.addOption("Strenght", "str", 1, 99, stats.str)
    editScreen.addOption("Agility", "agi", 1, 99, stats.agi)
    editScreen.addOption("Intelligence", "int", 1, 99, stats.int)
    editScreen.addOption("Constitution", "con", 1, 99, stats.con)
    editScreen.addOption("spacer", 0, 0, 0)
    editScreen.addOption("One Handed Weapons", "oneHandedWeapons", 1, 99, stats.oneHandedWeapons)
    editScreen.addOption("Ranged Weapons", "rangedWeapons", 1, 99, stats.rangedWeapons)
    editScreen.addOption("Two Handed Weapons", "twoHandedWeapons", 1, 99, stats.twoHandedWeapons)
    editScreen.addOption("spacer", 0, 0, 0)
    editScreen.addOption("Shields", "shields", 1, 99, stats.shields)
    editScreen.addOption("Quivers", "quivers", 1, 99, stats.quivers)
    editScreen.addOption("Books", "books", 1, 99, stats.books)
    editScreen.addOption("Orbs", "orbs", 1, 99, stats.orbs)
    editScreen.addOption("spacer", 0, 0, 0)
    editScreen.addOption("Arcane mastery", "arcaneMastery", 1, 99, stats.arcaneMastery)
    editScreen.addOption("Fire mastery", "fireMastery", 1, 99, stats.fireMastery)
    editScreen.addOption("Water mastery", "waterMastery", 1, 99, stats.waterMastery)
    editScreen.addOption("Air mastery", "airMastery", 1, 99, stats.airMastery)
    editScreen.addOption("Earth mastery", "earthMastery", 1, 99, stats.earthMastery)
    editScreen.addOption("spacer", 0, 0, 0)
    editScreen.addOption("Herbalism", "herbalism", 1, 99, stats.herbalism)
    editScreen.addOption("Alchemy", "alchemy", 1, 99, stats.alchemy)
    editScreen.addOption("spacer", 0, 0, 0)
    editScreen.addOption("Finish", 0, 0, 0)
    currentMenu = editScreen
}

function moveToCharacterCreation(){
    currentMenu.terminate()
    const charCreation = new CharacterCreation()
    currentMenu = charCreation.currentMenu
}

export function moveToNameSelector(stats){
    currentMenu.terminate()
    const nameSelector = new NameSelector("Whats your character's name?", stats)
    currentMenu = nameSelector
}

export function moveToMapSelector(newPlayerStats, newGame){

    let mapSelector
    const SEED = 1

    currentMenu.terminate()
    document.body.innerHTML = gameUI

    const savedMap = localStorage.getItem('gameMap')
    if(savedMap !== null && newGame !== true){

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
        mapSelector = new MapSelector(SEED, {
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

export function moveToGame(seed, mapData, newPlayerStats){
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
    console.log(game);
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