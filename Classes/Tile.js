import TILES from "../TILES.js"
import { Utils } from "../Utils/Utils.js"

export default class Tile{
    constructor({id,x,y,biome,temp,moist,alt,canSpawnSettlement}){
        this.id = id
        this.x = x
        this.y = y
        this.biome = biome
        this.temp = temp
        this.moist = moist
        this.alt = alt
        this.settlement = false
        this.canSpawnSettlement = canSpawnSettlement
        this.canWalk = TILES[biome].canWalk
        this.character = TILES[biome].character[Math.floor(Math.random()*TILES[biome].character.length)]
        this.color = TILES[biome].color

        // for A* algorithm
        this.neighbors = []
        this.f = 0
        this.g = 0
        this.h = 0
        this.previous = null

        let chosenResource = Math.random() > 0.75 ? Utils.weightedRandom(TILES[biome].resources) : null
        this.resource = chosenResource || null
    }

    changeTile(tileId){
        const newTile = TILES[tileId]
        this.biome = tileId
        this.color = TILES[tileId].color
        this.canWalk = newTile.canWalk
        if(newTile.biome === "road"){
            this.resource = null
            this.character = null
        }else if(newTile.biome === "settlement"){
            this.resource = null
            this.character = null
            this.settlement = true
        }else{
            this.resource = Math.random() > 0.75 ? Utils.weightedRandom(TILES[tileId].resources) : null
            this.character = TILES[tileId].character[Math.floor(Math.random()*TILES[tileId].character.length)]
        }
    }
}