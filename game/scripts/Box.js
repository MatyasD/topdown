class Box {
    constructor(path) {
        this.path = path;
        this.el = document.createElement("img");
        this.setPosition();
    }

    // Nastaví pozici boxu 
    setPosition() {
        let body = document.querySelector("body");

        this.el.src = this.path;
        this.el.setAttribute("class", "box");
        this.el.setAttribute("draggable", "false")
        this.el.style.position = 'absolute';
        this.el.style.left = `${Engine.randomPosition().x}px`;
        this.el.style.top = `${Engine.randomPosition().y}px`;
        body.appendChild(this.el);
    }

    // Kontrola, jestli hráč sebral box
    checkCollision() {

        if (Engine.checkCollision(this.el, game.player.el)) {
            this.pickUp()
            this.el.remove();
        }
    }
    // Volaní child methody
    pickUp() {
        this.pickUp();
    }
}