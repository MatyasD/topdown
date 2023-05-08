class Gear{
    constructor(path) {
        this.path = path;
        this.el = document.createElement("img");
        this.items = document.getElementsByClassName("item");
        this.currEl = 0;
        this.create()
    }

    create(){
        if (localStorage.length === 0){
            for (let i = 0; i < this.items.length; i++) {
                if (!this.items[i].hasChildNodes()){
                    this.currEl = this.items[i];
                    break;
                }
            }
        }else{

            console.log("gearPos")
            let gearPos = JSON.parse(localStorage.getItem("gearPos"));

            for (let i = 0; i < Object.keys(gearPos).length ; i++) {
                if (gearPos[i] !== null){
                    console.log(gearPos)
                    if (gearPos[i]["path"] === this.path){
                        this.currEl = this.items[i];
                        break
                    }
                }


            }
        }


        this.el.src = this.path;
        this.el.setAttribute("class", "gear")
        this.el.setAttribute("draggable", "true")
        this.currEl.appendChild(this.el)
    }

}