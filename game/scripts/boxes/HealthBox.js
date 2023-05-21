class HealthBox extends Box {
    constructor() {
        super("./assets/others/boxes/healthBox.jpg")
        this.hp = 50;
    }

    pickUp() {
        if ((game.player.hp + this.hp) > game.player.totalHp){
           game.player.hp += (game.player.totalHp - game.player.hp)
        }else{
            game.player.hp += this.hp;
        }
    }
}