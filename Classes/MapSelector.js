import GameMap from "./GameMap.js"
import mulberry32 from "../Utils/mulberry32.js"
import Graphics from "./Graphics.js";
import {default as defaultCONFIGS} from "../CONFIGS.js";
import LogPanel from "./LogPanel.js";

export default class MapSelector{
    constructor(seed, moveToGameFunction, customUserParams, skip){

        if(skip === true){
            document.getElementById('blackscreen').style.display = "grid"
        }else{
            document.getElementById('blackscreen').style.display = "none"
        }

        this.game = null
        this.seed = seed
        this.log = new LogPanel()
        this.flags = {
            generatingMap: true,
            skipSelection: skip
        }

        this.userParams = {
            settlementsQTY: customUserParams.settlementsQTY,
            waterQTY: customUserParams.waterQTY,
            mountainQTY: customUserParams.mountainQTY
        }

        this.currentState = "generating map"
        this.clock = null

        this.CONFIGS = {...defaultCONFIGS}

        this.moveToGameFunction = moveToGameFunction
        this.boundControls = this.controls.bind(this)
        document.addEventListener('keydown', this.boundControls)

        const randomNumberenerator = mulberry32(seed*9999)
        this.random = randomNumberenerator

        this.currentGenData = {

        }
        this.currentMap = new GameMap(null, this.log, this.CONFIGS.mapWidth,this.CONFIGS.mapHeight,this.random, seed, 
            {...this.CONFIGS,
                settlementsQTY: this.userParams.settlementsQTY,
                waterQTY: this.userParams.waterQTY,
                mountainQTY: this.userParams.mountainQTY
            })

        this.graphics = new Graphics(this.currentMap, this.CONFIGS)

    }

    getCurrentMapGenData(){
        return this.currentGenData
    }

    terminate(){
        document.removeEventListener('keydown', this.boundControls)
    }

    start(){
        this.clock = setInterval(()=>{
            this.update()
        },32)
    }

    stop(){
        clearInterval(this.clock)
        this.clock = null
        if(this.flags.generatingMap === true) this.flags.generatingMap = false
        if(this.flags.skipSelection === true){
            this.skipSelectionAndPlay()
        }
    }

    update(){
        if(this.currentMap.tiles.length > 0){
            this.graphics.update("displaying map", null, this.currentMap)
            if(this.currentMap.genAvailable === true){
                this.flags.generatingMap = false
                this.stop()
            }
        }
    }

    controls(e){
        if(this.flags.generatingMap === true) return
        if(e.key === " "){
            e.preventDefault()
            this.flags.generatingMap = true
            this.start()
            this.seed = Math.random()*9999999
            const randomNumberenerator = mulberry32(this.seed)
            this.random = randomNumberenerator

            this.currentMap = new GameMap(null,this.log,this.CONFIGS.mapWidth,this.CONFIGS.mapHeight,this.random, this.seed, 
                {...this.CONFIGS,
                    settlementsQTY: this.userParams.settlementsQTY,
                    waterQTY: this.userParams.waterQTY,
                    mountainQTY: this.userParams.mountainQTY
                })
        }

        else if(e.key === "1"){
            e.preventDefault()
            this.userParams.settlementsQTY = 6
            const elem = document.getElementById("qtyOfSettlements")
            elem.innerText = "Low"
            elem.style.color = "yellow"
        }
        else if(e.key === "2"){
            e.preventDefault()
            const elem = document.getElementById("qtyOfSettlements")
            this.userParams.settlementsQTY = 10
            elem.innerText = "Standard"
            elem.style.color = "white"
        }
        else if(e.key === "3"){
            e.preventDefault()
            const elem = document.getElementById("qtyOfSettlements")
            this.userParams.settlementsQTY = 16
            elem.innerText = "High"
            elem.style.color = "orange"
        }

        else if(e.key === "4"){
            e.preventDefault()
            const elem = document.getElementById("qtyOfWater")
            this.userParams.waterQTY = "low"
            elem.innerText = "Low"
            elem.style.color = "yellow"
        }
        else if(e.key === "5"){
            e.preventDefault()
            const elem = document.getElementById("qtyOfWater")
            this.userParams.waterQTY = "standard"
            elem.innerText = "Standard"
            elem.style.color = "white"
        }
        else if(e.key === "6"){
            e.preventDefault()
            const elem = document.getElementById("qtyOfWater")
            this.userParams.waterQTY = "high"
            elem.innerText = "High"
            elem.style.color = "orange"
        }

        else if(e.key === "7"){
            e.preventDefault()
            const elem = document.getElementById("qtyOfMountains")
            this.userParams.mountainQTY = "low"
            elem.innerText = "Low"
            elem.style.color = "yellow"
        }
        else if(e.key === "8"){
            e.preventDefault()
            const elem = document.getElementById("qtyOfMountains")
            this.userParams.mountainQTY = "standard"
            elem.innerText = "Standard"
            elem.style.color = "white"
        }
        else if(e.key === "9"){
            e.preventDefault()
            const elem = document.getElementById("qtyOfMountains")
            this.userParams.mountainQTY = "high"
            elem.innerText = "High"
            elem.style.color = "orange"
        }
        else if(e.key.toLocaleLowerCase() === "r"){
            e.preventDefault()
            const elem = document.getElementById("qtyOfSettlements")
            elem.innerText = "Standard"
            elem.style.color = "white"
            const elem2 = document.getElementById("qtyOfWater")
            elem2.innerText = "Standard"
            elem2.style.color = "white"
            const elem3 = document.getElementById("qtyOfMountains")
            elem3.innerText = "Standard"
            elem3.style.color = "white"
            
            this.userParams = {
                settlementsQTY: 10,
                waterQTY: "standard",
                mountainQTY: "standard"
            }
        }else if(e.key === "Enter"){
            e.preventDefault()
            this.terminate()
            localStorage.setItem('mapGenData', JSON.stringify(
                {
                    seed: this.seed,
                    settlementsQTY: this.userParams.settlementsQTY,
                    waterQTY: this.userParams.waterQTY,
                    mountainQTY: this.userParams.mountainQTY
                }
            ))
            this.moveToGameFunction(this.seed,this.currentMap)
            document.getElementById('blackscreen').style.display = "none"
        }
    }

    skipSelectionAndPlay(){
        this.terminate()
        this.moveToGameFunction(this.seed, this.currentMap)
        document.getElementById('blackscreen').style.display = "none"
    }
}