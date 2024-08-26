import CONFIGS from "../CONFIGS.js"

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
        /* let wheelTicking = false
        document.addEventListener("wheel", (e) => {
        if (!wheelTicking) {
            window.requestAnimationFrame(() => {
            if(e.wheelDeltaY < 0){
                if(game.graphics.viewTileSize - 1 >= 5){
                    game.graphics.viewTileSize -= 1
                }
            }else{
                game.graphics.viewTileSize += 1
            }
            wheelTicking = false;
            });
        }
        wheelTicking = true;
        }); */

        document.addEventListener('keydown', function(e){
            switch(e.key){
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
                    game.movePlayer("left")
                    game.update()
                    break;
                case "ArrowRight":
                    game.movePlayer("right")
                    game.update()
                    break;
                case "ArrowUp":
                    game.movePlayer("up")
                    game.update()
                    break;
                case "ArrowDown":
                    game.movePlayer("down")
                    game.update()
                    break;
            }
        })

    }
}