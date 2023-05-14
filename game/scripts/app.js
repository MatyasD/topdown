window.onload = function () {
    update();
}

const bodyEl = document.body.getBoundingClientRect();
const bodyElCenter = {
    x: bodyEl.left + bodyEl.width / 2,
    y: bodyEl.top + bodyEl.height / 2
}

let healthBox = new HealthBox();

let game = new Game(new Player(bodyElCenter.x, bodyElCenter.y, 100, new Gun(30, 7, 100, 100, 10, 3), 10), 0)

// Funkce volána jednou, hned po načtení stránky

game.start();


// Funkce volána každý frame
function update() {
    game.update();


    if (game.isRunning){
        window.requestAnimationFrame(update)
    }
}
