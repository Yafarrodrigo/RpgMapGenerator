import EditableMenu from "./EditableMenu.js"

export default class EditableStatsScreen{
    constructor(title, moveToMapSelector){
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
        this.drawText(title, 25, this.w/2, this.h/8 -50, true)

        this.subMenu = new EditableMenu(this.canvas, [], -325, moveToMapSelector)
    }

    addOption(txt, min, max, current){
        this.subMenu.options.push({txt, min, max, current, mod: 0})
        this.subMenu.drawMenu()
    }

    drawText(txt, size, x ,y, selected){
        this.ctx.fillStyle = selected ? "white" : "#666"
        this.ctx.font =  size + "pt Arial"
        const txtOffset = 0
        const finalX = Math.floor(x) - txtOffset
        this.ctx.fillText(txt, finalX, Math.floor(y))
    }

    terminate(){
        this.subMenu.terminate()
        this.canvas.remove()
    }
}