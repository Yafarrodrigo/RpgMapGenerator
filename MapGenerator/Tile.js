export default class Tile{
    constructor({x,y,biome,temp,moist,alt,canSpawnSettlement}){
        this.x = x
        this.y = y
        this.biome = biome
        this.temp = temp
        this.moist = moist
        this.alt = alt
        this.canSpawnSettlement = canSpawnSettlement

        let chosenResource = null
        if(biome === "plains"){
            const r = Math.random()
            if(r >= 0.975){
                chosenResource = "rock"
            }else if(r >= 0.95){
                chosenResource = "tree"
            }else if(r >= 0.8){
                chosenResource = "bush"
            }else {
                chosenResource = null
            }
        }
        else if(biome === "forest" || biome === "jungle"){
            const r = Math.random()
            if(r >= 0.975){
                chosenResource = "rock"
            }else if(r >= 0.95){
                chosenResource = "bush"
            }else if(r >= 0.7){
                chosenResource = "tree"
            }else {
                chosenResource = null
            }
        }
        else if(biome === "desert" || biome === "beach"){
            const r = Math.random()
            if(r >= 0.975){
                chosenResource = "bush"
            }else if(r >= 0.9){
                chosenResource = "rock"
            }else {
                chosenResource = null
            }
        }
        else if(biome === "lowMountain" || biome === "midMountain"){
            const r = Math.random()
            if(r >= 0.975){
                chosenResource = "bush"
            }else if(r >= 0.7){
                chosenResource = "rock"
            }else {
                chosenResource = null
            }
        }

        this.resource = chosenResource
    }
}