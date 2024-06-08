export default class Viewport{

    constructor(w,h,rows,cols,tileSize){
        this.w = w
        this.h = h
        this.rows = rows
        this.cols = cols
        this.screen = {x:w,y:h}
        this.startTile = {x:0,y:0}
        this.endTile = {x:0,y:0}
        this.offset = {x:0,y:0}
        this.viewTileSize = tileSize
        this.acc = 1
        this.velocity = {x:0,y:0}
        this.maxVelocity = 3
    }

    updateViewport(targetX,targetY){
          
        this.screen.x = this.w
        this.screen.y = this.h
    
        this.offset.x = Math.floor(((this.screen.x/2/this.viewTileSize) - targetX))
        this.offset.y = Math.floor(((this.screen.y/2/this.viewTileSize) - targetY))
    
        const tile = {
          x: targetX,
          y: targetY
        }
    
        this.startTile.x = tile.x - 1 - Math.ceil((this.screen.x/2) / this.viewTileSize)
        this.startTile.y = tile.y - 1 - Math.ceil((this.screen.y/2) / this.viewTileSize)  
    
        if(this.startTile.x < 0) this.startTile.x = 0
        if(this.startTile.y < 0) this.startTile.y = 0
    
        this.endTile.x = tile.x + 1 + Math.ceil((this.screen.x/2) / this.viewTileSize)
        this.endTile.y = tile.y + 1 + Math.ceil((this.screen.y/2) / this.viewTileSize)
    
        if(this.endTile.x >= this.rows) this.endTile.x = this.rows -1
        if(this.endTile.y >= this.cols) this.endTile.y = this.cols -1
      }
}