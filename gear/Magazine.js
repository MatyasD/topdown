class Magazine extends Gear{
    constructor(path, magSize, bullSpread, fireRate, totalAmmo, damage, reloadTime) {
        super(path);
        this.magSize = magSize;
        this.bullSpread = bullSpread;
        this.fireRate = fireRate;
        this.totalAmmo = totalAmmo;
        this.damage = damage;
        this.reloadTime = reloadTime;
        this.name = "magazine"

    }
}