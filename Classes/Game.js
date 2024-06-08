import Controls from "./Controls.js";
import Graphics from "./Graphics.js";
import mulberry32 from "../Utils/mulberry32.js"
import GameMap from "./GameMap.js"
import CONFIGS from "../CONFIGS.js";

export default class Game{
    constructor(seed){
        this.random = mulberry32(seed || CONFIGS.seed)
        this.map = new GameMap(CONFIGS.mapWidth,CONFIGS.mapHeight,this.random)
        this.graphics = new Graphics(this.map)
        this.controls = new Controls(this)

        this.cameraOffsetX = CONFIGS.camStartOffsetX
        this.cameraOffsetY = CONFIGS.camStartOffsetY

        this.clock = null
    }

    start(){
        this.clock = setInterval(()=>{
            this.update()
        },32)
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
    
        
        viewport.updateViewport(this.cameraOffsetX,this.cameraOffsetY)
        this.graphics.update(this.map)
    }
}