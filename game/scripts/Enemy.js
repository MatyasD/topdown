class Enemy {
    constructor(x, y, hp, damage, speed,points, randomBoost) {
        this.x = x;
        this.y = y;
        this.hp = hp;
        this.damage = damage;
        this.speed = speed;
        this.points = points;
        this.randomBoost = randomBoost;
        this.totalHp = hp;
        this.path = "assets/others/zombie.png";
        this.direction = 0;
        this.el = document.createElement("div");
        this.img = document.createElement("img");
        this.healthEl = document.createElement("div");
        this.healthBar = document.createElement("div");
        this.isDamageEnabled = true;
    }

    spawn(){

        let body = document.querySelector("body");

        this.img.src = this.path;
        this.img.setAttribute("class", "enemy");
        this.img.setAttribute("draggable", "false")
        this.el.style.position = 'absolute';

        body.appendChild(this.el);
        this.el.appendChild(this.img)

        this.healthBar.setAttribute("class", "enemyHealthBar");

        this.el.appendChild(this.healthBar);

        this.healthEl.setAttribute("class", "enemyHealth");
        this.healthBar.appendChild(this.healthEl);

    }

    moveToPlayer(){
        this.direction = Math.atan2(game.player.y - this.y, game.player.x - this.x);
        this.x += Math.cos(this.direction) * this.speed;
        this.y += Math.sin(this.direction) * this.speed;

        this.el.style.top = `${this.y - (this.el.offsetHeight / 2)}px`;
        this.el.style.left = `${this.x - (this.el.offsetWidth / 2)}px`;

        let playerX = game.player.x + 150/ 2;
        let playerY = game.player.y + 150 / 2;
        let enemyX = this.x + 200 / 2;
        let enemyY = this.y + 200 / 2;
        let enemyAngle = Math.atan2(playerY - enemyY, playerX - enemyX) * (180 / Math.PI);

        this.img.style.transform = `rotate(${enemyAngle}deg)`;
    }

    takeDamage(){
        this.healthEl.style.width = `${this.hp / (this.totalHp / 100)}px`
    }


    play(){
        this.moveToPlayer();
        if (Engine.checkCollision(this.img, game.player.el) && this.isDamageEnabled){
            this.isDamageEnabled = false;
            game.player.takeDamage(this.damage);

            setTimeout(() =>{
                this.isDamageEnabled = true;
            },1000)

        }
    }
}