const CONFIGS = {
    canvasWidth: 750,
    canvasHeight: 1200,
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
    settlementMinDistance: 150,
    
    viewTileSize: 15 ,
    camStartOffsetX: 40,
    camStartOffsetY: 40,

    defaultCharactersOffset: {x:10,y:25} // --> viewTileSize: 35
}

export default CONFIGS