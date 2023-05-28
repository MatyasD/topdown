class John extends Player {

        constructor(x, y, hp, gun, speed, path) {
            super(x, y, hp, gun, speed, path);
        }

    firstAbility() {

            if (!this.isFirstAbilityUsed && this.firstAbilityUsage > 0){
                if (keyPresses.q){
                    super.firstAbility();
                    this.speed  += 10;
                    this.isFirstAbilityUsed = true;
                    this.firstAbilityUsage--;
                }

                setTimeout( () =>{
                    this.speed -= 10;
                    this.isFirstAbilityUsed = false;
                }, 2000)
            }
    }

    secondAbility() {
            if (!this.isSecondAbilityUsed && this.secondAbilityUsage > 0){
                if (keyPresses.e){
                    super.secondAbility()
                    this.gun.damage *= 2;
                    this.isSecondAbilityUsed = true;
                    this.secondAbilityUsage--
                }

                setTimeout( () =>{
                    this.gun.damage /= 2;
                    this.isSecondAbilityUsed = false;
                }, 5000)
            }
    }
}