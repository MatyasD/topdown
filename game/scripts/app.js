window.onload = function () {
    update();
}

const bodyEl = document.body.getBoundingClientRect();
const bodyElCenter = {
    x: bodyEl.left + bodyEl.width / 2,
    y: bodyEl.top + bodyEl.height / 2
}

const characters = {}

if (localStorage.getItem("char") === "joe"){
    characters.joe = new Joe(bodyElCenter.x, bodyElCenter.y, 100, new Gun(30, 5, 100, 100, 10, 3, 15), 6, "assets/char1/char1.png")
}else if (localStorage.getItem("char") === "john"){
    characters.john = new John( bodyElCenter.x, bodyElCenter.y, 70, new Gun(7, 20, 1000, 30, 40, 5, 25), 4, "assets/char2/char2.png")
}

playerChar = characters[localStorage.getItem("char")];
let game = new Game(playerChar)

// Funkce volána jednou, hned po načtení stránky

game.start();

// Funkce volána každý frame
function update() {
    game.update();

    if (game.isRunning){
        window.requestAnimationFrame(update)
    }else {
        game.gameOver()
    }
}
