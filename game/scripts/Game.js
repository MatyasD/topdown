class Game{
    constructor(player,level) {
        this.player = player;
        this.level = level;
        this.isRunning = true;
    }

    start(){
        this.player.showHp();
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
    }
}