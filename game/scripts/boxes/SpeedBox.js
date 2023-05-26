class SpeedBox extends Box {
    constructor() {
        super("./assets/others/boxes/speedBox.png")
    }

    pickUp() {
        game.player.speed += 5;
        setTimeout(function (){
            game.player.speed -= 5;
        }, 10000)
    }
}