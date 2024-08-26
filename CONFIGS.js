const CONFIGS = {
    canvasWidth: 1500,
    canvasHeight: 800,
    mapWidth: 1000,
    mapHeight: 1000,
    mapTileSize: 5,

    perlin:{
        temperature:{
            scale: 150,
            frequency: 2,
            octaves: 5,
            lacunarity: 5,
            persistance: 0.3
        },
        moisture:{
            scale: 150,
            frequency: 1,
            octaves: 5,
            lacunarity: 5,
            persistance: 0.35
        },
        altitude:{
            scale: 50,
            frequency: 0.5,
            octaves: 5,
            lacunarity: 5,
            persistance: 0.25
        }
    },

    qtySettlements: 10,
    settlementMinDistance: 100,
    
    defaultCharactersOffset: {x:5,y:5},   // {x:10,y:25}
    viewTileSize: 5,                        // viewTileSize: 35
    tileScale: 0.5,                         // tileScale: 1.1
    camStartOffsetX: 40,
    camStartOffsetY: 40,

}

export default CONFIGS