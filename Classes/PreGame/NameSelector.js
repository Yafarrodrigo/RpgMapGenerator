import { moveToMapSelector } from "../../index.js"

export default class NameSelector{
    constructor(title, stats){
        const canvas = document.createElement('canvas')
        canvas.classList.add("menuCanvas")
        canvas.width = 1920
        canvas.height = 1080
        document.body.append(canvas)

        this.w = canvas.width
        this.h = canvas.height
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')

        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0,0,this.w,this.h)
        this.drawText(title, 25, this.w/2, this.h/3, true)

        this.stats = stats
        this.name = []

        this.boundKeyboardControls = this.keyboardControls.bind(this)
        document.addEventListener('keypress', this.boundKeyboardControls)  
        this.boundKeyboardExtraControls = this.keyboardExtraControls.bind(this)
        document.addEventListener('keydown', this.boundKeyboardExtraControls)  

        console.log("pass this stats to the mapSelector!", stats);
    }

    drawText(txt, size, x ,y, selected){
        this.ctx.fillStyle = selected ? "white" : "#666"
        this.ctx.font =  size + "pt Arial"
        const txtOffset = Math.floor(this.ctx.measureText(txt).width/2)
        const finalX = Math.floor(x) - txtOffset
        this.ctx.fillText(txt, finalX, Math.floor(y))
    }

    keyboardControls(e){
        const allowed = "abcdedfghijklmñnopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ"
        if(allowed.includes(e.key)){
            this.name.push(e.key)

            const txtWidth = this.ctx.measureText(this.name.join("")).width
            const txtOffset = Math.floor(txtWidth/2)

            const anchorX = this.w/2
            const anchorY = this.h/2
            this.ctx.fillStyle = "black"
            this.ctx.fillRect(anchorX-txtOffset,anchorY-25,txtWidth,50)
            this.drawText(this.name.join(""), 25,  anchorX, anchorY, false)
        }

        else if (e.key === "Enter"){
            this.stats.name = this.name.join("")
            const regex = new RegExp("[a-zA-Z]{4,}")
            if(regex.test(this.stats.name) === false){
                this.stats.name = "Unknown"
            }
            this.terminate()
            moveToMapSelector(this.stats, true)
        }
    }

    keyboardExtraControls(e){
        if(e.key === "Backspace"){

            const txtWidth = this.ctx.measureText(this.name.join("")).width
            const txtOffset = Math.floor(txtWidth/2)

            const anchorX = this.w/2
            const anchorY = this.h/2
            this.ctx.fillStyle = "black"
            this.ctx.fillRect(anchorX-txtOffset,anchorY-25,txtWidth,50)
            
            if(this.name.length - 1 >= 0){
                this.name.length = this.name.length-1
            }
            
            this.drawText(this.name.join(""), 25,  anchorX, anchorY, false)
        }
    }

    terminate(){
        document.removeEventListener('keypress', this.boundKeyboardControls)
        document.removeEventListener('keydown', this.boundKeyboardExtraControls)
        this.canvas.remove()
    }
}