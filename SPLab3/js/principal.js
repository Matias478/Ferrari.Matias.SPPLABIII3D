import {agregarSpinnerPagPrincipal, eliminarSpinnerPagPrincipal} from "./spinner.js";

const URL = " http://localhost:3000/anuncios";
let localData;
let article;


const traerDatosAjax=(callback)=>{
    agregarSpinnerPagPrincipal();
    const peticion = new XMLHttpRequest();
    peticion.addEventListener("readystatechange", ()=>{
        if(peticion.readyState==4){
            if(peticion.status>=200&&peticion.status<300){
                const data = JSON.parse(peticion.responseText);
                callback(data);
            }else{
                console.error(`Error: ${peticion.status} - ${peticion.statusText}`);
            }
            eliminarSpinnerPagPrincipal();
        }
    });
    peticion.open("GET",URL);
    peticion.send();
}

window.addEventListener("load", loadPageHandler());

async function loadPageHandler() {
    try {           
        traerDatosAjax((datos)=>{
            localData = datos;            
            console.log("cargando anuncios", localData);            
            localData.forEach(item => {
                createDivs(item);
            });
          });        
    } catch (err) {
        console.error(err);
    }

    article = document.querySelector("#articles");    
    article.classList.add("row");
    article.classList.add("row-cols-1");
    article.classList.add("row-cols-md-4");
    article.classList.add("g-4");
    article.style.margin = "0.5rem";
}

function createDivs(item) {
    const div = document.createElement("div");
    div.classList.add("col");    
    div.classList.add("text-white");
    div.className = "article";

    const card = document.createElement("div");
    card.classList.add("card");    
    card.classList.add("text-center");           
    card.classList.add("border");
    card.classList.add("rounded");

    const divBody = document.createElement("div");
    divBody.classList.add("card-body");
    divBody.style.padding = "0.75rem";

    const title = document.createElement("h2");
    title.classList.add("card-title");
    title.innerHTML = item.titulo;

    const description = document.createElement("p");
    description.classList.add("card-text");
    description.innerHTML = item.descripcion;

    const price = document.createElement("p");
    price.id = "price";
    price.innerHTML = "$" + item.precio;

    const raza = document.createElement("p");
    raza.style.display = "inline";
    raza.innerHTML = item.raza;

    const fecha = document.createElement("p");
    fecha.style.display = "inline";
    fecha.innerHTML = item.fechaNacimiento;

    const vacuna = document.createElement("p");
    vacuna.style.display = "inline";    
    vacuna.innerHTML = item.vacuna;


    const razaIcon = document.createElement("img");
    razaIcon.src = "./img/razaicono.png";
    razaIcon.style.margin = "5px";
    razaIcon.classList.add("iconsPagPrincipal");
    const fechaIcon = document.createElement("img");
    fechaIcon.src = "./img/cigueña.png";
    fechaIcon.style.margin = "5px";
    fechaIcon.classList.add("iconsPagPrincipal");
    const vacunaIcon = document.createElement("img");
    vacunaIcon.src = "./img/sangre.png";
    vacunaIcon.style.margin = "5px";
    vacunaIcon.classList.add("iconsPagPrincipal");


    const boton = document.createElement("button");//??
    boton.id = "btnCancelar";
    boton.className = "formButton";        
    boton.innerHTML = "Ver Mascota";


    divBody.appendChild(title);
    divBody.appendChild(description);
    divBody.appendChild(price);
    divBody.appendChild(razaIcon);
    divBody.appendChild(raza);
    divBody.appendChild(fechaIcon);
    divBody.appendChild(fecha);
    divBody.appendChild(vacunaIcon);
    divBody.appendChild(vacuna);
    //div.appendChild(boton);

    card.appendChild(divBody);
    card.appendChild(boton);
    div.appendChild(card);
    article.appendChild(div);
}