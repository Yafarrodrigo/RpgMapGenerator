export default class MainMenu{
    constructor(){
        this.options = []
        this.selectedOption = 0

        const canvas = document.getElementById('mainMenuCanvas')
        this.w = canvas.width
        this.h = canvas.height
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')

        this.boundKeyboardControls = this.keyboardControls.bind(this)
        document.addEventListener('keydown', this.boundKeyboardControls)
    }

    AddOption(name, func){
        const x =  Math.floor(this.w/2)
        let y
        if(this.options.length > 0){
            y = this.options[this.options.length-1].y + 35
        }else{
            y = Math.floor(this.h/2)
        }
        this.options.push({name,x,y,func})
        this.drawMenu()
    }

    keyboardControls(e){
        e.preventDefault()
        if(e.key === "ArrowDown"){
            if(this.selectedOption + 1 < this.options.length){
                this.selectedOption += 1
                this.drawMenu()
            }
        }else if(e.key === "ArrowUp"){
            if(this.selectedOption - 1 >= 0){
                this.selectedOption -= 1
                this.drawMenu()
            }
        }else if(e.key === "Enter"){
            this.options[this.selectedOption].func()
        } 
    }

    drawMenu(){
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(0,0,this.w,this.h)
        this.drawText("Main Menu", 25, this.w/2, this.h/3, true)
        this.options.forEach( (opt,index) => {
            if(this.selectedOption === index){
                this.drawText(opt.name,15,opt.x,opt.y, true)
            }else{
                this.drawText(opt.name,15,opt.x,opt.y)
            }
        })
    }

    drawText(txt, size, x ,y, selected){
        this.ctx.fillStyle = selected ? "white" : "#666"
        this.ctx.font =  size + "pt Arial"
        const txtOffset = Math.floor(this.ctx.measureText(txt).width/2)
        const finalX = Math.floor(x) - txtOffset
        this.ctx.fillText(txt, finalX, Math.floor(y))
    }

    terminate(){
        document.removeEventListener('keydown', this.boundKeyboardControls)
    }
}