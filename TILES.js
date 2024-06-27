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
        color: "#46AF64",
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
        color: "#46AF64",
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
    },
    midMountain: {
        id: "midMountain",
        name: "midMountain",
        canWalk: true,
        resources: [
            {name: "rocks",weight: 10,color: "gray"}
        ],
        color: "#A59173",
    },
    highMountain: {
        id: "highMountain",
        name: "highMountain",
        canWalk: false,
        resources: [],
        color: "#7D695A",
    },
    deepWater: {
        id: "deepWater",
        name: "deepWater",
        canWalk: false,
        resources: [],
        color: "#3C96AA",
    },
    water: {
        id: "water",
        name: "water",
        canWalk: true,
        resources: [],
        color: "#5AAFB9",
    },
    lake: {
        id: "lake",
        name: "lake",
        canWalk: false,
        resources: [],
        color: "#5AAFB9",
    },
    oasis: {
        id: "oasis",
        name: "oasis",
        canWalk: true,
        resources: [],
        color: "#5AAFB9",
    },
    snow: {
        id: "snow",
        name: "snow",
        canWalk: false,
        resources: [],
        color: "#D7EBEB",
    },
    road: {
        id: "road",
        name: "road",
        canWalk: true,
        resources: [],
        color: "#807d7d",
    }
}

export default TILES