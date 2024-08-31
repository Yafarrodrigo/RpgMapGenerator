import GameMap from "./GameMap.js"
import mulberry32 from "../Utils/mulberry32.js"
import CONFIGS from "../CONFIGS.js";
import Graphics from "./Graphics.js";

export default class GameManager{
    constructor(seed){
        this.game = null
        this.flags = {
            generatingMap: false
        }
        this.currentState = "generating map"
        this.clock = null

        document.addEventListener('keypress', (e) => {
            if(this.flags.generatingMap === true) return
            else this.flags.generatingMap = true
            if(e.key === " "){
                this.start()
                const randomSeed = Math.random()*9999999
                const randomNumberenerator = mulberry32(randomSeed*9999)
                this.random = randomNumberenerator
                this.currentMap = new GameMap(null ,CONFIGS.mapWidth,CONFIGS.mapHeight,this.random, randomSeed)
            }
        })

        const randomNumberenerator = mulberry32(seed*9999)
        this.random = randomNumberenerator

        this.currentMap = new GameMap(null ,CONFIGS.mapWidth,CONFIGS.mapHeight,this.random, seed)

        this.graphics = new Graphics(this.currentMap)

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
            if(this.currentMap.settlements.length > 0){
                this.stop()
            }
        }
    }
}