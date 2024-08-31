import Controls from "./Controls.js";
import Graphics from "./Graphics.js";
import mulberry32 from "../Utils/mulberry32.js"
import GameMap from "./GameMap.js"
import CONFIGS from "../CONFIGS.js";

export default class Game{
    constructor(seed, map){
        if(!seed){
            seed = Math.random()
        }
        const randomNumberenerator = mulberry32(seed*9999)
        this.random = randomNumberenerator
        if(map){
            this.map = map
        }else{
            this.map = new GameMap(this,CONFIGS.mapWidth,CONFIGS.mapHeight,this.random, seed)
        }
        this.graphics = new Graphics(this.map)
        this.controls = new Controls(this)

        this.player = null
        this.mode = "moving camera" // "moving player", "moving camera", "menu"

        this.clock = null
    }

    start(){
        this.clock = setInterval(()=>{
            this.update()
        },32)
    }

    stop(){
        clearInterval(this.clock)
        this.clock = null
    }


    setupPlayer(){
        const {x,y} = this.selectPlayerStartLocation()
        this.player = {x,y, character:{value:"@", color: "magenta",offset: {x:0,y:0},size: 30}}
    }

    selectPlayerStartLocation(){
        let current = this.map.getRandomTile()
        while( current.canPlayerSpawn === false ){
            current = this.map.getRandomTile()
        }
        return {x:current.x,y:current.y}
    }

    movePlayer(dir){
        if(dir === "up"){
            if(this.player.y - 1 < 0) return
            const topTile = this.map.getTileAt(this.player.x,this.player.y - 1)
            if(topTile.canWalk){
                this.player.y -= 1
            }
        }
        else if(dir === "down"){
            if(this.player.y + 1 >= this.map.rows ) return
            const bottomTile = this.map.getTileAt(this.player.x,this.player.y + 1)
            if(bottomTile.canWalk){
                this.player.y += 1
            }
        }
        else if(dir === "left"){
            if(this.player.x - 1 < 0 ) return
            const leftTile = this.map.getTileAt(this.player.x - 1,this.player.y)
            if(leftTile.canWalk){
                this.player.x -= 1
            }
        }
        else if(dir === "right"){
            if(this.player.x + 1 >= this.map.cols ) return
            const rightTile = this.map.getTileAt(this.player.x + 1,this.player.y)
            if(rightTile.canWalk){
                this.player.x += 1
            }
        }
    }

    update(){
        const { viewport } = this.graphics
        if(this.map.tiles.length > 0 && this.player){
            if(this.player) viewport.updateViewport(this.player.x,this.player.y)
            this.graphics.update(this.mode, this.player, this.map)
            this.stop()
        }
    }
}