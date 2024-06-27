import { Utils } from "../Utils/Utils.js"
import FindPath from "../Utils/AStar.js"
import CONFIGS from "../CONFIGS.js"
import Tile from "../Classes/Tile.js"
import Settlement from "../Classes/Settlement.js"

export default class MapGenerator{
    constructor(width, height, randomGen, seed){
        this.sizeX = width
        this.sizeY = height
        this.random = randomGen

        this.tileSize = CONFIGS.mapTileSize

        this.seeds = {
            temperature: 0,
            moisture: 0,
            altitude: 0,
        }

        this.cols = Math.floor(this.sizeX / this.tileSize)
        this.rows = Math.floor(this.sizeY / this.tileSize)
    
        this.settlements = []
        
        this.genAvailable = false
    }
    
    generateMap(){

        const terrainMap = new Array(this.cols).fill(null).map( () => new Array(this.rows).fill(null))
        const { temperature:t, moisture:m, altitude:a } = CONFIGS.perlin
        const mapData = {}

        const tempNoiseMap = this.generateNoiseMap(t.scale, t.frequency, t.octaves, t.persistance, t.lacunarity)
        mapData.temperature = tempNoiseMap.map
        this.seeds.temperature = tempNoiseMap.seed

        const moistNoiseMap = this.generateNoiseMap(m.scale, m.frequency, m.octaves, m.persistance, m.lacunarity)
        mapData.moisture = moistNoiseMap.map
        this.seeds.moisture = moistNoiseMap.seed

        const altNoiseMap = this.generateNoiseMap(a.scale, a.frequency, a.octaves, a.persistance, a.lacunarity)
        mapData.altitude = altNoiseMap.map
        this.seeds.altitude = altNoiseMap.seed
        
        for(let x = 0; x < this.cols; x++){
            for(let y = 0; y < this.rows; y++){
                const temp = mapData.temperature[x][y]
                const alt = mapData.altitude[x][y]
                const moist = mapData.moisture[x][y]

                // my abajo -> agua
                if(Utils.between(alt, 0, 0.3)){
                    terrainMap[x][y] = new Tile({x,y,biome:"deepWater", temp,moist,alt,canSpawnSettlement:false})
                }
                else if(Utils.between(alt, 0.3, 0.35)){
                    terrainMap[x][y] = new Tile({x,y,biome:"water", temp,moist,alt,canSpawnSettlement:false})
                }
                // entre el agua y lo demas -> playa
                else if(Utils.between(alt, 0.35, 0.4)){
                    terrainMap[x][y] = new Tile({x,y,biome:"beach", temp,moist,alt,canSpawnSettlement:true})
                    this.possibleSettlementSpawns.push({x,y})
                }
                // lo demas, pero no muuuy alto -> diferentes biomas
                else if(Utils.between(alt, 0.4, 0.7)){
                    // plains
                    if(moist <= 0.8 && Utils.between(temp,0.1,0.5) || moist <= 0.7 && Utils.between(temp,0.5,0.7)){
                        terrainMap[x][y] = new Tile({x,y,biome:"plains", temp,moist,alt,canSpawnSettlement:true})
                        this.possibleSettlementSpawns.push({x,y})
                    // forest
                    }else if(Utils.between(moist, 0.8,0.9) && Utils.between(temp,0.1,0.5)){
                        terrainMap[x][y] = new Tile({x,y,biome:"forest", temp,moist,alt,canSpawnSettlement:true})
                        this.possibleSettlementSpawns.push({x,y})
                    }
                    // jungle
                    else if (Utils.between(moist,0.7,0.9) && Utils.between(temp,0.5,1)){
                        terrainMap[x][y] = new Tile({x,y,biome:"jungle", temp,moist,alt,canSpawnSettlement:true})
                        this.possibleSettlementSpawns.push({x,y})
                    }
                    // desert
                    else if ((moist <= 0.7 && temp >= 0.7)){
                        terrainMap[x][y] = new Tile({x,y,biome:"desert", temp,moist,alt,canSpawnSettlement:true})
                        this.possibleSettlementSpawns.push({x,y})
                    }
                    // oasis
                    else if((moist >= 0.9 && temp >= 0.7)){
                        terrainMap[x][y] = new Tile({x,y,biome:"oasis", temp,moist,alt,canSpawnSettlement:false})
                    }
                    // water (lakes,rivers)
                    else if (moist >= 0.9 && temp >= 0.1){
                        terrainMap[x][y] = new Tile({x,y,biome:"lake", temp,moist,alt,canSpawnSettlement:false})
                    }else{
                        terrainMap[x][y] = new Tile({x,y,biome:"????", temp,moist,alt,canSpawnSettlement:false})
                    }
                }
                // arriba de todo montañas y nieve
                else{
                    if(alt > 0.925 && temp < 0.2) terrainMap[x][y] = new Tile({x,y,biome:"snow", temp,moist,alt,canSpawnSettlement:false})
                    else if(alt > 0.9) terrainMap[x][y] = new Tile({x,y,biome:"highMountain", temp,moist,alt,canSpawnSettlement:false})
                    else if(alt > 0.8) terrainMap[x][y] = new Tile({x,y,biome:"midMountain", temp,moist,alt,canSpawnSettlement:false})
                    else if(alt > 0.7){
                        terrainMap[x][y] = new Tile({x,y,biome:"lowMountain", temp,moist,alt,canSpawnSettlement:true})
                        this.possibleSettlementSpawns.push({x,y})
                    }
                    else terrainMap[x][y] = new Tile({x,y,biome:"????", temp,moist,alt,canSpawnSettlement:false})
                }
            }
        }
        
        return terrainMap
    }

    generateNoiseMap(scale, freq, octaves, persistance, lacunarity){
        const rndSeed = this.random()
        this.noise.seed(rndSeed)
        const map = new Array(this.cols).fill(null).map( () => new Array(this.rows).fill(null))
        let minNoiseHeight = 0
        let maxNoiseHeight = 0
        for(let x = 0; x < this.cols; x++){
            for(let y = 0; y < this.rows; y++){
    
                let noiseHeight = 0
                let frequency = freq
                let amplitude = 1
    
                for(let i = 0; i < octaves; i++){
                    const sampleX = x / scale * frequency
                    const sampleY = y / scale * frequency
    
                    const value = Math.abs(this.noise.perlin2(sampleX,sampleY) + 0.5) // el +0.5 es dudoso
                    noiseHeight += value * amplitude
    
                    amplitude *= persistance
                    frequency *= lacunarity
                }
    
                if(noiseHeight > maxNoiseHeight) maxNoiseHeight = noiseHeight
                else if(noiseHeight < minNoiseHeight) minNoiseHeight = noiseHeight
    
                map[x][y] = noiseHeight
            }
        }

        for(let x = 0; x < this.cols; x++){
            for(let y = 0; y < this.rows; y++){
                map[x][y] = Utils.invlerp(minNoiseHeight,maxNoiseHeight,map[x][y])
            }
        }
        
        return {map,seed:rndSeed}
    }

    // sketchy pero funciona
    placeRandomSettlements(qty, MAP){
        let randomIndex
        let x,y
        let distances = []
        let safeCounter = 0
        let idCounter = 0
        let settlements = []
        // first settlement
        randomIndex = Math.floor(this.random()*this.possibleSettlementSpawns.length)
        x = this.possibleSettlementSpawns[randomIndex].x
        y = this.possibleSettlementSpawns[randomIndex].y
        MAP[x][y].settlement = true
        MAP[x][y].settlementId = idCounter
        idCounter++
        settlements.push(new Settlement(MAP[x][y].x,MAP[x][y].y, MAP))

        for(let i = 0; i < qty-1; i++){
            let found = false
            while(found === false && safeCounter <= 1000){
                distances = []
                randomIndex = Math.floor(this.random()*this.possibleSettlementSpawns.length)
                x = this.possibleSettlementSpawns[randomIndex].x
                y = this.possibleSettlementSpawns[randomIndex].y
                
                for(let j = 0; j < settlements.length; j++){
                    let xx = settlements[j].x
                    let yy = settlements[j].y
                    distances.push(Utils.distance(x,y,xx,yy))
                }
                if(distances.filter( dist => dist < 50).length == 0) found = true
                safeCounter++
            }
            if(found === true){
                MAP[x][y].settlement = true
                MAP[x][y].settlementId = idCounter
                idCounter++
                settlements.push(new Settlement(MAP[x][y].x,MAP[x][y].y, MAP)) 
            }
        }

        
        return settlements
    }

    connectSettlements(settlements, map){
        const paths = []
        let nearestSettlement = null
        let farthestSettlement = null
        let minDist = Number.POSITIVE_INFINITY
        let maxDist = 0
        for(let i = 0; i < settlements.length; i++){
            const settlement = settlements[i]
            for(let j = 0; j < settlements.length; j++){
                
                const currentTarget = settlements[j]
                const {x,y} = settlement
                const {x:x2,y:y2} = currentTarget

                if(x === x2 && y === y2) continue

                const dist = Utils.distance(x,y,x2,y2)

                if(dist < minDist){
                    minDist = dist
                    nearestSettlement = currentTarget
                }
                if(dist > maxDist){
                    maxDist = dist
                    farthestSettlement = currentTarget
                }
            }
            let newPath
            if(nearestSettlement !== null){
                newPath = FindPath(settlement,nearestSettlement,map)
                if(newPath !== undefined && newPath.length >1){
                    paths.push(newPath)
                    settlement.isConnected = true
                    nearestSettlement.isConnected = true
                } 
                
             }
             if(farthestSettlement !== null){
                newPath = FindPath(settlement,farthestSettlement,map)
                if(newPath !== undefined  && newPath.length >1){
                    paths.push(newPath)
                    settlement.isConnected = true
                    farthestSettlement.isConnected = true
                }
             }
        }

        return paths
    }
}