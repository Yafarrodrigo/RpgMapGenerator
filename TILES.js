const TILES = {
    plains: {
        biome: "plains",
        canWalk: true,
        canHaveRoad: true,
        canSpawnSettlement: true,
        resources: [
            {name: "rocks",weight: 1,color: "gray", character:"r"},
            {name: "trees",weight: 1,color: "brown", character:"t"},
            {name: "bushes",weight: 8,color: "lightgreen", character:"b"}
        ],
        color: "#96C869",
        character: [
            {value:",",offset: {x:5,y:-5},size: 30},
            {value:".",offset: {x:0,y:0},size: 30},
            {value:"'",offset: {x:5,y:17},size: 30},
            {value:"`",offset: {x:0,y:25},size: 30},
            {value:"´",offset: {x:0,y:25},size: 30},
            {value:"\"",offset: {x:3,y:15},size: 30},
        ]
    },
    forest: {
        biome: "forest",
        canWalk: true,
        canHaveRoad: true,
        canSpawnSettlement: true,
        resources: [
            {name: "pebbles",weight: 1,color: "gray", character:"p"},
            {name: "trees",weight: 8,color: "brown", character:"t"},
            {name:"bushes",weight: 2,color: "lightgreen", character:"b"}
        ],
        color: "#1c7034",
        character: [
            {value:",",offset: {x:5,y:-5},size: 30},
            {value:".",offset: {x:0,y:0},size: 30},
            {value:"'",offset: {x:5,y:17},size: 30},
            {value:"`",offset: {x:0,y:25},size: 30},
            {value:"´",offset: {x:0,y:25},size: 30},
            {value:"\"",offset: {x:3,y:15},size: 30},
        ]
    },
    jungle: {
        biome: "jungle",
        canWalk: true,
        canHaveRoad: true,
        canSpawnSettlement: true,
        resources: [
            {name: "pebbles",weight: 1,color: "gray", character:"p"},
            {name: "trees",weight: 7,color: "brown", character:"t"},
            {name:"bushes",weight: 2,color: "lightgreen", character:"b"}
        ],
        color: "#1c7034",
        character: [
            {value:",",offset: {x:5,y:-5},size: 30},
            {value:".",offset: {x:0,y:0},size: 30},
            {value:"'",offset: {x:5,y:17},size: 30},
            {value:"`",offset: {x:0,y:25},size: 30},
            {value:"´",offset: {x:0,y:25},size: 30},
            {value:"\"",offset: {x:3,y:15},size: 30},
        ]
    },
    beach: {
        biome: "beach",
        canWalk: true,
        canHaveRoad: true,
        canSpawnSettlement: true,
        resources: [
            {name: "rocks",weight: 7,color: "gray", character:"r"},
            {name:"bushes",weight: 3,color: "lightgreen", character:"b"}
        ],
        color: "#E1D791",
        character: [
            {value:"⋯",offset: {x:0,y:0},size: 20},
            {value:"-",offset: {x:0,y:0},size: 20}
        ]
    },
    desert: {
        biome: "desert",
        canWalk: true,
        canHaveRoad: true,
        canSpawnSettlement: true,
        resources: [
            {name: "rocks",weight: 6,color: "gray", character:"r"},
            {name: "pebbles",weight: 4,color: "gray", character:"p"},
        ],
        color: "#E1D791",
        character: [
            {value:"⋯",offset: {x:0,y:0},size: 20},
            {value:"-",offset: {x:0,y:0},size: 20}
        ]
    },
    lowMountain: {
        biome: "lowMountain",
        canWalk: true,
        canHaveRoad: true,
        canSpawnSettlement: false,
        resources: [
            {name: "rocks",weight: 6,color: "gray", character:"r"},
            {name: "pebbles",weight: 3,color: "gray", character:"p"},
            {name:"bushes",weight: 1,color: "lightgreen", character:"b"}
        ],
        color: "#CDB991",
        character: [
            {value:".",offset: {x:0,y:0},size: 20}
        ]
    },
    midMountain: {
        biome: "midMountain",
        canWalk: false,
        canHaveRoad: false,
        canSpawnSettlement: false,
        resources: [],
        color: "#82673e",
        character: [
            {value:"Δ",offset: {x:0,y:0},size: 25}
        ]
    },
    highMountain: {
        biome: "highMountain",
        canWalk: false,
        canHaveRoad: false,
        canSpawnSettlement: false,
        resources: [],
        color: "#66442b",
        character: [
            {value:"⩕",offset: {x:0,y:0},size: 20}
        ]
    },
    deepWater: {
        biome: "deepWater",
        canWalk: false,
        canHaveRoad: false,
        canSpawnSettlement: false,
        resources: [],
        color: "#3C96AA",
        character: [
            {value:"≈",offset: {x:0,y:10},size: 30}
        ]
    },
    water: {
        biome: "water",
        canWalk: true,
        canHaveRoad: false,
        canSpawnSettlement: false,
        resources: [],
        color: "#5AAFB9",
        character: [
            {value:"∼",offset: {x:-3,y:5},size: 30}
        ]
    },
    lake: {
        biome: "lake",
        canWalk: false,
        canHaveRoad: false,
        canSpawnSettlement: false,
        resources: [],
        color: "#5AAFB9",
        character: [
            {value:"∼",offset: {x:-3,y:5},size: 30}
        ]
    },
    oasis: {
        biome: "oasis",
        canWalk: true,
        canHaveRoad: false,
        canSpawnSettlement: false,
        resources: [],
        color: "#5AAFB9",
        character: [
            {value:"∼",offset: {x:-3,y:5},size: 30}
        ]
    },
    snow: {
        biome: "snow",
        canWalk: false,
        canHaveRoad: false,
        canSpawnSettlement: false,
        resources: [],
        color: "#D7EBEB",
        character: [
            {value:"s",offset: {x:0,y:0},size: 20}
        ]
    },
    road: {
        biome: "road",
        canWalk: true,
        canHaveRoad: true,
        canSpawnSettlement: false,
        resources: [],
        //color: "#848a4e",
        color: "red",
        character: [{value:"r",offset: {x:0,y:0},size: 20}]
    },
    settlement: {
        biome: "settlement",
        canWalk: false,
        canHaveRoad: false,
        canSpawnSettlement: false,
        resources: [],
        color: "magenta",
        character: [{value:"s",offset: {x:0,y:0},size: 20}],
        tileMap: [["╔","═","═","═","╗"],
                  ["║"," "," "," ","║"],
                  ["║"," ","⏏"," ","║"],
                  ["║"," "," "," ","║"],
                  ["╚","═","═","═","╝"]]
    }
}

// cursor ⯐    ⦻   ☤   ☠  ☣

export default TILES