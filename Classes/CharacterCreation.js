import Menu from "./Menu.js"
import { moveToEditChar } from "../index.js"

export default class CharacterCreation{
    constructor(moveToMapSelector){

        this.playerAttributes = {
            str: 1,
            agi: 1,
            int: 1,
            con: 1,
            lck: 1
        }

        this.playerSkills = {
            // weapons
            oneHandedWeapons: 1,
            rangedWeapons: 1,
            twoHandedWeapons: 1,

            // offhands
            shields: 1,
            quivers: 1,
            books: 1,
            orbs: 1,
            
            // magic
            arcaneMastery: 1,
            fireMastery: 1,
            waterMastery: 1,
            airMastery: 1,
            earthMastery: 1,

            // proffesions
            herbalism: 1,
            alchemy: 1
        }

        this.moveToMapSelector = moveToMapSelector
        this.newPlayerSelections = {
            age: "middle age",
            body: "average",
            location: "unknown",
            fear: "unknown",
            belief: "unknown",
            name: "unknown"
        }
        this.currentPlayerCreationStage = 0
        // TODO: MEJORAR ESTA COSA....
        this.playerCreationStages = [
            {key: "age", options: ["young", "middle age", "old"], default: 0,
                question: "What's your character age?"
            },
            {key: "body", options: ["skinny", "average", "strong"], default: 0,
                question: "Describe your character's physical appearance"
            },
            {key: "location", options: ["unknown", "village", "wilderness", "jail", "church"], default: 0,
                question: "Where did your character grow up?"
            },
            {key: "fear", options: ["unknown","nothing", "dying", "confrontation", "sickness"], default: 0,
                question: "What does your character fear most?"
            },
            {key: "belief", options: ["unknown", "none", "mystical", "material"], default: 0,
                question: "Does your character see the world governed by mystical forces, tangible realities, or is it indifferent?"
            }
        ]

        this.currentMenu = new Menu(this.playerCreationStages[this.currentPlayerCreationStage].question)
        this.currentQuestion = this.playerCreationStages[this.currentPlayerCreationStage]

        this.currentQuestion.options.forEach( opt => {
            this.currentMenu.addOption(opt, () => { this.newPlayerSelections[this.currentQuestion.key] = opt ; this.nextQuestion() })
        })
    }

    nextQuestion(){
        if( this.currentPlayerCreationStage + 1 < this.playerCreationStages.length){
            this.currentPlayerCreationStage += 1
            this.currentQuestion = this.playerCreationStages[this.currentPlayerCreationStage]
            this.currentMenu.terminate()
            this.currentMenu = new Menu(this.playerCreationStages[this.currentPlayerCreationStage].question)

            this.currentQuestion.options.forEach( opt => {
                this.currentMenu.addOption(opt, () => { this.newPlayerSelections[this.currentQuestion.key] = opt ; this.nextQuestion() })
            })
        }
        else if (this.currentPlayerCreationStage + 1 === this.playerCreationStages.length){
            this.applySelectionsToStats()
            // EDIT STATS SCREEN
            const name = prompt("Whats your character's name?")
            if(name !== ""){
                this.newPlayerSelections.name = name
            }else{
                this.newPlayerSelections.name = "unknown"
            }
            this.currentMenu.terminate()
            moveToEditChar(this.playerAttributes, this.playerSkills)
        }
    }

    // TODO: MEJORAR ESTA COSA JUNTO CON LAS OPCIONES
    applySelectionsToStats(){
        // age
        if(this.newPlayerSelections.age === "young"){
            this.playerAttributes.con += 1
            this.playerAttributes.agi += 1
            this.playerAttributes.int -= 1
        }
        else if(this.newPlayerSelections.age === "middle age"){
            this.playerAttributes.str += 1
            this.playerAttributes.con += 1
            this.playerAttributes.agi -= 1
        }
        else{
            this.playerAttributes.str -= 1
            this.playerAttributes.agi -= 1
            this.playerAttributes.int += 2    
        }

        // body
        if(this.newPlayerSelections.body === "skinny"){
            this.playerAttributes.agi += 1
            this.playerAttributes.str -= 1
        }
        else if(this.newPlayerSelections.body === "average"){
            this.playerAttributes.con += 1
        }
        else{
            this.playerAttributes.str += 1
            this.playerAttributes.agi -= 1
        }

        let location = this.newPlayerSelections.location
        if(location === "unknown"){
            const other = ["village", "wilderness", "jail", "church"]
            location = other[Math.floor(Math.random()*other.length)]
        }
        if(location === "village"){
            this.playerSkills.oneHandedWeapons += 1
            this.playerSkills.rangedWeapons += 1
            this.playerSkills.shields += 1
        }
        else if(location === "wilderness"){
            this.playerSkills.herbalism += 2
            this.playerSkills.rangedWeapons += 1
            this.playerSkills.quivers += 1
        }
        else if(location === "jail"){
            this.playerSkills.twoHandedWeapons += 2
        }
        else{
            this.playerSkills.arcaneMastery += 1
            this.playerSkills.fireMastery += 1
            this.playerSkills.waterMastery += 1
            this.playerSkills.earthMastery += 1
            this.playerSkills.airMastery += 1
            
            this.playerSkills.books += 2
            this.playerSkills.orbs += 1
        }

        let fear = this.newPlayerSelections.fear
        if(fear === "unknown"){
            const other = ["nothing", "dying", "confrontation", "sickness"]
            fear = other[Math.floor(Math.random()*other.length)]
        }

        if(fear === "nothing"){
            this.playerAttributes.str += 2
            this.playerAttributes.int -= 1
        }
        else if(fear === "dying"){
            this.playerAttributes.con += 2
            this.playerAttributes.agi -= 1
        }
        else if(fear === "confrontation"){
            this.playerAttributes.agi += 2
            this.playerAttributes.con -= 1
        }else{
            this.playerAttributes.con += 2
            this.playerAttributes.str -= 1
        }

        let belief = this.newPlayerSelections.belief
        if(belief === "unknown"){
            const other = ["none", "mystical", "material"]
            belief = other[Math.floor(Math.random()*other.length)]
        }

        if(belief === "material"){
            this.playerAttributes.str += 1
            this.playerAttributes.agi += 1
            this.playerAttributes.int -= 1
        }
        else if(belief === "mystical"){
            this.playerAttributes.str -= 1
            this.playerAttributes.agi -= 1
            this.playerAttributes.int += 2
        }

        for(let atr in this.playerAttributes){
            if(this.playerAttributes[atr] < 0){
                this.playerAttributes[atr] = 0
            }
        }
    }
}