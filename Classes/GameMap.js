import CONFIGS from "../CONFIGS.js";
import Tile from "./Tile.js";

export default class Map{
    constructor(width, height, randomGen, seed){
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
                        const {id,biome,temp,moist,alt,canSpawnSettlement} = data.map[x][y]
                        this.tiles[x][y] = new Tile({id,x,y,biome,temp,moist,alt,canSpawnSettlement})
                    }
                }
                this.seeds = data.seeds
                
                // update UI
                document.getElementById('map-seed-info').innerText = seed
                document.getElementById('alt-seed-info').innerText = data.seeds.altitude
                document.getElementById('moist-seed-info').innerText = data.seeds.moisture
                document.getElementById('temp-seed-info').innerText = data.seeds.temperature
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
                    this.tiles[x][y].changeTile("settlement")
                })

                document.getElementById("progressTxt").innerHTML = "Done"
                document.getElementById("progress").innerHTML = ""
                this.genAvailable = true
            }
            else if (data.txt === "progress") {
                document.getElementById("progress").innerText = data.progress +"%"
            }
        }
    }
}