import Viewport from "./Viewport.js";
import {FindPath} from "./AStar.js"

// random (seeded)
function mulberry32(a) {
    return function() {
        var t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296
    }
}

const clamp = (a, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const invlerp = (x, y, a) => clamp((a - x) / (y - x));

function draw(x,y,color){
    ctx.fillStyle = color
    ctx.fillRect(x*viewTileSize,y*viewTileSize,viewTileSize,viewTileSize)
}


function between(stat, min ,max){
    return stat >= min && stat <= max
}

const colors = {
    deepWater: "#3C96AA",
    water: "#5AAFB9",
    lake: "#5AAFB9",
    oasis: "#E1D791",
    beach: "#E1D791",
    desert: "#E1D791",
    plains: "#96C869",
    forest: "#46AF64",
    jungle: "#46AF64",
    lowMountain: "#CDB991",
    midMountain: "#A59173",
    highMountain: "#7D695A",
    snow: "#D7EBEB",
    "????": "#96C869"
}

let UP,DOWN,LEFT,RIGHT = false

const rndSeed = 666 //Math.random()*99999
const random = mulberry32(rndSeed)

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.height = window.innerHeight-15
canvas.width = window.innerWidth-15

// mas alto el valor -> ??? -> problemas
const sizeX = 1000
const sizeY = 1000

let tileSize = 5
let viewTileSize = 5
const cols = Math.floor(sizeX / tileSize)
const rows = Math.floor(sizeY / tileSize)
let scale = 50
const lacunarity = 5
const persistance = 0.3

const possibleSettlementSpawns = []
const settlements = []
const viewport = new Viewport(canvas.width,canvas.height,rows,cols,viewTileSize)

let minNoiseHeight = 0
let maxNoiseHeight = 0

const MAP = generateMap()
placeRandomSettlements(5)
const paths = createRoadsBetweenSettlements()

const midTile = MAP[Math.floor(cols/2)][Math.floor(rows/2)]
let offsetX = 100
let offsetY = 100

update()

function drawViewport(){

    const {offset} = viewport
    
    for(let x = viewport.startTile.x; x <= viewport.endTile.x; x++){
      for(let y = viewport.startTile.y; y <= viewport.endTile.y; y++){

        const tile = MAP[x][y]
        if(!tile) continue

        const finalX = tile.x+offset.x
        const finalY = tile.y+offset.y

        draw(finalX,finalY,colors[tile.biome])
      }
    }

    drawPaths()
    drawSettlements()
  }

function drawPaths(){
    const {offset} = viewport
    paths.forEach( path => {
        path.forEach( tile => {
            draw(tile.x+offset.x,tile.y+offset.y,"red")
        })
    })
}

function drawSettlements(){
    settlements.forEach( tile => {

        const {offset} = viewport

        const finalX = tile.x+offset.x
        const finalY = tile.y+offset.y

        ctx.fillStyle = "blue"
        ctx.beginPath()
        ctx.arc(finalX*viewTileSize,finalY*viewTileSize,tileSize,0,Math.PI*2)
        ctx.fill()
    })
}

setInterval(()=>{
    update()
},32)

function update(){

    if(LEFT){
        if(viewport.velocity.x - viewport.acc >= -viewport.maxVelocity){
            viewport.velocity.x -= viewport.acc
        }
    }
    else if(RIGHT){
        if(viewport.velocity.x + viewport.acc <= viewport.maxVelocity){
            viewport.velocity.x += viewport.acc
        }
    }
    else{
        if(viewport.velocity.x > 0) viewport.velocity.x -= viewport.acc
        else if(viewport.velocity.x < 0) viewport.velocity.x += viewport.acc
    }
    if(UP){
        if(viewport.velocity.y - viewport.acc >= -viewport.maxVelocity){
            viewport.velocity.y -= viewport.acc
        }
    }
    else if(DOWN){
        if(viewport.velocity.y + viewport.acc <= viewport.maxVelocity){
            viewport.velocity.y += viewport.acc
        }
    }
    else{
        if(viewport.velocity.y > 0) viewport.velocity.y -= viewport.acc
        else if(viewport.velocity.y < 0) viewport.velocity.y += viewport.acc
    }

    offsetX += viewport.velocity.x
    offsetY += viewport.velocity.y

    ctx.clearRect(0,0,canvas.width,canvas.height)
    viewport.updateViewport(offsetX,offsetY)
    drawViewport()
}

function generateMap(){
    const terrainMap = new Array(cols).fill(null).map( () => new Array(rows).fill(null))
    const mapData = {}
                                    // freq & octaves
    mapData.temperature = generateNoiseMap(1,5)
    mapData.moisture = generateNoiseMap(0.5,20)
    mapData.altitude = generateNoiseMap(1,20)

    for(let x = 0; x < cols; x++){
        for(let y = 0; y < rows; y++){
            const temp = mapData.temperature[x][y]
            const alt = mapData.altitude[x][y]
            const moist = mapData.moisture[x][y]

            // my abajo -> agua
            if(between(alt, 0, 0.2)){
                terrainMap[x][y] = {x,y,biome:"deepWater", temp,moist,alt}
            }
            else if(between(alt, 0.2, 0.24)){
                terrainMap[x][y] = {x,y,biome:"water", temp,moist,alt}
            }
            // entre el agua y lo demas -> playa
            else if(between(alt, 0.25, 0.29)){
                terrainMap[x][y] = {x,y,biome:"beach", temp,moist,alt}
                possibleSettlementSpawns.push({x,y,biome:"beach", temp,moist,alt})
            }
            // lo demas, pero no muuuy alto -> diferentes biomas
            else if(between(alt, 0.3, 0.9)){
                // plains
                if(moist <= 0.8 && between(temp,0.1,0.5) || moist <= 0.7 && between(temp,0.5,0.7)){
                    terrainMap[x][y] = {x,y,biome:"plains", temp,moist,alt}
                    possibleSettlementSpawns.push({x,y,biome:"plains", temp,moist,alt})
                // forest
                }else if(between(moist, 0.8,0.9) && between(temp,0.1,0.5)){
                    terrainMap[x][y] = {x,y,biome:"forest", temp,moist,alt}
                    possibleSettlementSpawns.push({x,y,biome:"forest", temp,moist,alt})
                }
                // jungle
                else if (between(moist,0.7,0.9) && between(temp,0.5,1)){
                    terrainMap[x][y] = {x,y,biome:"jungle", temp,moist,alt}
                    possibleSettlementSpawns.push({x,y,biome:"jungle", temp,moist,alt})
                }
                // desert
                else if ((moist <= 0.7 && temp >= 0.7)){
                    terrainMap[x][y] = {x,y,biome:"desert", temp,moist,alt}
                    possibleSettlementSpawns.push({x,y,biome:"desert", temp,moist,alt})
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
                else if(alt > 0.9) terrainMap[x][y] = {x,y,biome:"lowMountain", temp,moist,alt}
                else terrainMap[x][y] = {x,y,biome:"????", temp,moist,alt}
            }
        }
    }

    return terrainMap
}

// Manhattan distance
function distance(x0,y0,x1,y1){
    return Math.abs(x1-x0) + Math.abs(y1-y0)
}

// sketchy pero funciona
function placeRandomSettlements(qty){
    let randomIndex
    let x,y
    let distances = []
    let safeCounter = 0
    let idCounter = 0
    // first settlement
    randomIndex = Math.floor(Math.random()*possibleSettlementSpawns.length)
    x = possibleSettlementSpawns[randomIndex].x
    y = possibleSettlementSpawns[randomIndex].y
    MAP[x][y].settlement = true
    MAP[x][y].settlementId = idCounter
    idCounter++
    settlements.push(MAP[x][y])

    for(let i = 0; i < qty-1; i++){
        let found = false
        while(found === false && safeCounter <= 1000){
            distances = []
            randomIndex = Math.floor(Math.random()*possibleSettlementSpawns.length)
            x = possibleSettlementSpawns[randomIndex].x
            y = possibleSettlementSpawns[randomIndex].y
            
            for(let j = 0; j < settlements.length; j++){
                let xx = settlements[j].x
                let yy = settlements[j].y
                distances.push(distance(x,y,xx,yy))
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
}

function createRoadsBetweenSettlements(){
    const paths = []
    for(let i = 0; i < settlements.length-1; i++){
        for(let j = i+1; j < settlements.length; j++){
            const current = settlements[i]
            const target = settlements[j]
            const path = FindPath(current,target,MAP)
            if(path !== undefined) paths.push(path)
        }
    }

    return paths
}

function generateNoiseMap(freq, octaves){
    const noise = new Noise(random()*99999);
    const map = new Array(cols).fill(null).map( () => new Array(rows).fill(null))
    for(let x = 0; x < cols; x++){
        for(let y = 0; y < rows; y++){

            let noiseHeight = 0
            let frequency = freq
            let amplitude = 1

            for(let i = 0; i < octaves; i++){
                const sampleX = x / scale * frequency
                const sampleY = y / scale * frequency

                const value = Math.abs(noise.perlin2(sampleX,sampleY) + 0.5)
                noiseHeight += value * amplitude

                amplitude *= persistance
                frequency *= lacunarity
            }

            if(noiseHeight > maxNoiseHeight) maxNoiseHeight = noiseHeight
            else if(noiseHeight < minNoiseHeight) minNoiseHeight = noiseHeight

            map[x][y] = noiseHeight
        }
    }
    
    return map
}

let ticking = false;
document.addEventListener("wheel", function (e) {
  if (!ticking) {
    window.requestAnimationFrame(function () {
      if(e.wheelDeltaY < 0){
        if(viewTileSize - 1 >= 5){
            viewTileSize -= 1
        }
    }else{
        viewTileSize += 1
      }
      ticking = false;
    });
  }
  ticking = true;
});


document.addEventListener('keydown', function (e) {
    switch(e.key){
        case "a":
        case "A":
        case "ArrowLeft":
            LEFT = true
            break;
        case "d":
        case "D":
        case "ArrowRight":
            RIGHT = true
            break;
        case "w":
        case "W":
        case "ArrowUp":
            UP = true
            break;
        case "s":
        case "S":
        case "ArrowDown":
            DOWN = true
            break;
    }
})

document.addEventListener('keyup', function (e) {
    switch(e.key){
        case "a":
        case "A":
        case "ArrowLeft":
            LEFT = false
            break;
        case "d":
        case "D":
        case "ArrowRight":
            RIGHT = false
            break;
        case "w":
        case "W":
        case "ArrowUp":
            UP = false
            break;
        case "s":
        case "S":
        case "ArrowDown":
            DOWN = false
            break;
    }
})
