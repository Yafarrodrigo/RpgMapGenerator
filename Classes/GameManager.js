import GameMap from "./GameMap.js"
import mulberry32 from "../Utils/mulberry32.js"
import Graphics from "./Graphics.js";
import {default as defaultCONFIGS} from "../CONFIGS.js";

export default class GameManager{
    constructor(seed){
        this.game = null
        this.flags = {
            generatingMap: true
        }
        this.userParams = {
            qtySettlements: 10
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

                this.currentMap = new GameMap(null ,CONFIGS.mapWidth,CONFIGS.mapHeight,this.random, randomSeed, 
                    {...CONFIGS,
                        qtySettlements: this.userParams.qtySettlements
                    })
            }

            else if(e.key === "1"){
                this.userParams.qtySettlements = 6
                document.getElementById("qtyOfSettlements").innerText = "Low"
            }
            else if(e.key === "2"){
                this.userParams.qtySettlements = 10
                document.getElementById("qtyOfSettlements").innerText = "Standard"
            }
            else if(e.key === "3"){
                this.userParams.qtySettlements = 16
                document.getElementById("qtyOfSettlements").innerText = "High"
            }
            console.log(this.userParams);
        })

        const randomNumberenerator = mulberry32(seed*9999)
        this.random = randomNumberenerator

        this.currentMap = new GameMap(null ,CONFIGS.mapWidth,CONFIGS.mapHeight,this.random, seed, CONFIGS)

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