export default class Controls{
    constructor(game){
        this.UP = false
        this.DOWN = false
        this.LEFT = false
        this.RIGHT = false

        this.createListeners(game)
    }

    createListeners(game){
        let wheelTicking = false
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
        });


        document.addEventListener('keydown', (e) => {
            switch(e.key){
                case "a":
                case "A":
                case "ArrowLeft":
                    this.LEFT = true
                    break;
                case "d":
                case "D":
                case "ArrowRight":
                    this.RIGHT = true
                    break;
                case "w":
                case "W":
                case "ArrowUp":
                    this.UP = true
                    break;
                case "s":
                case "S":
                case "ArrowDown":
                    this.DOWN = true
                    break;
            }
        })

        document.addEventListener('keyup', (e) => {
            switch(e.key){
                case "a":
                case "A":
                case "ArrowLeft":
                    this.LEFT = false
                    break;
                case "d":
                case "D":
                case "ArrowRight":
                    this.RIGHT = false
                    break;
                case "w":
                case "W":
                case "ArrowUp":
                    this.UP = false
                    break;
                case "s":
                case "S":
                case "ArrowDown":
                    this.DOWN = false
                    break;
            }
        })
    }
}