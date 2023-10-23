//hizo una clase para darle estilo y seleccionar todos los btones comprar

let carrito = [];
//creo un array afuera para que cdo el evenhandler la consulte exista, (sino se setearia a cero)

function agregarCarrito(e){
    //console.log("Producto agregado al carrito", e.target);
    let hijo = e.target;
    let padre = hijo.parentNode;

    let nombreProducto = padre.querySelector("h5").innerText;

    let precioProducto = parseInt(padre.querySelector("p").innerText);
    
    let imgProducto = padre.querySelector("img").src;

    
    let productoExistente = carrito.find(producto => nombreProducto === producto.nombre);
    if (productoExistente){
        productoExistente.cantidad += 1;
        productoExistente.precio += precioProducto;
    } else{
        let producto = {
            nombre: nombreProducto,
            precio: precioProducto,
            img: imgProducto,
            cantidad: 1
        };

        carrito.push(producto)
    }
    mostrarCarrito();

    //sino cantidad seria el value del input, seria otro hijo
}

function mostrarCarrito(){
    let tabla = document.getElementById("tbody");

    tabla.innerHTML = "";
    //se vacia cada vez que vuelve a cargar el carrito
    for(let producto of carrito){

        let fila = document.createElement("tr");
        fila.innerHTML =`<td><img src=${producto.img}></td>
                        <td><p>${producto.nombre}</p></td>
                        <td><p>${producto.cantidad}</p></td>
                        <td><p>${producto.precio}</p></td>
                        <td><button class="btn btn-danger btnBorrarProducto">Borrar</button></td>`;
        tabla.append(fila);
    }

    let filaTotal = document.createElement("tr");
    let precioTotal = carrito.reduce((acumulador, producto) => acumulador + producto.precio, 0)

    
    filaTotal.innerHTML=`<td></td>
                        <td><p>TOTAL:</p></td>
                        <td></td>
                        <td><p>${precioTotal}</p></td>
                        <td></td>`
    tabla.append(filaTotal)       

    let btnBorrar = document.querySelectorAll(".btnBorrarProducto");
    
    for(let btn of btnBorrar) {
        btn.addEventListener("click", borrarProducto);
    }
}




function borrarProducto(e){
    let abuelo = e.target.parentNode.parentNode;
    

    let nombreProducto = abuelo.querySelector("p").innerText;

    carrito = carrito.filter(producto => producto.nombre !== nombreProducto);
    abuelo.remove();
    mostrarCarrito();
}


let btnCompra = document.querySelectorAll(".botonCompra");


for(let boton of btnCompra) {
    boton.addEventListener("click", agregarCarrito)
}

let miFormulario = document.getElementById("formDesc");
miFormulario.addEventListener("submit", validarFormulario);

function validarFormulario(e){

    e.preventDefault();
    document.getElementById("inputMail").value = "";
    let mje = document.getElementById("mjeSuscripcion");

    mje.innerText=`Hemos enviado el descuento a tu mail.
    No olvides revisar el correo no deseado.`
    
}

let formulario = document.getElementById("formContacto");
formulario.addEventListener("submit", contactar);

function contactar(e){

    e.preventDefault();
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("email").value = "";
    document.getElementById("textarea").value = "";

    let mjeContacto = document.getElementById("gracias");

    mjeContacto.innerText="Gracias por tu interés en contactarnos. Pronto recibirás nuestra respuesta."
    console.log("Gracias");    
}
