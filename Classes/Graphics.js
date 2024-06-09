import CONFIGS from "../CONFIGS.js"
import TileColors from "../MapGenerator/TileColors.js"
import Viewport from "./Viewport.js"

export default class Graphics{
    constructor(map){
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d')

        this.canvas.height = window.innerHeight-15
        this.canvas.width = window.innerWidth-15
        
        this.viewTileSize = CONFIGS.viewTileSize
        
        this.viewport = new Viewport(this.canvas.width,this.canvas.height,map.rows,map.cols,this.viewTileSize)
    }

    drawViewport(map,DEBUG){

        const {offset} = this.viewport
        for(let x = this.viewport.startTile.x; x <= this.viewport.endTile.x; x++){
          for(let y = this.viewport.startTile.y; y <= this.viewport.endTile.y; y++){
            const tile = map.tiles[x][y]
            if(!tile) continue
            const finalX = tile.x+offset.x
            const finalY = tile.y+offset.y
            
            // normal display
            if(DEBUG.showNoise === "none"){
                this.draw(finalX,finalY,TileColors[tile.biome])
            }
            // debug altitude
            else if(DEBUG.showNoise === "altitude"){
                this.draw(finalX,finalY,`rgb(${tile.alt*255},${tile.alt*255},${tile.alt*255})`)
            }
            // debug temperature
            else if(DEBUG.showNoise === "temperature"){
                this.draw(finalX,finalY,`rgb(${tile.temp*255},${tile.temp*255},${tile.temp*255})`)
            }
            // debug moisture
            else if(DEBUG.showNoise === "moisture"){
                this.draw(finalX,finalY,`rgb(${tile.moist*255},${tile.moist*255},${tile.moist*255})`)
            }
          }
        }

        if(DEBUG.showSettlementSpawns){
            this.debugSettlementSpawns(map)
        }

        if(DEBUG.showRoads){
            this.drawPaths(map)
        }
        this.drawSettlements(map)

        
    }

    drawPaths(map){
        const {offset} = this.viewport
        map.paths.forEach( path => {
            path.forEach( tile => {
               this.draw(tile.x+offset.x,tile.y+offset.y,"red")
            })
        })
    }
    
    drawSettlements(map){
        map.settlements.forEach( tile => {
    
            const {offset} = this.viewport
    
            const finalX = tile.x+offset.x
            const finalY = tile.y+offset.y
    
            this.ctx.fillStyle = "blue"
            this.ctx.beginPath()
            this.ctx.arc(finalX*this.viewTileSize,finalY*this.viewTileSize,map.tileSize,0,Math.PI*2)
            this.ctx.fill()
        })
    }

    draw(x,y,color){
        this.ctx.fillStyle = color
        this.ctx.fillRect(x*this.viewTileSize,y*this.viewTileSize,this.viewTileSize,this.viewTileSize)
    }

    drawEmpty(x,y,color){
        this.ctx.strokeStyle = color
        this.ctx.strokeRect(x*this.viewTileSize,y*this.viewTileSize,this.viewTileSize,this.viewTileSize)
    }

    debugSettlementSpawns(map){
        const {offset} = this.viewport
    
        map.mapGen.possibleSettlementSpawns.forEach( spawn => {

            const finalX = spawn.x+offset.x
            const finalY = spawn.y+offset.y
            this.drawEmpty(finalX,finalY,"red")
        })
    }

    update(map, DEBUG){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.drawViewport(map, DEBUG)
    }
}