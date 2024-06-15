const TILES = {
    plains: {
        id: "plains",
        name: "plains",
        canWalk: true,
        resources: {
            rocks: {
                weight: 1,
                color: "gray"
            },
            trees: {
                weight: 1,
                color: "brown"
            },
            bushes: {
                weight: 1,
                color: "lightgreen"
            }
        },
        bgColor: "#96C869",
    },
    forest: {
        id: "forest",
        name: "forest",
        canWalk: true,
        resources: {
            pebbles: {
                weight: 1,
                color: "gray"
            },
            trees: {
                weight: 1,
                color: "brown"
            },
            bushes: {
                weight: 1,
                color: "lightgreen"
            }
        },
        bgColor: "#46AF64",
    },
    jungle: {
        id: "jungle",
        name: "jungle",
        canWalk: true,
        resources: {
            pebbles: {
                weight: 1,
                color: "gray"
            },
            trees: {
                weight: 1,
                color: "brown"
            },
            bushes: {
                weight: 1,
                color: "lightgreen"
            }
        },
        bgColor: "#46AF64",
    },
    beach: {
        id: "beach",
        name: "beach",
        canWalk: true,
        resources: {
            rocks: {
                weight: 1,
                color: "gray"
            },
            bushes: {
                weight: 1,
                color: "lightgreen"
            }
        },
        bgColor: "#E1D791",
    },
    desert: {
        id: "desert",
        name: "desert",
        canWalk: true,
        resources: {
            rocks: {
                weight: 1,
                color: "gray"
            },
            pebbles: {
                weight: 1,
                color: "gray"
            }
        },
        bgColor: "#E1D791",
    },
    lowMountain: {
        id: "lowMountain",
        name: "lowMountain",
        canWalk: true,
        resources: {
            rocks: {
                weight: 1,
                color: "gray"
            },
            pebbles: {
                weight: 1,
                color: "gray"
            },
            bushes: {
                weight: 1,
                color: "lightgreen"
            }
        },
        bgColor: "#CDB991",
    },
    midMountain: {
        id: "midMountain",
        name: "midMountain",
        canWalk: true,
        resources: {
            rocks: {
                weight: 1,
                color: "gray"
            },
        },
        bgColor: "#A59173",
    },
    highMountain: {
        id: "highMountain",
        name: "highMountain",
        canWalk: false,
        resources: {},
        bgColor: "#7D695A",
    },
    deepWater: {
        id: "deepWater",
        name: "deepWater",
        canWalk: false,
        resources: {},
        bgColor: "#3C96AA",
    },
    water: {
        id: "water",
        name: "water",
        canWalk: true,
        resources: {},
        bgColor: "#5AAFB9",
    },
    lake: {
        id: "lake",
        name: "lake",
        canWalk: false,
        resources: {},
        bgColor: "#5AAFB9",
    },
    oasis: {
        id: "oasis",
        name: "oasis",
        canWalk: true,
        resources: {},
        bgColor: "#5AAFB9",
    },
    snow: {
        id: "snow",
        name: "snow",
        canWalk: false,
        resources: {},
        bgColor: "#D7EBEB",
    }
}