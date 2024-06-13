export default class Tile{
    constructor({x,y,biome,temp,moist,alt,canSpawnSettlement}){
        this.x = x
        this.y = y
        this.biome = biome
        this.temp = temp
        this.moist = moist
        this.alt = alt
        this.canSpawnSettlement = canSpawnSettlement
    }
}