const TILES = {
    plains: {
        id: "plains",
        name: "plains",
        canWalk: true,
        resources: [
            {name: "rocks",weight: 1,color: "gray"},
            {name: "trees",weight: 2,color: "brown"},
            {name: "bushes",weight: 7,color: "lightgreen"}
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
        id: "forest",
        name: "forest",
        canWalk: true,
        resources: [
            {name: "pebbles",weight: 1,color: "gray"},
            {name: "trees",weight: 8,color: "brown"},
            {name:"bushes",weight: 2,color: "lightgreen"}
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
        id: "jungle",
        name: "jungle",
        canWalk: true,
        resources: [
            {name: "pebbles",weight: 1,color: "gray"},
            {name: "trees",weight: 7,color: "brown"},
            {name:"bushes",weight: 2,color: "lightgreen"}
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
        id: "beach",
        name: "beach",
        canWalk: true,
        resources: [
            {name: "rocks",weight: 7,color: "gray"},
            {name:"bushes",weight: 3,color: "lightgreen"}
        ],
        color: "#E1D791",
        character: [
            {value:"⋯",offset: {x:0,y:0},size: 20},
            {value:"-",offset: {x:0,y:0},size: 20}
        ]
    },
    desert: {
        id: "desert",
        name: "desert",
        canWalk: true,
        resources: [
            {name: "rocks",weight: 6,color: "gray"},
            {name: "pebbles",weight: 4,color: "gray"},
        ],
        color: "#E1D791",
        character: [
            {value:"⋯",offset: {x:0,y:0},size: 20},
            {value:"-",offset: {x:0,y:0},size: 20}
        ]
    },
    lowMountain: {
        id: "lowMountain",
        name: "lowMountain",
        canWalk: true,
        resources: [
            {name: "rocks",weight: 6,color: "gray"},
            {name: "pebbles",weight: 3,color: "gray"},
            {name:"bushes",weight: 1,color: "lightgreen"}
        ],
        color: "#CDB991",
        character: [
            {value:".",offset: {x:0,y:0},size: 20}
        ]
    },
    midMountain: {
        id: "midMountain",
        name: "midMountain",
        canWalk: true,
        resources: [],
        color: "#82673e",
        character: [
            {value:"˄",offset: {x:0,y:0},size: 25}
        ]
    },
    highMountain: {
        id: "highMountain",
        name: "highMountain",
        canWalk: false,
        resources: [],
        color: "#66442b",
        character: [
            {value:"Δ",offset: {x:0,y:0},size: 20}
        ]
    },
    deepWater: {
        id: "deepWater",
        name: "deepWater",
        canWalk: false,
        resources: [],
        color: "#3C96AA",
        character: [
            {value:"≈",offset: {x:0,y:10},size: 30}
        ]
    },
    water: {
        id: "water",
        name: "water",
        canWalk: true,
        resources: [],
        color: "#5AAFB9",
        character: [
            {value:"∼",offset: {x:-3,y:5},size: 30}
        ]
    },
    lake: {
        id: "lake",
        name: "lake",
        canWalk: false,
        resources: [],
        color: "#5AAFB9",
        character: [
            {value:"∼",offset: {x:-3,y:5},size: 30}
        ]
    },
    oasis: {
        id: "oasis",
        name: "oasis",
        canWalk: true,
        resources: [],
        color: "#5AAFB9",
        character: [
            {value:"∼",offset: {x:-3,y:5},size: 30}
        ]
    },
    snow: {
        id: "snow",
        name: "snow",
        canWalk: false,
        resources: [],
        color: "#D7EBEB",
        character: [
            {value:"s",offset: {x:0,y:0},size: 20}
        ]
    },
    road: {
        id: "road",
        name: "road",
        canWalk: true,
        resources: [],
        color: "#848a4e",
        character: [{value:"r",offset: {x:0,y:0},size: 20}]
    },
    settlement: {
        id: "settlement",
        name: "settlement",
        canWalk: false,
        resources: [],
        color: "magenta",
        character: [{value:"s",offset: {x:0,y:0},size: 20}]
    }
}

// cursor ⯐    ⦻   ☤   ☠  ☣

export default TILES