import {validarCampoVacio,validarCantCaracteres,validarCampoPrecio} from "./validaciones.js";
import {createTable,updateTable} from "./tablaDinamica.js";

import {formData,hideButtons,showButtons,updateForm} from "./form.js";
import {agregarSpinner,eliminarSpinner} from "./spinner.js";

import {traerAnunciosFetchAsync,borrarAnuncioFetchAsync,modificarAnunciosFetch,crearAnuncioFetch} from "./fetch.js";

let localData;
const $formulario = document.forms[0];
const controles = $formulario.elements;
const btnFiltrarTodos=document.getElementById("btnFiltroTodos");
const btnFiltrarPerros = document.getElementById("btnFiltroPerros");
const btnFiltrarGatos = document.getElementById("btnFiltroGatos");
const txtPromedio = document.getElementById("txtPromedio");
const cBoxs = document.querySelectorAll(".cBox");


window.addEventListener("load", loadPageHandler());
async function loadPageHandler() {
    //cargo anuncios
    try {
        agregarSpinner();
        localData = await traerAnunciosFetchAsync();    
    }
    catch (err) {
        console.error(err);
    }
    finally {
        eliminarSpinner();
    }

    //manejador del click
    document.addEventListener("click", ManejadorClick);

    //cargar lista
    if (localData.length > 0) {
        updateTable(localData);
    }

    //manejador del submit
    $formulario.addEventListener("submit", ManejadorSubmit);

    //botones filtros
    btnFiltrarTodos.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            agregarSpinner();
            filtroTodos(await traerAnunciosFetchAsync());
        } catch (err) {
            console.log(err);
        }
        finally {
            eliminarSpinner();
        }
    });

    //botones filtros
    btnFiltrarGatos.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            agregarSpinner();
            filtroGatos(await traerAnunciosFetchAsync());
        } catch (err) {
            console.log(err);
        }
        finally {
            eliminarSpinner();
        }
    })

    //botones filtros
    btnFiltrarPerros.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            agregarSpinner();
            filtroPerros(await traerAnunciosFetchAsync());
        } catch (err) {
            console.log(err);
        }
        finally {
            eliminarSpinner();
        }
    });

    //botones filtros
    cBoxs.forEach(el => { mapearTabla(el, localData); });

    checkBoxes();
}

for (let index = 0; index < controles.length; index++) {
    const control = controles.item(index);
    if(control.matches("input")){
        if(control.matches("[type=text]")){
            control.addEventListener("blur", validarCampoVacio);
            control.addEventListener("blur",validarCantCaracteres);
            if(control.matches("[type=number]")){
                control.addEventListener("blur", validarCampoPrecio);
            }
        }
    }
}

async function ManejadorClick(e){
    if (e.target.matches("td")) {
        showButtons();
        updateForm(e.target.parentElement, $formulario.elements);
    }
    if (e.target.matches("#btnCancelar")) {
        hideButtons();
    }
    if (e.target.matches("#btnEliminar")) {
        let id = $formulario.elements.formId.value;
        try {
            agregarSpinner()
            await borrarAnuncioFetchAsync(id);
            localData = await traerAnunciosFetchAsync();
            updateTable(localData);
        } catch (error) {
            console.error(err);
        }
        finally{
            hideButtons();
            eliminarSpinner();
            $formulario.reset();
        }
    }
}

async function ManejadorSubmit(e) {
    e.preventDefault();

    try {
        const formAnuncio = formData($formulario.elements);
        formAnuncio.id == '' ?  crearAnuncioFetch(formAnuncio) :  modificarAnunciosFetch(formAnuncio);
        agregarSpinner();
        localData = await traerAnunciosFetchAsync();
        updateTable(localData);
    } catch (err) {
        console.log(err);
    }
    finally {
        hideButtons();
        eliminarSpinner();
        $formulario.reset();
    }
}

function filtroTodos(listAux) {  
    txtPromedio.value = "N/A";
    cBoxs.forEach( el  =>  { mapearTabla( el, listAux ); });
    updateTable(listAux);    
}

function filtroGatos(listAux) {
    cBoxs.forEach(el => { el.checked = true; });
    const anunciosGatos = listAux.filter(an => an.animal === 'Gato');

    const precios = anunciosGatos.map(an => parseInt(an.precio));
    const totalPrecios = precios.reduce((acc, an) => acc + an, 0);
    const resultado = Math.round(totalPrecios / precios.length);

    txtPromedio.value = resultado;

    cBoxs.forEach(el => { mapearTabla(el, anunciosGatos); });
    updateTable(anunciosGatos);
}

function filtroPerros(listAux) {
    cBoxs.forEach(el => { el.checked = true; });
    const anunciosPerros = listAux.filter( an => an.animal === 'Perro' );
    
    const precios = anunciosPerros.map( an => parseInt( an.precio ));
    const totalPrecios = precios.reduce( ( acum, val ) => acum + val, 0); 
    const resultado = Math.round (totalPrecios / precios.length);
    txtPromedio.value = resultado;
  
    cBoxs.forEach( el  =>  { mapearTabla( el, anunciosPerros ); });
    
    updateTable(anunciosPerros);
  
}

async function mapearTabla(cbox, anunciosAux) {
    cbox.addEventListener('click', async() => { 
            let listAux = anunciosAux.map( anuncio => {
            let auxObj = {};  
            for (const key in anuncio) {
                /*if (document.getElementById('cBox'+key).checked){
                }*/
                auxObj[key] = anuncio[key];
            }
            return auxObj;
        })
        updateTable(listAux);
    });
};


function checkBoxes()
{
    for (let index = 0; index < cBoxs.length; index++) {
        const element = cBoxs[index];
        
        if(cBoxs.checked)
        {
            switch(element.id){
                case"cBoxtitulo":
                        console.log("hola");
                break;
            }
        }
    }
}



