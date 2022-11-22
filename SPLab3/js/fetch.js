
const URL = "http://localhost:3000/anuncios";
//Async
export const traerAnunciosFetchAsync = async()=>{
    try {
        const res = await fetch(URL);
        if(res.ok){
            const data = await res.json();
            return data;
        }else{
            return Promise.reject(`${res.status} - ${res.statusText}`);
        }
    } catch (error) {
        console.error(error);
    }
}
export const borrarAnuncioFetchAsync = async(id)=>{
    try {
        const res = fetch(`${URL}/${id}`,{method: "DELETE"});
        if(!res.ok){
            throw new Error("Error!!!!");
        }
    } catch (error) {
        console.error(error);
    }
}

//Promises
export const crearAnuncioFetch = (nuevoAnuncio)=>{
    fetch(URL,{
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoAnuncio),
    })
    .then((res)=>{
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status} - ${res.statusText}`);
    })
    .then((data)=>{
        console.log(data);
    })
    .catch((err)=>{
        console.error(err);
    })
}

export const modificarAnunciosFetch = (anuncioModificar)=>{
    fetch(`${URL}/${anuncioModificar.id}`,{ 
        method:"PUT",
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify(anuncioModificar),
    })
    .then((res)=>{
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status} - ${res.statusText}`);
    })
    .then(data=>console.log(data))
    .catch((err)=>{
        console.error(err);
    })
}