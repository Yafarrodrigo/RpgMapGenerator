import Viewport from "./Viewport.js"

export default class Graphics{
    constructor(map, CONFIGS){
        this.canvas = document.querySelector('canvas')
        this.ctx = this.canvas.getContext('2d', {alpha: false})

        this.canvas.height = document.getElementById('displayContainer').offsetHeight
        this.canvas.width = document.getElementById('displayContainer').offsetWidth
        
        this.viewTileSize = CONFIGS.viewTileSize
        
        this.viewport = new Viewport(this.canvas.width,this.canvas.height,map.rows,map.cols,CONFIGS.viewTileSize,CONFIGS.tileScale,CONFIGS.defaultCharactersOffset)
        this.viewport2 = new Viewport(this.canvas.width,this.canvas.height,map.rows,map.cols,CONFIGS.cameraTileSize,CONFIGS.cameraTileScale,CONFIGS.cameraCharactersOffset)

        this.currentCameraPosition = {x:Math.floor(map.cols/2),y:Math.floor(map.rows/2)}
        this.viewport2.updateViewport(this.currentCameraPosition.x,this.currentCameraPosition.y)
    }

    drawASCIIViewport(viewport, map, player, mode){
        const {offset} = viewport
        for(let x = viewport.startTile.x; x <= viewport.endTile.x; x++){
            for(let y = viewport.startTile.y; y <= viewport.endTile.y; y++){
                
                const tile = map.tiles[x][y]
                if(!tile) continue
                const finalX = tile.x+offset.x
                const finalY = tile.y+offset.y

                if(tile.bg.show){
                    this.drawTileBg(viewport,finalX,finalY,tile)
                }

                this.drawASCII(viewport,finalX,finalY,tile)
            }
        }

        if(player){
            if(mode === "open map"){
                this.drawPlayer(viewport,player, true)
            }else{
                this.drawPlayer(viewport,player, false)
            }
        }
    }

    drawPlayer(viewport, player, inMap){
        const {offset, tileScale, charactersOffset, viewTileSize} = viewport

        if(inMap){
            this.ctx.font = `${player.character.size * tileScale * 3}pt Monospace`
            this.ctx.fillStyle = "magenta"
            this.ctx.fillText(
                player.character.inMap,
                ((player.x + offset.x) * viewTileSize) + player.character.offset.x - 25 + charactersOffset.x,
                ((player.y + offset.y) * viewTileSize) + player.character.offset.y + 12 + charactersOffset.y
            )
        }
        else{
            this.ctx.font = `${player.character.size * tileScale}pt Monospace`
            this.ctx.fillStyle = player.character.color
            this.ctx.fillText(
                player.character.value,
                ((player.x + offset.x) * viewTileSize) + player.character.offset.x + charactersOffset.x,
                ((player.y + offset.y) * viewTileSize) + player.character.offset.y + charactersOffset.y
            )
        }
    }

    drawASCII(viewport,x,y,tile){
        const {tileScale, charactersOffset, viewTileSize} = viewport
        this.ctx.font = `${tile.character.size * tileScale}pt Monospace`
        if(tile.resource === null){
            if(tile.isRoad){
                this.ctx.fillStyle = tile.bgColor
                this.ctx.fillRect(x*viewTileSize,y*viewTileSize,viewTileSize,viewTileSize)
            }
            this.ctx.fillStyle = tile.color
            this.ctx.fillText(
                tile.character.value,
                x*viewTileSize + tile.character.offset.x + charactersOffset.x,
                y*viewTileSize + tile.character.offset.y + charactersOffset.y
            )
        }
        else{
            this.ctx.font = `${15 * tileScale}pt Monospace`
            if(tile.resource.bgColor !== ""){
                this.ctx.fillStyle = tile.resource.bgColor
                this.ctx.fillRect(x*viewTileSize,y*viewTileSize,viewTileSize,viewTileSize)
            }
            this.ctx.fillStyle = tile.resource.color
            this.ctx.fillText(tile.resource.character ,x*viewTileSize + charactersOffset.x , y*viewTileSize + charactersOffset.y)
        }
    }

    drawTileBg(viewport,x,y,tile){
        const {tileScale, charactersOffset, viewTileSize} = viewport
        this.ctx.font = `${tile.character.size * tileScale}pt Monospace`
        if(tile.resource === null){
            this.ctx.fillStyle = tile.bg.color
            this.ctx.fillRect(x*viewTileSize,y*viewTileSize,viewTileSize,viewTileSize)
        }
        else{
            this.ctx.font = `${15 * tileScale}pt Monospace`
            this.ctx.fillStyle = tile.resource.color
            this.ctx.fillText(tile.resource.character ,x*viewTileSize + charactersOffset.x , y*viewTileSize + charactersOffset.y)
        }
    }

    update(mode,player,map){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
        if(mode === "open map"){
            this.drawASCIIViewport(this.viewport2, map, player, mode)
        }else if(mode === "moving player"){
            this.drawASCIIViewport(this.viewport, map, player, mode)
        }
        
    }
}