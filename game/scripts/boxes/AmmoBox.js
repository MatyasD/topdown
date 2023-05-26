class AmmoBox extends Box {
    constructor() {
        super("./assets/others/boxes/ammoBox.png")

    }

    pickUp() {
        game.player.gun.totalAmmo += 50;
        game.player.gun.showAmmoInfo();
    }
}