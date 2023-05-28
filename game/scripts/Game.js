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
        this.pointsRequiredForGear = 100;
        this.pointsRequiredForBox = 70;
        this.start()
    }

    start(){
        this.player.gun.showAmmoInfo();
        window.scrollTo(this.player.x / 2, this.player.y / 2);
        this.rg.startRound()
        this.update()
    }

     update(){

        if (this.points >= this.pointsRequiredForBox && this.points !== 0 && !this.isGenerated ){
            this.generateBox()
            this.pointsRequiredForBox += 70;
            this.isGenerated = true;
        }

        if (this.points >= this.pointsRequiredForGear && this.points !== 0 && !this.isGearGenerated){
            this.generateGear()
            this.pointsRequiredForGear += 100;
            this.isGearGenerated = true;
        }

        this.boxes.forEach(item => item.checkCollision());

        this.rg.play();
        this.player.play();
        this.showPoints();
        if (!this.isRunning){
            this.gameOver()
        }else {
            window.requestAnimationFrame(() => this.update())
        }
    }

    showPoints(){
        document.querySelector("#points").innerHTML = `${this.points}`;
    }

    generateBox(){
            let boxNum = Math.floor(Math.random() * 4);
            if (boxNum === 0) this.boxes.push(new HealthBox());
            if (boxNum === 1) this.boxes.push(new AmmoBox());
            if (boxNum === 2) this.boxes.push(new AbilityBox());
            if (boxNum === 3) this.boxes.push(new SpeedBox());
    }

    generateGear(){
        let gear = JSON.parse(localStorage.getItem("gear"));
        for (let i = 0; i < gear.length; i++) {
            if (gear[i] === null && i >=6){
                gear[i] = this.gg.generateGear(1)[0];
                this.generateGearMessage(gear[i].name)
                break;
            }
        }
         localStorage.setItem("gear", JSON.stringify(gear))
    }

    generateGearMessage(name){
        let gearMessageEl = document.createElement("div");
        let gearIcon = document.createElement("img");
        let gearName = document.createElement("h1");
        gearMessageEl.style.display = "flex"
        gearMessageEl.setAttribute("class", "gearMessage")
        document.body.appendChild(gearMessageEl);

        gearIcon.src = `../gear/assets/icons/${name}.png`
        gearIcon.setAttribute("class", "gearImgIcon")
        gearMessageEl.appendChild(gearIcon)

        gearName.innerHTML = "New gear available!"
        gearName.setAttribute("class", "gearName")
        gearMessageEl.appendChild(gearName)

        setTimeout(() =>{
           gearMessageEl.style.display = "none"
        },2500)

        let gearMessageEls =Array.from(document.getElementsByClassName("gearMessage"));
        if ( gearMessageEls.length > 1){
            for (let i = 0; i < gearMessageEls.length - 1; i++) {
                gearMessageEls[i].style.display = "none"
            }

        }
    }

    gameOver(){
        let gameOver = document.getElementsByClassName("gameOver")[0];
        gameOver.style.display = "block"
        let vignette = document.getElementsByClassName("vignette")[0];
        vignette.style.backgroundImage = "radial-gradient(ellipse at center, rgba(0,0,0,0) 10%,  rgba(0,0,0,1) 100%)";
        this.checkHighScore()
        document.getElementById("playAgain").addEventListener("click",function (){
            location.reload()
        })
    }

    checkHighScore(){
        let highScore = document.getElementById("highScore");
        if (parseInt(localStorage.getItem("highScore")) < this.points){
            localStorage.setItem("highScore", `${this.points}`)
            highScore.innerHTML = `New high score: ${this.points}`;
        }else{
            highScore.innerHTML = `Actual score: ${this.points} <br> High score: ${localStorage.getItem("highScore")}`;
        }
    }
}