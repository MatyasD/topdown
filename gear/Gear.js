class Gear{
    constructor(path, hp, speed, name) {
        this.path = path;
        this.el = document.createElement("img");
        this.items = document.getElementsByClassName("item");
        this.currEl = 0;
        this.hp = hp;
        this.speed = speed;
        this.name = name;

    }

    create(index){
        this.setItems();
        
        for (let i = 0; i < this.items.length; i++) {
            if (JSON.parse(localStorage.getItem("isFirstTime"))){

                    if (!this.items[i].hasChildNodes() && i >= 6){
                        console.log("if")
                        index = i;
                        this.currEl = this.items[index];
                        break
                    }

            }else if (index < 6 && this.items[index].classList.contains(`${this.name}`) ){


                    /*
                    if (this.items[index].hasChildNodes()){
                        index++
                    }
                    if (!this.items[index].classList.contains(`${this.name}`) && this.items[index].classList.contains(`equipped-gear`) && !this.items[index].hasChildNodes()){
                        index++;
                    } else{
                        if (!this.items[index].hasChildNodes()){
                            break
                        }
                    }

                     */


                this.currEl = this.items[index];
            }else{
                for (let i = 0; i < this.items.length; i++) {
                    if (!this.items[i].hasChildNodes() && i >= 6){
                        console.log("if")
                        index = i;
                        this.currEl = this.items[index];
                        break
                    }
                }
            }

        }


        this.el = document.createElement("img")
        this.el.src = this.path;
        this.el.setAttribute("class", "gear")
        this.el.setAttribute("draggable", "true")
        // this.el.setAttribute("title", "")

        console.log(this.currEl)
        this.currEl.appendChild(this.el)
    }

    setItems(){
        this.items = document.getElementsByClassName("item");
    }

}