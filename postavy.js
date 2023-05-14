

let gear = [new Gear("gear/assets/torso/basic.png", 40, 0, "torso"),new Gear("gear/assets/gloves/legendary.png", 20, 0, "gloves") ]
let itemCard = document.getElementsByClassName("item");

let currDragged;
let gearPos = {}

window.onload = () =>{
    if (localStorage.length === 0){
        for (let i = 0; i < itemCard.length; i++) {
            gearPos[i] = null;
        }
    }else{
        gearPos = JSON.parse(localStorage.getItem("gearPos"));
        for (let i = 0; i < gearPos.length; i++) {
            if (gearPos[i] !== null){
                itemCard[i].appendChild(gearPos[i].el)
            }
        }
    }
}



for (let i = 0; i < gear.length; i++) {
    gear[i].el.addEventListener("dragstart", function (e){
        currDragged = gear[i];
        setClasses()
    })
}

for (let i = 0; i < itemCard.length; i++) {
    itemCard[i].addEventListener("dragover", function (e){
        e.preventDefault()
    })

    itemCard[i].addEventListener("drop", function (e){
        if (itemCard[i].classList.contains(`${currDragged.name}`) || itemCard[i].classList.contains(`empty`)){
            itemCard[i].prepend(currDragged.el)

            for (let j = 0; j < Object.keys(gearPos).length; j++) {
                if (gearPos[j] && gearPos[j]["path"] === currDragged["path"]) {
                    gearPos[j] = null;
                    break;
                }
            }

            gearPos[i] = currDragged;
            console.log(gearPos)
            localStorage.removeItem('gearPos')
            localStorage.setItem('gearPos', JSON.stringify(gearPos));
            console.log(gearPos)
            console.log(localStorage)
            console.log("---")
        }
    })

}




function setClasses(){
    for (let i = 0; i < itemCard.length; i++) {


        if ( itemCard[i].hasChildNodes() ){
            itemCard[i].classList.remove("empty")
        }else if (!itemCard[i].classList.contains(`empty`)){
            itemCard[i].classList.add("empty")
            gearPos[i] = null;
            localStorage.removeItem('gearPos')
            localStorage.setItem('gearPos', JSON.stringify(gearPos));
        }
    }
}