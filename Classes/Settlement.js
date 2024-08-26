export default class Settlement{
    constructor(x,y){
        this.id = `tile-${x}-${y}`
        this.x = x
        this.y = y
        this.isConnected = false
    }
}