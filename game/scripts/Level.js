class Level {

    constructor(levelNumber, numOfEnemies, typeOfEnemies, test) {
        this.levelNumber = levelNumber;
        this.numOfEnemeis = numOfEnemies;
        this.typeOfEnemies = typeOfEnemies;
        this.enemies = [];
        this.isNewLevel = false;

    }

    play(){


        if (this.enemies.length === 0 && !this.isNewLevel){
            game.level++;

            if (game.level >= levels.length){
                game.isRunning = false;
            }else {
                levels[game.level].startLevel();
            }
        }
    }

    startLevel(){

        for (let i = 0; i < this.numOfEnemeis; i++) {
            //let enemyIndex = Math.floor(Math.random() * enemies.length);
            this.enemies.push(new Enemy(Engine.randomPosition().x,Engine.randomPosition().y,50,2,3, 10));
        }

        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].spawn();
        }

        this.isNewLevel = false;
    }

    endLevel(){

    }

}