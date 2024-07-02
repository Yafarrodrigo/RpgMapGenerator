import Controls from "./Controls.js";
import Graphics from "./Graphics.js";
import mulberry32 from "../Utils/mulberry32.js"
import GameMap from "./GameMap.js"
import CONFIGS from "../CONFIGS.js";

export default class Game{
    constructor(seed){
        if(!seed){
            seed = Math.random()
        }
        const randomNumberenerator = mulberry32(seed*9999)
        this.random =randomNumberenerator
        this.map = new GameMap(CONFIGS.mapWidth,CONFIGS.mapHeight,this.random, seed)
        this.graphics = new Graphics(this.map)
        this.controls = new Controls(this)

        this.cameraOffsetX = CONFIGS.camStartOffsetX
        this.cameraOffsetY = CONFIGS.camStartOffsetY

        this.DEBUG = {
            showNoise: "none", // "altitude", "moisture", "temperature"
            showRoads: false,
            showResources: false
        }

        this.setupDebug(seed)

        this.clock = null
    }

    start(){
        this.clock = setInterval(()=>{
            this.update()
        },32)
    }

    setupDebug(seed){
        document.getElementById('new-map-button').addEventListener('click', (e) => {
            if(!this.map.genAvailable) return
            this.map.genAvailable = false

            e.preventDefault();
            const newSeed = Math.random()*9999
            const randomNumberenerator = mulberry32(newSeed*9999)
            this.random = randomNumberenerator
            this.map = new GameMap(CONFIGS.mapWidth,CONFIGS.mapHeight,this.random, newSeed)
        })

        this.updateSeedsDisplay(seed)
        document.querySelectorAll("input[name='show-noise']").forEach( option => {
            option.addEventListener("click", (e) => {
                this.DEBUG.showNoise = e.target.value
            })
        })
        document.getElementById('debug-resources').addEventListener("click", (e) => {
            this.DEBUG.showResources = e.target.checked
        })
        document.getElementById('debug-roads').addEventListener("click", (e) => {
            this.DEBUG.showRoads = e.target.checked
        })
    }

    updateSeedsDisplay(seed){
        document.getElementById('map-seed-info').innerText = seed
        document.getElementById('alt-seed-info').innerText = this.map.seeds.altitude
        document.getElementById('moist-seed-info').innerText = this.map.seeds.moisture
        document.getElementById('temp-seed-info').innerText = this.map.seeds.temperature
    }

    update(){
        const {UP,DOWN,LEFT,RIGHT} = this.controls
        const { viewport } = this.graphics
        if(LEFT){
            if(viewport.velocity.x - viewport.acc >= -viewport.maxVelocity){
                viewport.velocity.x -= viewport.acc
            }
        }
        else if(RIGHT){
            if(viewport.velocity.x + viewport.acc <= viewport.maxVelocity){
                viewport.velocity.x += viewport.acc
            }
        }
        else{
            if(viewport.velocity.x > 0) viewport.velocity.x -= viewport.acc
            else if(viewport.velocity.x < 0) viewport.velocity.x += viewport.acc
        }
        if(UP){
            if(viewport.velocity.y - viewport.acc >= -viewport.maxVelocity){
                viewport.velocity.y -= viewport.acc
            }
        }
        else if(DOWN){
            if(viewport.velocity.y + viewport.acc <= viewport.maxVelocity){
                viewport.velocity.y += viewport.acc
            }
        }
        else{
            if(viewport.velocity.y > 0) viewport.velocity.y -= viewport.acc
            else if(viewport.velocity.y < 0) viewport.velocity.y += viewport.acc
        }
    
        this.cameraOffsetX += viewport.velocity.x
        this.cameraOffsetY += viewport.velocity.y
    
        
        if(this.map.tiles.length > 0){
            viewport.updateViewport(this.cameraOffsetX,this.cameraOffsetY)
            this.graphics.update(this.map,this.DEBUG)
        }
    }
}