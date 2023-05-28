class Bullet {
    constructor(x, y, direction, speed) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.speed = speed;
        this.path = "assets/others/bullet.png";
        this.el = document.createElement("img");
    }

    // Vytvoření elementu bullet
    createBullet() {
        let body = document.querySelector("body");

        this.el.src = this.path;
        this.el.setAttribute("class", "bullet");
        this.el.setAttribute("draggable", "false")
        this.el.style.position = 'absolute';
        this.el.style.transform = `rotate(${angle}deg)`;

        body.appendChild(this.el);
    }

    // Metoda volající se každý frame, posouvá bullet
    moveToDirection() {

        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;

        this.el.style.top = `${this.y - (this.el.offsetHeight / 2)}px`;
        this.el.style.left = `${this.x - (this.el.offsetWidth / 2)}px`;

        if (((this.x - window.scrollX) - 1000) > 1000 || ((this.x + window.scrollX) + 1000) < -1000 || this.x < 10 || this.x > 3495) {
            this.el.remove();
            game.player.bullets.splice(game.player.bullets.findIndex(({ x }) => x === this.x), 1)
        } else if (((this.y - window.scrollY) - 1000) > 1000 || ((this.y + window.scrollX) + 1000) < -1000 || this.y < 10 || this.y > 2465) {
            this.el.remove();
            game.player.bullets.splice(game.player.bullets.findIndex(({ y }) => y === this.y), 1)
        }

    }

    async checkCollisions() {

        for (let i = 0; i < game.rg.enemies.length ; i++) {
            if (await Engine.checkCollision(this.el, game.rg.enemies[i].img)){
                this.el.remove()
                await this.dealDamage(game.rg.enemies[i])
            }
        }
    }

    dealDamage(target){
        target.hp -= game.player.gun.damage;

        if (target.hp <= 0){
            game.points += target.points;
            target.spawnBlood();
            target.el.remove();
            game.isGenerated = false;
            game.isGearGenerated = false;
            document.getElementById("enemies").innerHTML = `Enemies left: ${game.rg.enemies.length - 1}`
        }else{
            target.takeDamage();
        }
    }
}