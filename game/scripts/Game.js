class Game{
    constructor(player,level) {
        this.player = player;
        this.level = level;
        this.isRunning = true;
        this.points = 0;
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

        this.player.play();
        levels[this.level].play();
        healthBox.checkCollision()
        this.showPoints();
    }

    showPoints(){
        document.querySelector("#points").innerHTML = `${this.points}`;
    }

}