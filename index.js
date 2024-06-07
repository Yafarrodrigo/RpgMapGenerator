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
    ctx.fillRect(x*tileSize,y*tileSize,tileSize,tileSize)
}

function draw2(x,y,color){
    ctx.strokeStyle = color
    ctx.strokeRect(x*tileSize,y*tileSize,tileSize,tileSize)
}

const colors = {
    deepWater: "#3C96AA",
    water: "#5AAFB9",
    sand: "#E1D791",
    grass: "#96C869",
    trees: "#46AF64",
    lowMountain: "#CDB991",
    midMountain: "#A59173",
    highMountain: "#7D695A",
    snow: "#D7EBEB"
}

const rndSeed = Math.random()
const random = mulberry32(rndSeed)
const noise = new Noise(rndSeed);

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.height = window.innerHeight-15
canvas.width = window.innerWidth-15

const sizeX = canvas.width
const sizeY = canvas.height

const tileSize = 5
const cols = sizeX / tileSize
const rows = sizeY / tileSize
let scale = 25
const octaves = 15
const lacunarity = 2
const persistance = 0.5
let offsetX = 0
let offsetY = 0

let minNoiseHeight = 0
let maxNoiseHeight = 0

function generateMap(){
    const map = new Array(sizeX).fill(null).map( () => new Array(sizeY).fill(null))
    for(let x = 0; x < cols; x++){
        for(let y = 0; y < rows; y++){

            let noiseHeight = 0
            let frequency = 1
            let amplitude = 1

            for(let i = 0; i < octaves; i++){
                const sampleX = (x / scale * frequency) + offsetX
                const sampleY = (y / scale * frequency) + offsetY

                const value = Math.abs(noise.perlin2(sampleX,sampleY) + 0.5)
                noiseHeight += value * amplitude

                amplitude *= persistance
                frequency *= lacunarity
            }

            if(noiseHeight > maxNoiseHeight) maxNoiseHeight = noiseHeight
            else if(noiseHeight < minNoiseHeight) minNoiseHeight = noiseHeight

            map[x][y] = {noiseHeight}
        }
    }

    for(let x = 0; x < cols; x++){
        for(let y = 0; y < rows; y++){
            const storedValue = map[x][y].noiseHeight
            const value = invlerp(minNoiseHeight,maxNoiseHeight, storedValue)
            let color = "black"

            if(value > 0.95) color = colors.snow
            else if(value > 0.85) color = colors.highMountain
            else if(value > 0.75) color = colors.midMountain
            else if(value > 0.65) color = colors.lowMountain
            else if(value > 0.5) color = colors.trees
            else if(value > 0.35) color = colors.grass
            else if(value > 0.3) color = colors.sand
            else if(value > 0.2) color = colors.water
            else color = colors.deepWater

            draw(x,y, color)
        }
    }
}

let ticking = false;
document.addEventListener("wheel", function (e) {
  if (!ticking) {
    window.requestAnimationFrame(function () {
      if(e.wheelDeltaY < 0){
        if(scale - 5 > 5){
            scale -= 5
        }
        generateMap()
    }else{
        scale += 5
        generateMap()
      }
      ticking = false;
    });
  }
  ticking = true;
});

document.addEventListener('keydown', function (e) {
    switch(e.key){
        case "ArrowLeft":
            offsetX -= 1
            break;
        case "ArrowRight":
            offsetX += 1
            break;
        case "ArrowUp":
            offsetY -= 1
            break;
        case "ArrowDown":
            offsetY += 1
            break;
    }
    generateMap()
})

generateMap()
