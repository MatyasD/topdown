class Joe extends Player {
    constructor(x, y, hp, gun, speed, path) {
        super(x, y, hp, gun, speed, path);
        this.defaultFireRate = this.gun.fireRate;
        this.defaultHp = null;
    }

    firstAbility() {
        if (!this.isFirstAbilityUsed && keyPresses.q){
            this.gun.fireRate  = 2;
            this.isFirstAbilityUsed = true;
        }

        setTimeout( () =>{
                this.gun.fireRate = this.defaultFireRate;qs
                }, 1000)

    }

    secondAbility() {
        if (!this.isSecondAbilityUsed && keyPresses.e){
            this.defaultHp = this.hp;
            this.hp = 999999;
            this.isSecondAbilityUsed = true;
            this.setHealthBar()
        }

        setTimeout( () =>{
            this.hp = this.defaultHp;
            this.setHealthBar()
        }, 5000)
    }

}