window.onload= () =>{
    checkSize();
}

window.onresize = () =>{
    checkSize()
}

function checkSize(){
    if (window.innerHeight > window.innerWidth){
        document.body.style.display = "none";
        document.write("Use horizontally oriented device")
    }
}

const characters = {}

if (localStorage.getItem("char") === "joe"){
    characters.joe = new Joe(500, 500, 100, new Gun(30, 5, 100, 100, 10, 3, 15), 6, "assets/char1/char1.png")
}else if (localStorage.getItem("char") === "john"){
    characters.john = new John( 500, 500, 70, new Gun(7, 20, 1000, 30, 40, 5, 25), 4, "assets/char2/char2.png")
}

playerChar = characters[localStorage.getItem("char")];
let game = new Game(playerChar)
