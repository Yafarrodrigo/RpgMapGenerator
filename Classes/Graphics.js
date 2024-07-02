import CONFIGS from "../CONFIGS.js"
import Viewport from "./Viewport.js"

export default class Graphics{
    constructor(map){
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d', {alpha: false})

        this.canvas.height = CONFIGS.canvasWidth//window.innerHeight-15
        this.canvas.width = CONFIGS.canvasHeight//window.innerWidth-15
        
        this.viewTileSize = CONFIGS.viewTileSize
        
        this.viewport = new Viewport(this.canvas.width,this.canvas.height,map.rows,map.cols,this.viewTileSize)
    }

    drawASCIIViewport(map){
        const {offset} = this.viewport
        for(let x = this.viewport.startTile.x; x <= this.viewport.endTile.x; x++){
            for(let y = this.viewport.startTile.y; y <= this.viewport.endTile.y; y++){
                const tile = map.tiles[x][y]
                if(!tile) continue
                const finalX = tile.x+offset.x
                const finalY = tile.y+offset.y

                this.drawASCII(finalX,finalY,tile)
            }
        }
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
                if(DEBUG.showResources){
                    if(tile.resource !== null){
                        if(tile.resource === "trees"){
                            this.write(finalX,finalY,"t","brown")
                        }
                        else if(tile.resource === "bushes"){
                            this.write(finalX,finalY,"b", "lightgreen")
                        }
                        else if(tile.resource === "rocks"){
                            this.write(finalX,finalY,"r","gray")
                        }
                        else if(tile.resource === "pebbles"){
                            this.write(finalX,finalY,"p","gray")
                        }
                    }
                }
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
    
            if(tile.isConnected){
                this.ctx.fillStyle = "blue"
            }else{
                this.ctx.fillStyle = "yellow"
            }
            
            this.ctx.beginPath()
            this.ctx.arc(finalX*this.viewTileSize,finalY*this.viewTileSize,map.tileSize,0,Math.PI*2)
            this.ctx.fill()
        })
    }

    draw(x,y,color){
        this.ctx.fillStyle = color
        this.ctx.fillRect(x*this.viewTileSize,y*this.viewTileSize,this.viewTileSize,this.viewTileSize)
    }

    drawASCII(x,y,tile){
        // for debug only
        //this.ctx.strokeStyle = "pink"
        //this.ctx.strokeRect(x*this.viewTileSize,y*this.viewTileSize,this.viewTileSize,this.viewTileSize)

        this.ctx.font = `${tile.character.size}pt Helvetica`
        if(tile.resource === null){
            this.ctx.fillStyle = tile.color
            if(tile.biome === "road" || tile.biome === "settlement"){
                this.ctx.fillRect(x*this.viewTileSize,y*this.viewTileSize,this.viewTileSize,this.viewTileSize)
            }else{
                this.ctx.fillText(
                    tile.character.value,
                    x*this.viewTileSize + tile.character.offset.x + CONFIGS.defaultCharactersOffset.x,
                    y*this.viewTileSize + tile.character.offset.y + CONFIGS.defaultCharactersOffset.y
                )
            }
        }
        else{
            this.ctx.font = `15pt Helvetica`
            this.ctx.fillStyle = tile.resource.color
            this.ctx.fillText(tile.resource.character ,x*this.viewTileSize + CONFIGS.defaultCharactersOffset.x, y*this.viewTileSize + CONFIGS.defaultCharactersOffset.y)
        }
    }

    update(map, DEBUG){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.drawASCIIViewport(map, DEBUG)
    }
}