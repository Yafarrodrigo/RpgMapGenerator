import Attribute from "./Attribute.js"
import Skill from "./Skill.js"

export default class Player{
    constructor(x,y){
        this.x = x
        this.y = y

        this.attributes = {
            str: new Attribute("strenght","str",1,99,3),
            agi: new Attribute("agility","agi",1,99,3),
            int: new Attribute("intelligence","int",1,99,3),
            con: new Attribute("constitution","con",1,99,3),
            lck: new Attribute("luck","lck",1,99,3)
        }

        this.skills = {
            // weapons
            oneHandedWeapons: new Skill("One handed weapons","oneHandedWeapons",1,99,1), // able to equip with offhands
            rangedWeapons: new Skill("Ranged weapons","rangedWeapons",1,99,1),  // quivers as offhands
            twoHandedWeapons: new Skill("Two handed weapons","twoHandedWeapons",1,99,1), // no offhands

            // offhands
            shields: new Skill("Shields","shields",1,99,1), // defense
            quivers: new Skill("Quivers","quivers",1,99,1), // only bows/crossbows
            books: new Skill("Books","books",1,99,1),  // utility magic
            orbs: new Skill("Orbs","orbs",1,99,1),      // dmg magic
            
            // magic
            arcaneMastery: new Skill("Arcane mastery","arcaneMastery",1,99,1),  // utility
            fireMastery: new Skill("Fire mastery","fireMastery",1,99,1),    // dmg
            waterMastery: new Skill("Water mastery","waterMastery",1,99,1),   // healing
            airMastery: new Skill("Air mastery","airMastery",1,99,1),     // utility
            earthMastery: new Skill("Earth mastery","earthMastery",1,99,1),    // cc

            // proffesions
            herbalism: new Skill("Herbalism","herbalism",1,99,1),
            alchemy: new Skill("Alchemy","alchemy",1,99,1),
        }

        this.character = {value:"@", inMap: "◯", color: "magenta",offset: {x:-5,y:0},size: 30}
    }
}