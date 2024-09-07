export default class LogPanel{
    constructor(){
        this.panel = document.getElementById('log')
    }

    info(txt,important){
        if(important){
            this.msg(txt, "yellow")
        }else{
            this.msg(txt, "white")
        }
    }

    changeLastMsg(txt){
        if(this.panel.hasChildNodes()){
            this.panel.lastChild.innerText = this.addTimestamp(txt)
        }
    }

    msg(txt,color){
        const div = document.createElement('div')
        div.classList.add("logMsg",color)
        div.innerText = this.addTimestamp(txt)
        this.panel.append(div)
        this.panel.scrollTop = this.panel.scrollHeight;
    }

    addTimestamp(txt){
        const date = new Date()
        const [hour, minutes] = [
            date.getHours(),
            date.getMinutes(),
        ];
        let time = `[${("0" + hour).slice(-2)}:${("0" + minutes).slice(-2)}]: `
        return time + txt
    }
}
