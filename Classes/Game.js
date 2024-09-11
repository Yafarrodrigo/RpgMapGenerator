import Controls from "./Controls.js";
import Graphics from "./Graphics.js";
import mulberry32 from "../Utils/mulberry32.js"
import LogPanel from "./LogPanel.js";
import Player from "./Player.js";

export default class Game{
    constructor(seed, map, CONFIGS){
        this.log = new LogPanel()
        this.log.clear()

        // MMUUY TERMPORAL
        document.getElementById('sidebar').innerHTML = ""

        if(!seed){
            seed = Math.random()
        }
        const randomNumberenerator = mulberry32(seed*9999)
        this.random = randomNumberenerator
        this.map = map

        this.graphics = new Graphics(this.map, CONFIGS)
        this.controls = new Controls(this)

        this.player = null
        this.mode = "moving player" // "moving player", "moving camera", "menu"

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


    setupPlayer(newPlayerStats){
        const {x,y} = this.selectPlayerStartLocation()
        this.player = new Player(x,y)
        console.log("use these to create character", newPlayerStats);
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