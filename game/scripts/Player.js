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
        this.el = document.querySelector("#player");
        this.setStats()
    }

    // Metoda volající všechny metody, které se opakují každý frame
    play() {
        this.showHp();
        this.move();
        this.bullets.forEach(item => item.moveToDirection());
        this.bullets.forEach(item => item.checkCollisions());

    }

    showHp() {
        let hpInfoEl = document.getElementById("hpInfoText").innerHTML = `${this.hp}`;
    }

    move() {
        this.checkScrolling()
        if (keyPresses.w && this.distances.toTop - 110 >= 0) this.y -= this.speed;
        if (keyPresses.s && this.distances.toBottom - 110 >= 0) this.y += this.speed;
        if (keyPresses.a && this.distances.toLeft - 110 >= 0) this.x -= this.speed;
        if (keyPresses.d && this.distances.toRight - 150 >= 0) this.x += this.speed;

        playerDiv.style.left = `${this.x}px`;
        playerDiv.style.top = `${this.y}px`;
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
        if (this.hp <= 0){

            this.el.remove();
        }
    }

    setStats(){
        let gearPos = JSON.parse(localStorage.getItem("gearPos")) ;
        console.log(gearPos)
    }

}
