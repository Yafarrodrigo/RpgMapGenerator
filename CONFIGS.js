const CONFIGS = {
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
    
    viewTileSize: 5,
    camStartOffsetX: 90,
    camStartOffsetY: 90,
}

export default CONFIGS