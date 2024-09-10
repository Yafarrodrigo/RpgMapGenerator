import SimpleMenu from "./SimpleMenu.js"

export default class MainMenu{
    constructor(){
        const canvas = document.getElementById('mainMenuCanvas')
        this.w = canvas.width
        this.h = canvas.height
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')

        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0,0,this.w,this.h)
        this.drawText("Main Menu", 25, this.w/2, this.h/3, true)

        this.subMenu = new SimpleMenu()
    }

    addOption(txt, func){
        this.subMenu.options.push({txt,func})
        this.subMenu.drawMenu()
    }

    drawText(txt, size, x ,y, selected){
        this.ctx.fillStyle = selected ? "white" : "#666"
        this.ctx.font =  size + "pt Arial"
        const txtOffset = Math.floor(this.ctx.measureText(txt).width/2)
        const finalX = Math.floor(x) - txtOffset
        this.ctx.fillText(txt, finalX, Math.floor(y))
    }

    terminate(){
        this.subMenu.terminate()
    }
}