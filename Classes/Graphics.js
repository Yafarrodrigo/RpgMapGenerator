import CONFIGS from "../CONFIGS.js"
import Viewport from "./Viewport.js"

export default class Graphics{
    constructor(map){
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d', {alpha: false})

        this.canvas.height = document.getElementById('displayContainer').offsetHeight //CONFIGS.canvasHeight
        this.canvas.width = document.getElementById('displayContainer').offsetWidth //CONFIGS.canvasWidth
        
        this.viewTileSize = CONFIGS.viewTileSize
        
        this.viewport = new Viewport(this.canvas.width,this.canvas.height,map.rows,map.cols,this.viewTileSize)
    }

    drawASCIIViewport(map, player,scale){
        const {offset} = this.viewport
        for(let x = this.viewport.startTile.x; x <= this.viewport.endTile.x; x++){
            for(let y = this.viewport.startTile.y; y <= this.viewport.endTile.y; y++){
                const tile = map.tiles[x][y]
                if(!tile) continue
                const finalX = tile.x+offset.x
                const finalY = tile.y+offset.y

                if(x === player.x && y === player.y){
                    this.drawPlayer(player, scale)
                }else{
                    this.drawASCII(finalX,finalY,tile, scale)
                }
            }
        }
    }

    drawPlayer(player, scale){
        const {offset} = this.viewport
        this.ctx.font = `${player.character.size * scale}pt Monospace`
        this.ctx.fillStyle = player.character.color
        this.ctx.fillText(
            player.character.value,
            ((player.x + offset.x) * this.viewTileSize) + player.character.offset.x + CONFIGS.defaultCharactersOffset.x,
            ((player.y + offset.y) * this.viewTileSize) + player.character.offset.y + CONFIGS.defaultCharactersOffset.y
        )
    }

    drawASCII(x,y,tile, scale){
        
        this.ctx.font = `${tile.character.size * scale}pt Monospace`
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
            this.ctx.font = `15pt Monospace`
            this.ctx.font = `${15 * scale}pt Monospace`
            this.ctx.fillStyle = tile.resource.color
            this.ctx.fillText(tile.resource.character ,x*this.viewTileSize + CONFIGS.defaultCharactersOffset.x + 10, y*this.viewTileSize + CONFIGS.defaultCharactersOffset.y)
        }
    }

    update(player,map){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        this.drawASCIIViewport(map, player, 1.1)   
    }
}