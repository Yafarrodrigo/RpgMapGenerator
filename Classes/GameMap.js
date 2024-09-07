import TILES from "../TILES.js";
import Tile from "./Tile.js";

export default class GameMap{
    constructor(game,logPanel, width, height, randomGen, seed, CONFIGS){
        this.width = width
        this.height = height
        this.tileSize = CONFIGS.mapTileSize
        this.cols = Math.floor(this.width / this.tileSize)
        this.rows = Math.floor(this.height / this.tileSize)
        this.random = randomGen
        this.tiles = []
        this.settlements = []
        this.paths = []
        this.seeds = {
            temperature: 0,
            moisture: 0,
            altitude: 0,
        }
        this.genAvailable = false
        
        this.mapGenWorker = new Worker("./Workers/MapGenWorker.js", {type: "module"})
        this.mapGenWorker.postMessage({txt:"start", seed,CONFIGS})

        let currentProgressTxt = "Generating Terrain... "
        logPanel.info(currentProgressTxt + "0%")
        this.mapGenWorker.onmessage = ({data}) => {
            if(data.txt === "finished terrain"){
                this.tiles = new Array(this.cols).fill(null).map( () => new Array(this.rows).fill(null))
                for(let x = 0; x < this.cols; x++){
                    for(let y = 0; y < this.rows; y++){
                        const {id,tileId,temp,moist,alt} = data.map[x][y]
                        const randomTileResource = this.random()
                        this.tiles[x][y] = new Tile({id,x,y,tileId,temp,moist,alt,randomTileResource})
                    }
                }
                this.seeds = data.seeds

                logPanel.changeLastMsg(currentProgressTxt + "100%")
                logPanel.info(currentProgressTxt + "100%")
                currentProgressTxt = "Generating Settlements... "

                this.mapGenWorker.postMessage({txt:"add settlements"})
            }
            else if(data.txt === "finished settlements"){
                this.settlements = data.settlements.filter( set => set.isConnected)
                
                // change tiles to roads
                this.paths = data.roads
                this.paths.forEach( path => path.forEach( ({x,y}) => {
                    this.tiles[x][y].changeTile("road")
                }))

                this.settlements.forEach( ({x,y}) => {
                    this.placeSettlementOnMap(x,y,this.tiles)
                })

                this.genAvailable = true
                if(game !== null){
                    game.setupPlayer()
                }
                this.mapGenWorker.terminate()
                logPanel.changeLastMsg(currentProgressTxt + "100%")
                logPanel.info("Map ready to play!",true)
            }
            else if (data.txt === "progress") {
                logPanel.changeLastMsg(currentProgressTxt + data.progress + "%")
            }

        }

    }

    getTileAt(x,y){
        return this.tiles[x][y]
    }

    getRandomTile(){
        const randomX = Math.floor(Math.random()*this.cols)
        const randomY = Math.floor(Math.random()*this.rows)
        return this.tiles[randomX][randomY];
    }

    placeSettlementOnMap(x,y,map){
        for(let i = -2; i <= 2; i++){
            for(let j = -2; j <= 2; j++){
                if(x+i >= 0 && x+i <= this.cols-1 && y+j >= 0 && y+j <= this.rows-1){
                    map[x+i][y+j].changeTile("settlement")
                    const {tileMap} = TILES["settlement"]
                    const {offset,size} = TILES["settlement"].character[0]
                    map[x+i][y+j].character = {value: tileMap[j+2][i+2], offset, size}
                }
            }
        }
    }
}