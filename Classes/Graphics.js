import CONFIGS from "../CONFIGS.js"
import Viewport from "./Viewport.js"

export default class Graphics{
    constructor(map){
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d', {alpha: false})

        this.canvas.height = CONFIGS.canvasWidth
        this.canvas.width = CONFIGS.canvasHeight
        
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

    drawASCII(x,y,tile){
        
        this.ctx.font = `${tile.character.size}pt Helvetica`
        if(tile.resource === null){
            this.ctx.fillStyle = tile.color
            if(tile.isRoad){
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

    update(map){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.drawASCIIViewport(map)
    }
}