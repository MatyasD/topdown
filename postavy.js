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

const gg = new GearGenerator();

let gear = [];
let itemCard = document.getElementsByClassName("item");
let currDragged;
let currPos;
let iconCard = document.getElementsByClassName("icon-img")
let trash = document.getElementsByClassName("discard")[0]


window.onload = () =>{

    if (localStorage.gear === undefined){
        localStorage.clear()

        gear[6] = gg.generateGear(1)[0];
        gear[7] = gg.generateGear(1)[0];
        gear[8] = gg.generateGear(1)[0];

        for (let i = 9; i < 22; i++) {
            gear[i] = null;
        }

        localStorage.setItem("gear", JSON.stringify(gear))
        localStorage.setItem("isFirstTime", JSON.stringify(true))
        localStorage.setItem("char", "joe")
        localStorage.setItem("highScore", "0")
        location.reload();
    }else{
        localStorage.setItem("isFirstTime", JSON.stringify(false))
        gear = JSON.parse(localStorage.getItem("gear"))
        for (let i = 0; i < gear.length; i++) {
            if(gear[i] !== null || undefined){
                if (gear[i].name !== "magazine"){
                    gear[i] = Object.assign(new Gear(), gear[i]);
                }else{
                    gear[i] = Object.assign(new Magazine(), gear[i]);
                }
            }
        }
    }

    let length = gear.length
    for (let i = 0; i < length; i++) {
        if(gear[i] !== null && gear[i] !== undefined && gear[i].length !== 0){
            gear[i].create(i)

            if (gear[gear[i].index] === null  ){
                gear[gear[i].index] = gear[i]
                gear[i] = null
            }
        }
    }
    localStorage.setItem("gear", JSON.stringify(gear))
    setEvents();
}


function setEvents(){
    setIcons()

    console.log("setEvents")
    for (let i = 0; i < gear.length; i++) {
        if (gear[i] !== null && gear[i] !== undefined && gear[i].length !== 0){
            gear[i].el.addEventListener("dragstart", function (e){
                currDragged = gear[i];
                currPos = i;
            })
        }
    }

    for (let i = 0; i < itemCard.length; i++) {

        if (typeof gear[i] !== "object"){
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
    trash.addEventListener("drop", function (){
        gear[currPos] = null;
        localStorage.setItem("gear", JSON.stringify(gear))
        trash.prepend(currDragged.el);
        trash.removeChild(trash.children[0])
    })

    trash.addEventListener("dragover", function (e){
        e.preventDefault()
    })
}

function setDraggedItem(index){

    if ((currDragged !== null && currDragged !== undefined) && !itemCard[index].hasChildNodes()){
        console.log("podminka 2")
        currDragged.el.parentElement.classList.add("empty");
        itemCard[index].prepend(currDragged.el);
        currDragged.el.parentElement.classList.remove("empty");
        gear[index] = currDragged;
        gear[currPos] = null;
        localStorage.setItem("gear", JSON.stringify(gear))
    }

    setEvents()
}

function setIcons(){
    for (let i = 0; i < 6; i++) {
        if (gear[i] !== null){
            iconCard[i].style.display = "none"
        }else {
            iconCard[i].style.display = "block"
        }
    }
}

document.getElementsByClassName("char1")[0].addEventListener("click", function (){
    if (localStorage.getItem("char") !== "joe"){
        localStorage.setItem("char", "joe")
        location.reload();
    }
})

document.getElementsByClassName("char2")[0].addEventListener("click", function (){
    if (localStorage.getItem("char") !== "john"){
        localStorage.setItem("char", "john")
        location.reload();
    }
})

let isClicked = false;
let inventory = document.getElementsByClassName("inventory")[0]
let controls = document.getElementsByClassName("controls")[0]
document.getElementById("controlsSwitch").addEventListener("click", function (){
    if (!isClicked){
        inventory.style.display = "none"
        controls.style.display = "block"
        isClicked = true;
    }else{
        inventory.style.display = "block"
        controls.style.display = "none"
        isClicked = false;
    }
})