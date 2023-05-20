const gg = new GearGenerator();

let gear = [];
let itemCard = document.getElementsByClassName("item");
let currDragged;
let currPos;

window.onload = () =>{

    if (localStorage.length === 0){
        gear = [...gg.generateGear(3)]
        localStorage.setItem("gear", JSON.stringify(gear))
        localStorage.setItem("isFirstTime", JSON.stringify(true))
    }else{
        localStorage.setItem("isFirstTime", JSON.stringify(false))
        gear = JSON.parse(localStorage.getItem("gear"))
        for (let i = 0; i < gear.length; i++) {
            if(gear[i] !== null || undefined){
                if (gear[i].name !== "weapon"){
                    gear[i] = Object.assign(new Gear(), gear[i]);
                }else{
                    gear[i] = Object.assign(new Magazine(), gear[i]);
                }
            }
        }
    }

    for (let i = 0; i < gear.length; i++) {
        if(gear[i] !== null || undefined){
            gear[i].create(i)
        }
    }
    setEvents();
}


function setEvents(){

    for (let i = 0; i < gear.length; i++) {
        if (gear[i] !== null || undefined){
            gear[i].el.addEventListener("dragstart", function (e){
                currDragged = gear[i];
                currPos = i;
            })
        }
    }

    for (let i = 0; i < itemCard.length; i++) {

        if (typeof gear[i] !== "object"){
            console.log(gear[i]);
            gear[i] = null;
        }

        itemCard[i].addEventListener("dragover", function (e){
            e.preventDefault()
        })

        itemCard[i].addEventListener("drop", function (e){

            if (itemCard[i].classList.contains(`empty`)){
                if (itemCard[i].classList.contains("equipped-gear") && itemCard[i].classList.contains(`${currDragged.name}`)  ){
                    setDraggedItem(i);
                }else if (!itemCard[i].classList.contains("equipped-gear")){
                    setDraggedItem(i);
                }
            }

        })
    }
}

function setDraggedItem(index){

    if ((currDragged !== null || undefined) && !itemCard[index].hasChildNodes() ){
        currDragged.el.parentElement.classList.add("empty");
        itemCard[index].prepend(currDragged.el);
        currDragged.el.parentElement.classList.remove("empty");
        gear[index] = currDragged;
        console.log(gear[currPos])
        gear[currPos] = null;
        localStorage.setItem("gear", JSON.stringify(gear))
    }

    setEvents()
}
