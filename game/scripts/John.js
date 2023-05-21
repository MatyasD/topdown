class John extends Player {

        constructor(x, y, hp, gun, speed, path) {
            super(x, y, hp, gun, speed, path);
        }




    firstAbility() {
        if (!this.isFirstAbilityUsed && keyPresses.q){
            this.speed  += 10;
            this.isFirstAbilityUsed = true;
        }

        setTimeout( () =>{
            this.speed -= 10;
        }, 2000)
    }

    secondAbility() {
        if (!this.isSecondAbilityUsed && keyPresses.e){
            this.gun.damage *= 2;
            this.isSecondAbilityUsed = true;
        }

        setTimeout( () =>{
            this.gun.damage /= 2;
        }, 3000)

    }



}