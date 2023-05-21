class Player {
    constructor(x, y, hp, gun, speed, path) {
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.gun = gun;
        this.speed = speed;
        this.path = path;
        this.bullets = [];
        this.distances = {
            toLeft: 0,
            toRight: 0,
            toTop: 0,
            toBottom: 0,
        }
        this.totalHp = hp;
        this.isFirstAbilityUsed = false;
        this.isSecondAbilityUsed = false;
        this.isSpeedDefault = true;
        this.el = document.querySelector("#player");
        this.img = document.getElementsByClassName("player-img")[0];
        this.setGear()
        this.setImg()
        this.healthEl = document.createElement("div");
        this.healthBar = document.createElement("div");
        this.createHealthBar()
    }

    // Metoda volající všechny metody, které se opakují každý frame
    play() {
        this.move();
        this.bullets.forEach(item => item.moveToDirection());
        this.bullets.forEach(item => item.checkCollisions());

    }

    createHealthBar(){
        console.log("called" + this.gun.fireRate)
        this.healthBar.setAttribute("class", "playerHealthBar");

        document.body.appendChild(this.healthBar)

        this.healthEl.setAttribute("class", "playerHealth");
        this.healthBar.appendChild(this.healthEl);
    }

    move() {
        this.checkScrolling()

        if (keyPresses.c && this.isSpeedDefault){
            this.speed /=  5;
            this.isSpeedDefault = false;
            this.gun.bullSpread *=3;
        }else if (!keyPresses.c && !this.isSpeedDefault){
            this.speed *= 5;
            this.gun.bullSpread /= 3;
            this.isSpeedDefault = true;
        }

        if (keyPresses.w && this.distances.toTop - 110 >= 0) this.y -= this.speed;
        if (keyPresses.s && this.distances.toBottom - 110 >= 0) this.y += this.speed;
        if (keyPresses.a && this.distances.toLeft - 110 >= 0) this.x -= this.speed;
        if (keyPresses.d && this.distances.toRight - 150 >= 0) this.x += this.speed;

        this.el.style.left = `${this.x}px`;
        this.el.style.top = `${this.y}px`;
    }

    checkScrolling() {

        this.distances = {
            toLeft: this.x - window.scrollX + 75,
            toRight: window.innerWidth + window.scrollX - this.x - 75,
            toTop: this.y - window.scrollY + 75,
            toBottom: window.innerHeight + window.scrollY - this.y - 75,
        }

        if (this.distances.toLeft < 200) {
            window.scrollBy(-this.speed, 0)
        } else if (this.distances.toRight < 200) {
            window.scrollBy(this.speed, 0)
        }

        if (this.distances.toTop < 200) {
            window.scrollBy(0, -this.speed)
        } else if (this.distances.toBottom < 200) {
            window.scrollBy(0, this.speed)
        }
    }

    takeDamage(damage){
        this.hp -= damage;
        this.setHealthBar()
        if (this.hp <= 0){
            document.querySelector("#game").remove();
            this.el.remove();
        }
    }

    setGear(){

        let gear = JSON.parse(localStorage.getItem("gear")) ;

        if (gear !== null){
            for (let i = 0; i < 6 ; i++) {
                console.log(gear[i])
                if (gear[i] !== null){
                    if (i === 2){
                        this.gun.magSize += gear[i].magSize;
                        this.gun.leftInMag += gear[i].magSize
                        this.gun.bullSpread += gear[i].bullSpread;
                        this.gun.fireRate += gear[i].fireRate;
                        this.gun.totalAmmo += gear[i].totalAmmo;
                        this.gun.damage += gear[i].damage;
                        this.gun.reloadTime = gear[i].reloadTime;

                    }else{
                        this.hp += gear[i].hp;
                        this.speed += gear[i].speed;
                        this.totalHp += gear[i].hp;
                    }
                }
            }

        }
    }

    setHealthBar(){
        this.healthEl.style.width = `${this.hp / (this.totalHp / 100)}%`
    }

    setImg(){
        this.img.src = this.path;
    }

}
