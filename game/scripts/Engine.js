class Engine {

    static checkCollision(a, b) {
        return (a.getBoundingClientRect().right >= b.getBoundingClientRect().left && a.getBoundingClientRect().left <= b.getBoundingClientRect().right && a.getBoundingClientRect().bottom >= b.getBoundingClientRect().top && a.getBoundingClientRect().top <= b.getBoundingClientRect().bottom)
    }

    static randomPosition(){

        let x =  Math.floor(Math.random() * document.body.clientWidth);
        let y = Math.floor(Math.random() * document.body.clientHeight);

        (x > (document.body.clientWidth / 2)) ? x -= 600 : x += 600;
        (y > (document.body.clientHeight / 2)) ? y -= 600 : y += 600;

        return {x,y};
    }
}