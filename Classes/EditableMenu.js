export default class EditableMenu{
    constructor(canvas,options=[], offsetY, moveToMapSelector){

        this.availablePoints = 10
        this.maxPoints = 10

        this.options = options
        this.selectedOption = 0

        this.canvas = canvas
        this.w = canvas.width
        this.h = canvas.height
        this.ctx = canvas.getContext('2d')
        this.offsetY = offsetY

        this.moveToMapSelector = moveToMapSelector

        this.boundKeyboardControls = this.keyboardControls.bind(this)
        document.addEventListener('keydown', this.boundKeyboardControls)   

        this.drawMenu()
    }

    keyboardControls(e){
        if(e.key === "ArrowDown"){
            e.preventDefault()
            if(this.selectedOption + 1 < this.options.length){
                if(this.options[this.selectedOption+1].txt === "spacer"){
                    this.selectedOption += 2
                }
                else {
                    this.selectedOption += 1
                }
                this.drawMenu()
            }
        }else if(e.key === "ArrowUp"){
            e.preventDefault()
            if(this.selectedOption - 1 >= 0){
                if(this.options[this.selectedOption-1].txt === "spacer"){
                    this.selectedOption -= 2
                }
                else {
                    this.selectedOption -= 1
                }
                this.drawMenu()
            }
        }
        else if(e.key === "ArrowLeft"){
            if(this.options[this.selectedOption].current - 1 > 0){
                this.options[this.selectedOption].current -= 1
                this.availablePoints += 1
                this.options[this.selectedOption].mod = this.options[this.selectedOption].current - 3
                this.drawMenu()
            }
        }
        else if(e.key === "ArrowRight"){
            if(this.availablePoints <= 0) return
            if(this.options[this.selectedOption].current +1 <= this.options[this.selectedOption].max){
                this.options[this.selectedOption].current += 1
                this.availablePoints -= 1
                this.options[this.selectedOption].mod = this.options[this.selectedOption].current - 3
                this.drawMenu()
            }
        }
        else if(e.key === "Enter"){
            e.preventDefault()
            if(this.options[this.selectedOption].txt === "Finish" && this.availablePoints === 0){
                this.moveToMapSelector(this.options.filter( opt => opt.txt !== "Finish" && opt.txt !== "spacer"))
            }
        }   
    }
    
    showAvailablePoints(){
        const anchorX = this.w/2 + 60
        const anchorY = this.h/8 -10
        this.drawText(`(  points available: ${this.availablePoints} / ${this.maxPoints}  )`, 15, anchorX, anchorY, false, "yellow")
    }

    drawMenu(){
        const txtSize = 15
        const anchorX = this.w/2
        const anchorY = this.h/2 + this.offsetY
        let offsetX = 150
        let offsetY = 0
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(anchorX-250,anchorY-125,500,900)
        this.options.forEach( (opt,index) => {
            if(opt.txt === "spacer"){
                offsetY += 35
            }
            else if(opt.txt === "Finish"){
                const txtOffset = Math.floor(this.ctx.measureText(opt.txt).width/2)
                if(this.selectedOption === index){
                    this.drawText(opt.txt,txtSize,anchorX+txtOffset,anchorY+offsetY, true)
                }else{
                    this.drawText(opt.txt,txtSize,anchorX+txtOffset,anchorY+offsetY, false)
                }
            }
            else{
                if(this.selectedOption === index){
                    this.drawText(opt.txt,txtSize,anchorX,anchorY+offsetY, true)
                    this.drawText(opt.current,txtSize,anchorX+offsetX,anchorY+offsetY, true)
                    if(opt.mod < 0){
                        this.drawText(opt.mod,txtSize,anchorX+offsetX + 50 ,anchorY+offsetY, true, "red")
                    }else if(opt.mod > 0){
                        this.drawText(`+${opt.mod}`,txtSize,anchorX+offsetX + 50 ,anchorY+offsetY, true, "green")
                    }
                    offsetY += 35
                }else{
                    this.drawText(opt.txt,txtSize,anchorX,anchorY+offsetY)
                    this.drawText(opt.current,txtSize,anchorX+offsetX,anchorY+offsetY)
                    if(opt.mod < 0){
                        this.drawText(opt.mod,txtSize,anchorX+offsetX + 50 ,anchorY+offsetY, true, "red")
                    }else if(opt.mod > 0){
                        this.drawText(`+${opt.mod}`,txtSize,anchorX+offsetX + 50 ,anchorY+offsetY, true, "green")
                    }
                    offsetY += 35
                }
            }
        })
        this.showAvailablePoints()
    }

    drawText(txt, size, x ,y, selected, color){
        this.ctx.fillStyle = selected ? "white" : "#666"
        if(color) this.ctx.fillStyle = color
        this.ctx.font =  size + "pt Arial"
        const txtOffset = Math.floor(this.ctx.measureText(txt).width/2)
        const finalX = Math.floor(x) - txtOffset
        this.ctx.fillText(txt, finalX, Math.floor(y))
    }

    terminate(){
        document.removeEventListener('keydown', this.boundKeyboardControls)
    }
}