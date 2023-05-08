
const menu = document.querySelector(".menu")
const btnHrat = document.querySelector(".menu-hrat");
const btnPostavy = document.querySelector(".menu-postavy");

window.onload = () =>{
    menu.style.display = "block"
}


btnPostavy.addEventListener("click", function (){
    menu.style.display = "none";
})