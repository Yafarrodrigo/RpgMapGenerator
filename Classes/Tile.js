import TILES from "../TILES.js"
import { Utils } from "../Utils/Utils.js"

export default class Tile{
    constructor({id, x, y, tileId, temp, moist, alt}){
        // permanent
        this.id = id
        this.tileId = tileId
        this.x = x
        this.y = y
        this.temp = temp
        this.moist = moist
        this.alt = alt

        // variable
        this.biome = TILES[tileId].biome
        this.settlement = false
        this.canSpawnSettlement = TILES[tileId].canSpawnSettlement
        this.canWalk = TILES[tileId].canWalk
        this.canHaveRoad = TILES[tileId].canHaveRoad
        this.character = {...TILES[tileId].character[Math.floor(Math.random()*TILES[tileId].character.length)]}
        this.color = TILES[tileId].color

        this.resource = this.getRandomResource(tileId)
    }

    changeTile(tileId){
        const newTile = TILES[tileId]
        this.biome = newTile.biome
        this.color = newTile.color
        this.canWalk = newTile.canWalk
        this.canHaveRoad = newTile.canHaveRoad
        if(newTile.biome === "road"){
            this.resource = null
            this.settlement = false
        }else if(newTile.biome === "settlement"){
            this.resource = null
            this.character = null
            this.settlement = true
        }else{
            this.resource = this.getRandomResource(tileId)
            this.character = newTile.character[Math.floor(Math.random()*newTile.character.length)]
        }
    }

    getRandomResource(tileId){
        return Math.random() > 0.75 ? Utils.weightedRandom(TILES[tileId].resources) : null
    }
}