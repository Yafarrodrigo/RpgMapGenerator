export default class Controls{
    constructor(game){
        this.UP = false
        this.DOWN = false
        this.LEFT = false
        this.RIGHT = false

        this.moveUP = false
        this.moveDOWN = false
        this.moveLEFT = false
        this.moveRIGHT = false

        this.cursorAt = {x:0,y:0}
        this.tileSelected = {x:0,y:0}

        this.createListeners(game)
    }

    createListeners(game){
        document.addEventListener('keyup', function(e){
            switch(e.key){
                case "a":
                case "A":
                    this.LEFT = false
                    break;
                case "d":
                case "D":
                    this.RIGHT = false
                    break;
                case "w":
                case "W":
                    this.UP = false
                    break;
                case "s":
                case "S":
                    this.DOWN = false
                    break;
            }
        })
        document.addEventListener('keydown', function(e){
            if((e.key !== "m" && e.key !== "M") && game.mode === "moving camera") return
            switch(e.key){
                case "m":
                case "M":
                    if(game.mode === "moving camera"){
                        game.mode = "moving player"
                    }else{
                        game.mode = "moving camera"
                    }
                    game.update()
                    break;
                case "a":
                case "A":
                    this.LEFT = true
                    break;
                case "d":
                case "D":
                    this.RIGHT = true
                    break;
                case "w":
                case "W":
                    this.UP = true
                    break;
                case "s":
                case "S":
                    this.DOWN = true
                    break;
                case "ArrowLeft":
                    if(game.mode === "moving player"){
                        game.movePlayer("left")
                    }
                    game.update()
                    break;
                case "ArrowRight":
                    if(game.mode === "moving player"){
                        game.movePlayer("right")
                    }
                    game.update()
                    break;
                case "ArrowUp":
                    if(game.mode === "moving player"){
                        game.movePlayer("up")
                    }
                    game.update()
                    break;
                case "ArrowDown":
                    if(game.mode === "moving player"){
                        game.movePlayer("down")
                    }
                    game.update()
                    break;
            }
        })

    }
}