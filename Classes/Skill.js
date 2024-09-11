import Stat from "./Stat.js"

export default class Skill extends Stat{
    constructor(name, key,min,max,current){
        super()
        this.name = name
        this.key = key
        this.min = min
        this.max = max
        this.current = current
    }
}