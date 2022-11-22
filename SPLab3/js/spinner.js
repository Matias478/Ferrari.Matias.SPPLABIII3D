import { enableButtons } from './form.js';

export function agregarSpinner() {
    let spinner = document.createElement("img");
    spinner.setAttribute("src", "../img/Cat licking paw.gif");
    spinner.setAttribute("alt", "imagen spinner");

    document.getElementById("spinner").appendChild(spinner);
    enableButtons(false);
}

export function eliminarSpinner() {
    enableButtons(true);
    document.getElementById("spinner").innerHTML = "";
}

export function agregarSpinnerPagPrincipal() {
    let spinner = document.createElement("img");
    spinner.setAttribute("src", "./img/Running deer.gif");
    spinner.setAttribute("alt", "imagen spinner");
    spinner.setAttribute("width","130px");

    document.getElementById("spinner").appendChild(spinner);
}

export function eliminarSpinnerPagPrincipal() {
    document.getElementById("spinner").innerHTML = "";
}

