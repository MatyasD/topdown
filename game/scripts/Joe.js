class Joe extends Player {
    constructor(x, y, hp, gun, speed, path) {
        super(x, y, hp, gun, speed, path);
        this.defaultFireRate = this.gun.fireRate;
        this.defaultHp = null;
    }

    firstAbility() {
        if (!this.isFirstAbilityUsed && this.firstAbilityUsage > 0){
            if (keyPresses.q){
                super.firstAbility()
                this.gun.fireRate  = 2;
                this.isFirstAbilityUsed = true;
                this.firstAbilityUsage--;
            }

            setTimeout( () =>{
                this.gun.fireRate = this.defaultFireRate;
                this.isFirstAbilityUsed = false;
            }, 2000)
        }


    }

    secondAbility() {
        if (!this.isSecondAbilityUsed && this.secondAbilityUsage > 0){
            if (keyPresses.e){
                super.secondAbility()
                this.defaultHp = this.hp;
                this.hp = 999999;
                this.isSecondAbilityUsed = true;
                this.setHealthBar()
                this.secondAbilityUsage--;
            }

            setTimeout( () =>{
                this.hp = this.defaultHp;
                this.setHealthBar();
                this.isSecondAbilityUsed = false;
            }, 5000)
        }


    }
}