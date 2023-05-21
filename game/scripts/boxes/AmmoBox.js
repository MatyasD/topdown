class AmmoBox extends Box {
    constructor() {
        super("./assets/others/boxes/ammoBox.jpg")

    }

    pickUp() {
        game.player.gun.totalAmmo += 50;
        game.player.gun.showAmmoInfo();
    }
}