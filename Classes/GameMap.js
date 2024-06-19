import CONFIGS from "../CONFIGS.js";
import MapGenerator from "../MapGenerator/MapGenerator.js";

export default class Map{
    constructor(width, height, randomGen, seed){
        this.width = width
        this.height = height
        this.tileSize = CONFIGS.mapTileSize
        this.cols = Math.floor(this.width / this.tileSize)
        this.rows = Math.floor(this.height / this.tileSize)
        this.random = randomGen
        this.mapGen = new MapGenerator(width, height, randomGen, seed)
        this.tiles = []
        this.settlements = []
        this.paths = []

        this.mapGen.mapGenWorker = new Worker("../Workers/MapGenWorker.js", {type: "module"})
        this.mapGen.mapGenWorker.postMessage({txt:"start", seed})
        this.mapGen.mapGenWorker.onmessage = ({data}) => {
            if(data.txt === "finished terrain"){
                this.tiles = data.map
                this.mapGen.seeds = data.seeds
                
                // update UI
                document.getElementById('map-seed-info').innerText = seed
                document.getElementById('alt-seed-info').innerText = data.seeds.altitude
                document.getElementById('moist-seed-info').innerText = data.seeds.moisture
                document.getElementById('temp-seed-info').innerText = data.seeds.temperature
                document.getElementById("progress").innerHTML = "0%"
                document.getElementById("progressTxt").innerHTML = "Generating Settlements"

                this.mapGen.mapGenWorker.postMessage({txt:"add settlements"})
            }
            else if(data.txt === "finished settlements"){
                this.tiles = data.map
                this.settlements = data.settlements
                document.getElementById("progress").innerHTML = "100%"
                
                // add roads
                this.paths = data.roads
                document.getElementById("progressTxt").innerHTML = "Done"
                document.getElementById("progress").innerHTML = ""
                this.mapGen.genAvailable = true
            }
            else if (data.txt === "progress") {
                document.getElementById("progress").innerHTML = data.progress +"%"
            }
        }
    }
}