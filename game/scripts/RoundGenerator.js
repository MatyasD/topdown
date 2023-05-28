class RoundGenerator{
    constructor() {
        this.enemies = [];
        this.round = 1;
        this.isNewRound = true;
        this.isPlaying = false;
    }

    play(){
        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].play();
        }

        this.enemies = this.enemies.filter(enemy => enemy.hp > 0);

        if (this.enemies.length === 0 && this.isNewRound){
            this.round++;

                this.startRound()

        }
    }

    startRound(){
        this.isNewRound = false;
        setTimeout(()=>{
            this.enemies = []
            this.generateEnemies()
            let roundEl = document.getElementById("round");
            let enemiesEl = document.getElementById("enemies");

            roundEl.innerHTML = `Round: ${this.round}`;
            enemiesEl.innerHTML = `Enemies left: ${this.enemies.length}`;
            if (!this.isPlaying){
                this.play()
                this.isPlaying = false;
            }
        },1000)

    }

    generateEnemies(){
        for (let i = 0; i < this.round * 3 ; i++) {
            let enemyRarity = Math.floor(Math.random() * 60) + 1;
            if (enemyRarity <= 25){
                this.enemies.push(new Enemy("assets/others/zombie.png",Engine.randomPosition().x,Engine.randomPosition().y, enemyRarity * 2, enemyRarity, 4, Math.round(Math.round(enemyRarity / 2 ) / 10) * 10, 130 ))
            }
            if(enemyRarity <= 55 && enemyRarity > 25){
                this.enemies.push(new Enemy("assets/others/zombie1.png",Engine.randomPosition().x,Engine.randomPosition().y, enemyRarity, enemyRarity / 2, enemyRarity / 3.5, Math.round(Math.round(enemyRarity / 2 ) / 10) * 10, 80 ))
            }
            if(enemyRarity > 55){
                this.enemies.push(new Enemy("assets/others/zombie2.png",Engine.randomPosition().x,Engine.randomPosition().y, enemyRarity * 10, enemyRarity / 2, enemyRarity / 20, Math.round(enemyRarity / 10) * 10, 170 ))
            }
        }
        this.isNewRound = true;
    }
}