class HealthBox extends Box {
    constructor() {
        super("./assets/others/boxes/healthBox.jpg")

    }


    pickUp() {
        player.hp += 50;
    }
}