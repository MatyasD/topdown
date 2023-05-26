class Game{
    constructor(player) {
        this.player = player;
        this.isRunning = true;
        this.points = 0;
        this.isGenerated = false;
        this.isGearGenerated = false;
        this.boxes =[];
        this.gg = new GearGenerator();
        this.rg = new RoundGenerator();
    }

    start(){
        this.player.gun.showAmmoInfo();
        window.scrollTo(this.player.x / 2, this.player.y / 2);
        this.rg.startRound()
    }

    update(){

        if (this.points % 10 === 0 && this.points !== 0 && !this.isGenerated ){
            this.generateBox()
            this.isGenerated = true;
        }

        if (this.points % 50 === 0 && this.points !== 0 && !this.isGearGenerated){
            console.log("genearting gear")
            this.generateGear()
            this.isGearGenerated = true;
        }

        this.boxes.forEach(item => item.checkCollision());

        this.rg.play();
        this.player.play();
        this.showPoints();
    }

    showPoints(){
        document.querySelector("#points").innerHTML = `${this.points}`;
    }

    generateBox(){
            let boxNum = Math.floor(Math.random() * 4);
            if (boxNum === 0) this.boxes.push(new HealthBox());
            if (boxNum === 1) this.boxes.push(new AmmoBox());
            if (boxNum === 2) this.boxes.push(new ShieldBox());
            if (boxNum === 3) this.boxes.push(new SpeedBox());
    }

    generateGear(){
        let gear = JSON.parse(localStorage.getItem("gear"));
        console.log("gear function")
        for (let i = 0; i < gear.length; i++) {
            console.log("gear loop")
            if (gear[i] === null && i >=6){
                console.log("if")
                console.log("calling")
                gear[i] = this.gg.generateGear(1)[0];
                this.generateGearMessage(gear[i].name)
                break;
            }
        }
         localStorage.setItem("gear", JSON.stringify(gear))


    }

    generateGearMessage(name){

        console.log("new elemnt")
        let gearMessageEl = document.createElement("div");
        let gearIcon = document.createElement("img");
        let gearName = document.createElement("h1");
        gearMessageEl.style.display = "flex"
        gearMessageEl.setAttribute("class", "gearMessage")
        document.body.appendChild(gearMessageEl);

        gearIcon.src = `../../gear/assets/icons/${name}.png` // problem u magazine
        gearIcon.setAttribute("class", "gearImgIcon")
        gearMessageEl.appendChild(gearIcon)

        gearName.innerHTML = "New gear available!"
        gearName.setAttribute("class", "gearName")
        gearMessageEl.appendChild(gearName)

        setTimeout(function (){
           gearMessageEl.style.display = "none"
        },2500)
    }

    gameOver(){
        let gameOver = document.getElementsByClassName("gameOver")[0];
        console.log(gameOver)
        gameOver.style.display = "block"
        let vignette = document.getElementsByClassName("vignette")[0];
        vignette.style.backgroundImage = "radial-gradient(ellipse at center, rgba(0,0,0,0) 10%,  rgba(0,0,0,1) 100%)";
    }
}