import { Utils } from "../Utils/Utils.js"
import FindPath from "../Utils/AStar.js"
import CONFIGS from "../CONFIGS.js"

export default class MapGenerator{
    constructor(width, height, randomGen){
        this.sizeX = width
        this.sizeY = height
        this.random = randomGen

        this.tileSize = CONFIGS.mapTileSize

        this.cols = Math.floor(this.sizeX / this.tileSize)
        this.rows = Math.floor(this.sizeY / this.tileSize)
        
        // perlin parameters
        this.scale = CONFIGS.perlinScale
        this.lacunarity = CONFIGS.perlinLacunarity
        this.persistance = CONFIGS.perlinPersistance

        this.possibleSettlementSpawns = []
        this.settlements = []
    }
    
    generateMap(){
        const terrainMap = new Array(this.cols).fill(null).map( () => new Array(this.rows).fill(null))
        const mapData = {}
                                        // freq & octaves
        mapData.temperature = this.generateNoiseMap(CONFIGS.temperatureFreq,CONFIGS.temperatureOctaves)
        mapData.moisture = this.generateNoiseMap(CONFIGS.moistureFreq,CONFIGS.moistureOctaves)
        mapData.altitude = this.generateNoiseMap(CONFIGS.altitudeFreq,CONFIGS.altitudeOctaves)
    
        for(let x = 0; x < this.cols; x++){
            for(let y = 0; y < this.rows; y++){
                const temp = mapData.temperature[x][y]
                const alt = mapData.altitude[x][y]
                const moist = mapData.moisture[x][y]
    
                // my abajo -> agua
                if(Utils.between(alt, 0, 0.2)){
                    terrainMap[x][y] = {x,y,biome:"deepWater", temp,moist,alt}
                }
                else if(Utils.between(alt, 0.2, 0.24)){
                    terrainMap[x][y] = {x,y,biome:"water", temp,moist,alt}
                }
                // entre el agua y lo demas -> playa
                else if(Utils.between(alt, 0.25, 0.29)){
                    terrainMap[x][y] = {x,y,biome:"beach", temp,moist,alt}
                    this.possibleSettlementSpawns.push({x,y,biome:"beach", temp,moist,alt})
                }
                // lo demas, pero no muuuy alto -> diferentes biomas
                else if(Utils.between(alt, 0.3, 0.9)){
                    // plains
                    if(moist <= 0.8 && Utils.between(temp,0.1,0.5) || moist <= 0.7 && Utils.between(temp,0.5,0.7)){
                        terrainMap[x][y] = {x,y,biome:"plains", temp,moist,alt}
                        this.possibleSettlementSpawns.push({x,y,biome:"plains", temp,moist,alt})
                    // forest
                    }else if(Utils.between(moist, 0.8,0.9) && Utils.between(temp,0.1,0.5)){
                        terrainMap[x][y] = {x,y,biome:"forest", temp,moist,alt}
                        this.possibleSettlementSpawns.push({x,y,biome:"forest", temp,moist,alt})
                    }
                    // jungle
                    else if (Utils.between(moist,0.7,0.9) && Utils.between(temp,0.5,1)){
                        terrainMap[x][y] = {x,y,biome:"jungle", temp,moist,alt}
                        this.possibleSettlementSpawns.push({x,y,biome:"jungle", temp,moist,alt})
                    }
                    // desert
                    else if ((moist <= 0.7 && temp >= 0.7)){
                        terrainMap[x][y] = {x,y,biome:"desert", temp,moist,alt}
                        this.possibleSettlementSpawns.push({x,y,biome:"desert", temp,moist,alt})
                    }
                    // oasis
                    else if((moist >= 0.9 && temp >= 0.7)){
                        terrainMap[x][y] = {x,y,biome:"oasis", temp,moist,alt}
                    }
                    // water (lakes,rivers)
                    else if (moist >= 0.9 && temp >= 0.1){
                        terrainMap[x][y] = {x,y,biome:"lake", temp,moist,alt}
                    }else{
                        terrainMap[x][y] = {x,y,biome:"????", temp,moist,alt}
                    }
                }
                // arriba de todo montañas y nieve
                else{
                    if(alt > 1.05 && temp < 0.1) terrainMap[x][y] = {x,y,biome:"snow", temp,moist,alt}
                    else if(alt > 1.05) terrainMap[x][y] = {x,y,biome:"highMountain", temp,moist,alt}
                    else if(alt > 1) terrainMap[x][y] = {x,y,biome:"midMountain", temp,moist,alt}
                    else if(alt > 0.9){
                        terrainMap[x][y] = {x,y,biome:"lowMountain", temp,moist,alt}
                        this.possibleSettlementSpawns.push({x,y,biome:"lowMountain", temp,moist,alt})
                    }
                    else terrainMap[x][y] = {x,y,biome:"????", temp,moist,alt}
                }
            }
        }
    
        return terrainMap
    }

    generateNoiseMap(freq, octaves){
        const noise = new Noise(this.random()*99999);
        const map = new Array(this.cols).fill(null).map( () => new Array(this.rows).fill(null))
        let minNoiseHeight = 0
        let maxNoiseHeight = 0
        for(let x = 0; x < this.cols; x++){
            for(let y = 0; y < this.rows; y++){
    
                let noiseHeight = 0
                let frequency = freq
                let amplitude = 1
    
                for(let i = 0; i < octaves; i++){
                    const sampleX = x / this.scale * frequency
                    const sampleY = y / this.scale * frequency
    
                    const value = Math.abs(noise.perlin2(sampleX,sampleY) + 0.5)
                    noiseHeight += value * amplitude
    
                    amplitude *= this.persistance
                    frequency *= this.lacunarity
                }
    
                if(noiseHeight > maxNoiseHeight) maxNoiseHeight = noiseHeight
                else if(noiseHeight < minNoiseHeight) minNoiseHeight = noiseHeight
    
                map[x][y] = noiseHeight
            }
        }
        
        return map
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
        settlements.push(MAP[x][y])

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
                if(distances.filter( dist => dist < 100).length == 0) found = true
                safeCounter++
            }
            if(found === true){
                MAP[x][y].settlement = true
                MAP[x][y].settlementId = idCounter
                idCounter++
                settlements.push(MAP[x][y]) 
            }
        }

        
        return settlements
    }

    createRoadsBetweenSettlements(settlements,map){
        const paths = []
        for(let i = 0; i < settlements.length-1; i++){
            for(let j = i+1; j < settlements.length; j++){
                const current = settlements[i]
                const target = settlements[j]
                const path = FindPath(current,target,map)
                if(path !== undefined) paths.push(path)
            }
        }

        return paths
    }
}