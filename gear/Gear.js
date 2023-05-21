class Gear{
    constructor(path, hp, speed, name) {
        this.path = path;
        this.el = document.createElement("img");
        this.items = document.getElementsByClassName("item");
        this.currEl = 0;
        this.hp = hp;
        this.speed = speed;
        this.name = name;
        this.index = 0;
    }

    create(index){
        this.setItems();
        this.index = index;

        for (let i = 0; i < this.items.length; i++) {
            if (JSON.parse(localStorage.getItem("isFirstTime"))){
                console.log(this.path + " if ")
                    if (!this.items[i].hasChildNodes() && i >= 6){
                        console.log("if")
                        this.index = i;
                        this.currEl = this.items[this.index];
                        break
                    }

            }else if (this.index < 6 && this.items[this.index].classList.contains(`${this.name}`)  ){
                console.log(this.path + " else if")

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


                this.currEl = this.items[this.index];
            }else{
                console.log(this.path + " else ")
                for (let i = 0; i < this.items.length; i++) {
                    if (!this.items[i].hasChildNodes() && i >= 6){
                        console.log("if")
                        this.index = i;
                        this.currEl = this.items[this.index];
                        break
                    }
                }
            }

        }



        this.el = document.createElement("img")
        this.el.src = this.path;
        this.el.setAttribute("class", "gear")
        this.el.setAttribute("draggable", "true")
        if (this instanceof Magazine){
            this.el.setAttribute("title", `Mag Size: +${this.magSize}\nBullet Spread: ${this.bullSpread}\nFire Rate: ${this.fireRate}\nAmmo: +${this.totalAmmo}\nDamage: +${this.damage}\nReload Time: ${this.reloadTime}`)
        }else if (this.speed === 0){
            this.el.setAttribute("title", `Hp: ${this.hp}`)
        }else{
            this.el.setAttribute("title", `Hp: ${this.hp}\nSpeed: ${this.speed}`)
        }


        console.log(this.currEl)
        this.currEl.appendChild(this.el)
    }

    setItems(){
        this.items = document.getElementsByClassName("item");
    }



}