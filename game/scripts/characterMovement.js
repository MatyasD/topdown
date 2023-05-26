let keyPresses = {};
let playerDiv = document.querySelector("#player")
let img = document.querySelector(".player-img");

window.addEventListener("keydown", function (e) {
    keyPresses[e.key] = true;
    if (e.key === "r") {
        game.player.gun.reload();
    }

    if (e.key === "q") {
        game.player.firstAbility();
    }

    if (e.key === "e") {
        game.player.secondAbility();
    }
})

window.addEventListener("keyup", function (e) {
    keyPresses[e.key] = false;
})

window.addEventListener("click", function (e) {
       // game.player.gun.shoot()
})

window.addEventListener("mousedown", function (e) {

        game.player.gun.shoot()

        shootInterval = setInterval(function () {
            game.player.gun.shoot()
        }, game.player.gun.fireRate)
})

window.addEventListener("mouseup", function (e) {
    clearInterval(shootInterval)

})

var imgCenter = {
    x: 0,
    y: 0
};

let mouseX;
let mouseY;
var angle = 0;
document.addEventListener("mousemove", function  (e){
    rotate(e)
})

function rotate(e){
    imgCenter = {
        x: img.getBoundingClientRect().left + (img.getBoundingClientRect().width + 45) / 2 + window.scrollX,
        y: img.getBoundingClientRect().top + img.getBoundingClientRect().height / 2 + window.scrollY
    };
    angle = Math.atan2(mouseX - imgCenter.x, - (mouseY - imgCenter.y)) * (180 / Math.PI);

    playerDiv.style.transform = `rotate(${angle}deg)`;

    mouseX = e.pageX;
    mouseY = e.pageY;
}



