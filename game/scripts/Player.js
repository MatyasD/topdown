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
        this.firstAbilityUsage = 3;
        this.isSecondAbilityUsed = false;
        this.secondAbilityUsage = 3;
        this.isSpeedDefault = true;
        this.el = document.querySelector("#player");
        this.img = document.getElementsByClassName("player-img")[0];
        this.healthEl = document.createElement("div");
        this.healthBar = document.createElement("div");
        this.start()
    }

    // Metoda volající všechny metody, které se opakují každý frame
    play() {
        this.move();
        this.bullets.forEach(item => item.moveToDirection());
        this.bullets.forEach(item => item.checkCollisions());
    }
    start(){
        this.createHealthBar()
        this.setAbilitiesUsage();
        this.setGear()
        this.setImg()
        this.setName()
    }

    createHealthBar(){
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
        let vignette = document.getElementsByClassName("vignette")[0]
        vignette.style.backgroundImage = "radial-gradient(ellipse at center, rgba(175,0,0,0) 0%, rgba(175,0,0,0.8) 100%)";
        if (this.hp <= 0){
           // document.querySelector("#game").remove();
            this.el.remove();
            game.gameOver()
        }

        setTimeout(function (){
            vignette.style.backgroundImage = "radial-gradient(ellipse at center, rgba(0,0,0,0) 0%,  rgba(0,0,0,0.8) 100%)";
        },150)
    }

    setGear(){

        let gear = JSON.parse(localStorage.getItem("gear")) ;

        if (gear !== null){
            for (let i = 0; i < 6 ; i++) {
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
        if (this.hp / (this.totalHp / 100) > 100){
            this.healthEl.style.width = "100%"
        }else{
            this.healthEl.style.width = `${this.hp / (this.totalHp / 100)}%`
        }
    }

    setImg(){
        this.img.src = this.path;
    }

    setName(){
        let nameEl = document.getElementById("name");
        nameEl.innerHTML = localStorage.getItem("char").charAt(0).toUpperCase() + localStorage.getItem("char").slice(1)
    }

    setAbilitiesUsage(){
        document.getElementById("qNum").innerHTML =`${this.firstAbilityUsage}`
        document.getElementById("eNum").innerHTML =`${this.secondAbilityUsage}`
    }

    firstAbility(){
        let firstAbilityBtn = document.getElementById("q");
        let firstAbilityBtnNum = document.getElementById("qNum");
        firstAbilityBtn.style.backgroundColor = "red";
        firstAbilityBtnNum.innerHTML = `${this.firstAbilityUsage - 1}`

        setTimeout( () =>{
            firstAbilityBtn.style.backgroundColor = "transparent";
        }, 2000)
    }

    secondAbility(){
        let secondAbilityBtn = document.getElementById("e");
        let secondAbilityBtnNum = document.getElementById("eNum");
        secondAbilityBtnNum.innerHTML = `${this.secondAbilityUsage - 1}`
        secondAbilityBtn.style.backgroundColor = "red";

        setTimeout( () =>{
            secondAbilityBtn.style.backgroundColor = "transparent";
        }, 5000)
    }

}
