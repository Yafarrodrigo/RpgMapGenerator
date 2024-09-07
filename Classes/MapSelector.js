import GameMap from "./GameMap.js"
import mulberry32 from "../Utils/mulberry32.js"
import Graphics from "./Graphics.js";
import {default as defaultCONFIGS} from "../CONFIGS.js";
import LogPanel from "./LogPanel.js";

export default class MapSelector{
    constructor(seed){
        this.game = null
        this.log = new LogPanel()
        this.flags = {
            generatingMap: true
        }
        this.userParams = {
            settlementsQTY: 10,
            waterQTY: "standard",
            mountainQTY: "standard"
        }
        this.currentState = "generating map"
        this.clock = null

        const CONFIGS = {...defaultCONFIGS}

        document.addEventListener('keypress', (e) => {
            e.preventDefault()
            if(this.flags.generatingMap === true) return
            
            if(e.key === " "){
                this.flags.generatingMap = true
                this.start()
                const randomSeed = Math.random()*9999999
                const randomNumberenerator = mulberry32(randomSeed)
                this.random = randomNumberenerator

                this.currentMap = new GameMap(null,this.log,CONFIGS.mapWidth,CONFIGS.mapHeight,this.random, randomSeed, 
                    {...CONFIGS,
                        settlementsQTY: this.userParams.settlementsQTY,
                        waterQTY: this.userParams.waterQTY,
                        mountainQTY: this.userParams.mountainQTY
                    })
            }

            else if(e.key === "1"){
                this.userParams.settlementsQTY = 6
                const elem = document.getElementById("qtyOfSettlements")
                elem.innerText = "Low"
                elem.style.color = "yellow"
            }
            else if(e.key === "2"){
                const elem = document.getElementById("qtyOfSettlements")
                this.userParams.settlementsQTY = 10
                elem.innerText = "Standard"
                elem.style.color = "white"
            }
            else if(e.key === "3"){
                const elem = document.getElementById("qtyOfSettlements")
                this.userParams.settlementsQTY = 16
                elem.innerText = "High"
                elem.style.color = "orange"
            }

            else if(e.key === "4"){
                const elem = document.getElementById("qtyOfWater")
                this.userParams.waterQTY = "low"
                elem.innerText = "Low"
                elem.style.color = "yellow"
            }
            else if(e.key === "5"){
                const elem = document.getElementById("qtyOfWater")
                this.userParams.waterQTY = "standard"
                elem.innerText = "Standard"
                elem.style.color = "white"
            }
            else if(e.key === "6"){
                const elem = document.getElementById("qtyOfWater")
                this.userParams.waterQTY = "high"
                elem.innerText = "High"
                elem.style.color = "orange"
            }

            else if(e.key === "7"){
                const elem = document.getElementById("qtyOfMountains")
                this.userParams.mountainQTY = "low"
                elem.innerText = "Low"
                elem.style.color = "yellow"
            }
            else if(e.key === "8"){
                const elem = document.getElementById("qtyOfMountains")
                this.userParams.mountainQTY = "standard"
                elem.innerText = "Standard"
                elem.style.color = "white"
            }
            else if(e.key === "9"){
                const elem = document.getElementById("qtyOfMountains")
                this.userParams.mountainQTY = "high"
                elem.innerText = "High"
                elem.style.color = "orange"
            }
            else if(e.key.toLocaleLowerCase() === "r"){
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
            }
        })

        const randomNumberenerator = mulberry32(seed*9999)
        this.random = randomNumberenerator

        this.currentMap = new GameMap(null, this.log, CONFIGS.mapWidth,CONFIGS.mapHeight,this.random, seed, CONFIGS)

        this.graphics = new Graphics(this.currentMap, CONFIGS)

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
}