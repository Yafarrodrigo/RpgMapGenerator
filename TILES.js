const TILES = {
    plains: {
        biome: "plains",
        canWalk: true,
        canHaveRoad: true,
        canSpawnSettlement: true,
        resources: [
            {name: "rocks",weight: 1,color: "#999", bgColor: "#333", character:"r"},
            {name: "trees",weight: 1,color: "brown", bgColor: "#052105", character:"t"},
            {name: "bushes",weight: 8,color: "lightgreen", bgColor: "", character:"b"}
        ],
        color: "#96C869",
        bgColor: "",
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
            {name: "pebbles",weight: 1,color: "#999",bgColor: "", character:"p"},
            {name: "trees",weight: 8,color: "brown",bgColor: "#052105", character:"t"},
            {name:"bushes",weight: 2,color: "lightgreen",bgColor: "", character:"b"}
        ],
        color: "#1c7034",
        bgColor: "",
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
            {name: "pebbles",weight: 1,color: "#999",bgColor: "", character:"p"},
            {name: "trees",weight: 7,color: "brown",bgColor: "#052105", character:"t"},
            {name:"bushes",weight: 2,color: "lightgreen",bgColor: "", character:"b"}
        ],
        color: "#1c7034",
        bgColor: "",
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
            {name: "rocks",weight: 7,color: "#999",bgColor: "#333", character:"r"},
            {name:"bushes",weight: 3,color: "lightgreen",bgColor: "", character:"b"}
        ],
        color: "#E1D791",
        bgColor: "",
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
            {name: "rocks",weight: 6,color: "#999",bgColor: "#333", character:"r"},
            {name: "pebbles",weight: 4,color: "#999",bgColor: "", character:"p"},
        ],
        color: "#E1D791",
        bgColor: "",
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
            {name: "rocks",weight: 6,color: "#999",bgColor: "#333", character:"r"},
            {name: "pebbles",weight: 3,color: "#999",bgColor: "", character:"p"},
            {name:"bushes",weight: 1,color: "lightgreen",bgColor: "", character:"b"}
        ],
        color: "#CDB991",
        bgColor: "",
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
        bgColor: "#422711",
        character: [
            {value:"Δ",offset: {x:-5,y:5},size: 25}
        ]
    },
    highMountain: {
        biome: "highMountain",
        canWalk: false,
        canHaveRoad: false,
        canSpawnSettlement: false,
        resources: [],
        color: "#66442b",
        bgColor: "#211811",
        character: [
            {value:"⩕",offset: {x:-5,y:0},size: 20}
        ]
    },
    deepWater: {
        biome: "deepWater",
        canWalk: false,
        canHaveRoad: false,
        canSpawnSettlement: false,
        resources: [],
        color: "#3C96AA",
        bgColor: "",
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
        bgColor: "",
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
        bgColor: "",
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
        bgColor: "",
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
        bgColor: "",
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
        color: "#111",
        bgColor: "darkorange",
        character: [{value:"░░░",offset: {x:-7,y:3},size: 15}]
    },
    settlement: {
        biome: "settlement",
        canWalk: false,
        canHaveRoad: false,
        canSpawnSettlement: false,
        resources: [],
        color: "magenta",
        bgColor: "",
        character: [{value:"s",offset: {x:0,y:0},size: 20}],
        tileMap: [["╔","═","═","═","╗"],
                  ["║"," "," "," ","║"],
                  ["║"," ","⏏"," ","║"],
                  ["║"," "," "," ","║"],
                  ["╚","═","═","═","╝"]]
    }
}

// cursor ⯐    ⦻  ☤  ☠  ☣  ⚔  ⚝   

export default TILES