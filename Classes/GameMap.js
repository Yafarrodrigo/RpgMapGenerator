import CONFIGS from "../CONFIGS.js";
import MapGenerator from "../MapGenerator/MapGenerator.js";

export default class Map{
    constructor(width, height, randomGen){
        this.width = width
        this.height = height
        this.tileSize = CONFIGS.mapTileSize
        this.cols = Math.floor(this.width / this.tileSize)
        this.rows = Math.floor(this.height / this.tileSize)
        this.random = randomGen
        this.mapGen = new MapGenerator(width, height, randomGen)
        this.tiles = this.mapGen.generateMap()
        this.settlements = this.mapGen.placeRandomSettlements(CONFIGS.qtySettlements, this.tiles)
        this.paths = this.mapGen.connectSettlements(this.settlements,this.tiles)
        
        //remove settlements without roads
        this.settlements = this.settlements.filter( s => s.isConnected)
    }
}


// MEJORAR ROADS ENTRE SETTLEMENTS !