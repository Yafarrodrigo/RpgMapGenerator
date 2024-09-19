export default class SimpleMenu{
    constructor(canvas,options=[]){

        this.options = options
        this.selectedOption = 0

        this.canvas = canvas
        this.w = canvas.width
        this.h = canvas.height
        this.ctx = canvas.getContext('2d')

        this.boundKeyboardControls = this.keyboardControls.bind(this)
        document.addEventListener('keydown', this.boundKeyboardControls)   

        this.drawMenu()
    }

    keyboardControls(e){
        if(e.key === "ArrowDown"){
            e.preventDefault()
            if(this.selectedOption + 1 < this.options.length){
                this.selectedOption += 1
            }
            else{
                this.selectedOption = 0
            }
            this.drawMenu()
        }else if(e.key === "ArrowUp"){
            e.preventDefault()
            if(this.selectedOption - 1 >= 0){
                this.selectedOption -= 1
            }else{
                this.selectedOption = this.options.length-1
            }
            this.drawMenu()
        }else if(e.key === "Enter"){
            e.preventDefault()
            if(this.options[this.selectedOption].func){
                this.options[this.selectedOption].func()
            }  
        }   
    }

    drawMenu(){
        const txtSize = 15
        const anchorX = this.w/2
        const anchorY = this.h/2
        let offsetY = 0
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(anchorX-250,anchorY-100,500,600)
        this.options.forEach( (opt,index) => {
            if(this.selectedOption === index){
                this.drawText(opt.txt,txtSize,anchorX,anchorY+offsetY, true)
            }else{
                this.drawText(opt.txt,txtSize,anchorX,anchorY+offsetY)
            }
            offsetY += 35
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