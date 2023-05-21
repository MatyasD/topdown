class Game{
    constructor(player,level) {
        this.player = player;
        this.level = level;
        this.isRunning = true;
        this.points = 0;
        this.isGenerated = false;
        this.isGearGenerated = false;
        this.boxes =[];
        this.gg = new GearGenerator();
    }

    start(){
        this.player.gun.showAmmoInfo();
        window.scrollTo(this.player.x / 2, this.player.y / 2);
        levels[this.level].startLevel();
    }

    update(){
        if (levels[this.level].isNewLevel){
            levels[this.level].startLevel();
        }

        if (this.points % 10 === 0 && this.points !== 0 && !this.isGenerated ){
            this.generateBox()
            this.isGenerated = true;
        }

        if (this.points % 20 === 0 && this.points !== 0 && !this.isGearGenerated){
            console.log("podminka")
            this.generateGear()
            this.isGearGenerated = true;

        }

        this.boxes.forEach(item => item.checkCollision());

        this.player.play();
        levels[this.level].play();
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

        for (let i = 0; i < gear.length; i++) {
            if (gear[i] === null && i >=6){
                gear[i] = this.gg.generateGear(1)[0];
                break;
            }
        }
         localStorage.setItem("gear", JSON.stringify(gear))

    }

}