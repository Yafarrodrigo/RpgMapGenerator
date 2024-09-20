export default class Controls{
    constructor(game){
        this.cursorAt = {x:0,y:0}
        this.tileSelected = {x:0,y:0}
        this.lastKey = null
        this.createListeners(game)
        this.cooldown = false
        this.cooldownMap = false
        this.cooldownSave = false
    }

    createListeners(game){
        document.addEventListener('keydown', function(e){
            if(this.lastKey === e.key){
                console.log("nope!");
            }else{
                console.log(e.key);
                this.lastKey = e.key
                
            }

            if(this.cooldown === true) return

            this.cooldown = true
            setTimeout(() => this.cooldown = false, 50)
            
            if((e.key !== "m" && e.key !== "M") && game.mode === "open map") return
            switch(e.key){

                case "g":
                case "G":
                    if(this.cooldownSave === true){
                        game.log.info("saving in cooldown (once every 15s)")
                        return
                    }

                    this.cooldownSave = true
                    setTimeout(() => this.cooldownSave = false, 15000)

                    game.saveGame()
                    game.log.info("saving game...")
                    break;
            
                case "m":
                case "M":
                    if(this.cooldownMap === true) return

                    this.cooldownMap = true
                    setTimeout(() => this.cooldownMap = false, 250)

                    if(game.mode === "open map"){
                        game.mode = "moving player"
                    }else{
                        game.mode = "open map"
                    }
                    game.update()
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