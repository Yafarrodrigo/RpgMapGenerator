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
        document.addEventListener('keydown', (e) => {
            if(this.lastKey !== e.key){
                this.lastKey = e.key
            }

            if(this.cooldown === true) return

            this.cooldown = true
            setTimeout(() => this.cooldown = false, 50)
            
            // moving controls
            if(game.mode === "moving player"){
                moveControls(game, e.key)
            }
            
            // save game
            if(e.key === "G" || e.key === "g"){
                if(this.cooldownSave === true){
                    game.log.info("saving in cooldown (once every 15s)")
                }else{
                    game.saveGame()
                    game.log.info("saving game...")
                    this.cooldownSave = true
                    setTimeout(() => this.cooldownSave = false, 15000)
                }
            }

            // open/close map
            if(e.key === "m" || e.key === "M"){
                if(this.cooldownMap === false){
                    this.cooldownMap = true
                    setTimeout(() => this.cooldownMap = false, 500)
    
                    if(game.mode === "open map"){
                        game.mode = "moving player"
                    }else{
                        game.mode = "open map"
                    }
                    game.update()
                }
            }
        })
    }
}

function moveControls(game, key){
    switch(key){
        case "ArrowLeft":
            game.movePlayer("left")
            break;
        case "ArrowRight":
            game.movePlayer("right")
            break;
        case "ArrowUp":
            game.movePlayer("up")
            break;
        case "ArrowDown":
            game.movePlayer("down")
            break;
    }
    game.update()
}