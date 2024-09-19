import Attribute from "./Attribute.js"
import Skill from "./Skill.js"
import ATTRIBUTES from "../ATTRIBUTES.js"
import SKILLS from "../SKILLS.js"

export default class Player{
    constructor(x,y, newStats, name){
        this.x = x
        this.y = y
        this.name = name

        this.attributes = {}
        for(let attr in ATTRIBUTES){
            const { key,name,min,max } = ATTRIBUTES[attr]
            this.attributes[key] = new Skill(name, key, min, max, newStats[key])
        }

        this.skills = {}
        for(let skill in SKILLS){
            const { key,name,min,max } = SKILLS[skill]
            this.skills[key] = new Skill(name, key, min, max, newStats[key])
        }

        this.character = {value:"@", inMap: "◯", color: "magenta",offset: {x:-5,y:0},size: 30}
    }
}