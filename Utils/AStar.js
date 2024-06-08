export default function FindPath(start,end,originalMap){
    const map = structuredClone(originalMap)
    const openSet = []
    const closedSet = []
    const finalPath = []

    // setup map for search
    for(let x = 0; x < map.length; x++){
        for(let y = 0; y < map[0].length; y++){
            map[x][y].f = 0 // F = G + H
            map[x][y].g = 0
            map[x][y].h = 0
            map[x][y].neighbors = []
            map[x][y].previous = null
            if(x > 0 && x < map.length-1 && y > 0 && y < map[0].length-1){
                map[x][y].neighbors.push(map[x+1][y])
                map[x][y].neighbors.push(map[x-1][y])
                map[x][y].neighbors.push(map[x][y+1])
                map[x][y].neighbors.push(map[x][y-1])
            }
        }
    }

    openSet.push(map[start.x][start.y])

    let counter = 0
    while(openSet.length > 0 && counter < 1000){
        // find lowest F
        let winner = 0
        for(let i = 0 ; i < openSet.length; i++){
            if(openSet[i].f < openSet[winner].f) winner = i
        }
        const current = openSet[winner]

        // FOUND IT!
        if(current.x == end.x && current.y == end.y){
            // find path and return it
            let temp = current
            finalPath.push(temp)
            while(temp.previous !== null){
                finalPath.push(temp.previous)
                temp = temp.previous
            }
            return finalPath
        }

        closedSet.push(current)
        openSet.splice(winner, 1)


        for(let i = 0; i < current.neighbors.length; i++){
            const currentNeighbor = current.neighbors[i]
            // si el vecino NO esta en el closedSet ->
            // Tmb checkeo altura, bioma, etc
            if(!closedSet.includes(currentNeighbor) && checkAvailability(currentNeighbor)){

                let tempG = current.g + 1
                // si esta en el openSet y el nuevo G es menor-> se updatea el G
                if(openSet.includes(currentNeighbor)){
                    if(tempG < currentNeighbor.g){
                        currentNeighbor.g = tempG
                    }
                // si no esta en el openSet, se agrega al openSet con su G
                }else{
                    currentNeighbor.g = tempG
                    openSet.push(currentNeighbor)
                }

                currentNeighbor.h = heuristic(currentNeighbor, end)
                currentNeighbor.f = currentNeighbor.g + currentNeighbor.h
                currentNeighbor.previous = current
            }
        }
        
    }
}

// usando Manhattan distance
function heuristic(node1,node2){
    return Math.abs(node1.x-node1.x) + Math.abs(node2.y-node2.y)
}

// check for available tiles
function checkAvailability(currentNeighbor){
    let result = true
    const { biome } = currentNeighbor
    if(biome === "lake" ||
       biome === "water" ||
       biome === "deepWater" ||
       biome === "highMountain" ||
       biome === "midMountain" ){

            result = false
        }

    return result
}

 