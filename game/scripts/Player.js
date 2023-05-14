class Player {
    constructor(x, y, hp, gun, speed) {
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.gun = gun;
        this.speed = speed;
        this.bullets = [];
        this.distances = {
            toLeft: 0,
            toRight: 0,
            toTop: 0,
            toBottom: 0,
        }
        this.totalHp = hp;
        this.el = document.querySelector("#player");
        this.setGear()
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
        this.healthBar.setAttribute("class", "playerHealthBar");

        document.body.appendChild(this.healthBar)

        this.healthEl.setAttribute("class", "playerHealth");
        this.healthBar.appendChild(this.healthEl);
    }

    move() {
        this.checkScrolling()
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
        this.healthEl.style.width = `${this.hp / (this.totalHp / 100)}%`
        if (this.hp <= 0){

            this.el.remove();
        }
    }

    setGear(){
        let gearPos = JSON.parse(localStorage.getItem("gearPos")) ;
        console.log(gearPos)
        if (gearPos !== null){
            for (let i = 0; i < 6 ; i++) {
                if (gearPos[i] !== null){
                    this.hp += gearPos[i].hp;
                    this.speed += gearPos[i].speed;
                }
            }
        }

    }

}
