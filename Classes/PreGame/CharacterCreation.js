import Menu from "./Menu.js"
import { moveToEditChar } from "../../index.js"
import ATTRIBUTES from "../../ATTRIBUTES.js"
import SKILLS from "../../SKILLS.js"
import QUESTIONS from "../../QUESTIONS.js"

export default class CharacterCreation{
    constructor(){

        this.stats = {}
        for(let attr in ATTRIBUTES){
            const { key, defaultValue } = ATTRIBUTES[attr]
            this.stats[key] = defaultValue
        }

        for(let skill in SKILLS){
            const { key, defaultValue } = SKILLS[skill]
            this.stats[key] = defaultValue
        }

        this.newPlayerSelections = {
            age: 0,
            body: 0,
            location: 0,
            fear: 0,
            belief: 0,
            name: 0,
        }
        this.currentPlayerCreationStage = 0

        this.playerCreationStages = QUESTIONS

        this.currentMenu = new Menu(this.playerCreationStages[this.currentPlayerCreationStage].question)
        this.currentQuestion = this.playerCreationStages[this.currentPlayerCreationStage]

        this.currentQuestion.options.forEach( (opt,index) => {
            this.currentMenu.addOption(opt.txt, () => { 
                this.newPlayerSelections[this.currentQuestion.key] = index
                this.nextQuestion()
            })
        })
    }

    nextQuestion(){
        if( this.currentPlayerCreationStage + 1 < this.playerCreationStages.length){
            this.currentPlayerCreationStage += 1
            this.currentQuestion = this.playerCreationStages[this.currentPlayerCreationStage]
            this.currentMenu.terminate()
            this.currentMenu = new Menu(this.playerCreationStages[this.currentPlayerCreationStage].question)

            this.currentQuestion.options.forEach( (opt,index) => {
                this.currentMenu.addOption(opt.txt, () => { 
                    this.newPlayerSelections[this.currentQuestion.key] = index
                    this.nextQuestion()
                })
            })
        }
        else if (this.currentPlayerCreationStage + 1 === this.playerCreationStages.length){
            this.applySelectionsToStats()
            this.currentMenu.terminate()
            moveToEditChar(this.stats)
        }
    }

    applySelectionsToStats(){
        QUESTIONS.forEach( q => {
            const data = q.options[this.newPlayerSelections[q.key]] 
            for(let stat in data.changes){
                this.stats[stat] += data.changes[stat]
            }
        })

        for(let stat in this.stats){
            if(this.stats[stat] < 1){
                this.stats[stat] = 1
            }
        }
    }
}