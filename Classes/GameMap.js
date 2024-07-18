import CONFIGS from "../CONFIGS.js";
import TILES from "../TILES.js";
import Tile from "./Tile.js";

export default class Map{
    constructor(game,width, height, randomGen, seed){
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
        this.mapGenWorker.postMessage({txt:"start", seed})
        this.mapGenWorker.onmessage = ({data}) => {
            if(data.txt === "finished terrain"){
                this.tiles = new Array(this.cols).fill(null).map( () => new Array(this.rows).fill(null))
                for(let x = 0; x < this.cols; x++){
                    for(let y = 0; y < this.rows; y++){
                        const {id,tileId,temp,moist,alt} = data.map[x][y]
                        this.tiles[x][y] = new Tile({id,x,y,tileId,temp,moist,alt})
                    }
                }
                this.seeds = data.seeds
                
                // update UI
                document.getElementById("progress").innerHTML = "0%"
                document.getElementById("progressTxt").innerHTML = "Connecting Settlements"

                this.mapGenWorker.postMessage({txt:"add settlements"})
            }
            else if(data.txt === "finished settlements"){
                this.settlements = data.settlements.filter( set => set.isConnected)
                document.getElementById("progress").innerHTML = "100%"

                // change tiles to roads
                this.paths = data.roads
                this.paths.forEach( path => path.forEach( ({x,y}) => {
                    this.tiles[x][y].changeTile("road")
                }))

                // change tiles to settlements
                this.settlements.forEach( ({x,y}) => {
                    this.placeSettlementOnMap(x,y,this.tiles)
                })

                document.getElementById("progressTxt").innerHTML = "Done"
                document.getElementById("progress").innerHTML = ""
                this.genAvailable = true
                game.setupPlayer()
            }
            else if (data.txt === "progress") {
                document.getElementById("progress").innerText = data.progress +"%"
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