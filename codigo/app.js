document.addEventListener('DOMContentLoaded', () => {

    
    const baseDeDatos = [
        {
            id: 1,
            nombre: 'Papa Negra x 1Kg',
            precio: 869,
            imagen: "https://ardiaprod.vtexassets.com/arquivos/ids/264918-1200-auto?v=638322430369070000&width=1200&height=auto&aspect=true"
        },
        {
            id: 2,
            nombre: 'Cebolla x 1Kg',
            precio: 249,
            imagen: "https://ardiaprod.vtexassets.com/arquivos/ids/264947-1200-auto?v=638322430881730000&width=1200&height=auto&aspect=true"
        },
        {
            id: 3,
            nombre: 'Tomate x 1Kg',
            precio: 629,
            imagen: "https://carrefourar.vtexassets.com/arquivos/ids/266903-1200-auto?v=638056132090200000&width=1200&height=auto&aspect=true"
        },
        {
            id: 4,
            nombre: 'Zanahoria x 1Kg',
            precio: 269,
            imagen: "https://carrefourar.vtexassets.com/arquivos/ids/204815/2304748000000_02.jpg?v=637601374832230000"
        },
        {
            id: 5,
            nombre: 'Lechuga x 1Kg',
            precio: 269,
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsUDN2VJTCDGxi4K8GeHnze0Kyy6G17x24HBhtXY85fSx_N-rod0qOqX6Bv5JcY75F7XE&usqp=CAU"
        },

        {
            id: 6,
            nombre: 'Pimiento Rojo x 1Kg',
            precio: 2299,
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJvqb6_BimD-lwioiYuibgwcwqSbk8OiaZN3ScAueJSB5YhnJgV2pkQaV7Yz45P8_aS1E&usqp=CAU"
        },
        {
            id: 7,
            nombre: 'Choclo x 1Kg',
            precio: 279,
            imagen: "https://d1on8qs0xdu5jz.cloudfront.net/webapp/images/productos/b/0000002000/2380.jpg"
        },
        {
            id: 8,
            nombre: 'Coliflor x 1Kg',
            precio: 899,
            imagen: "https://comprafruta.es/185-large_default/coliflor.jpg"
        },
        {
            id: 9,
            nombre: 'Berenjena x 1Kg',
            precio: 1499,
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_ZZl1NtQ_jlypfM2-didZIe7BK6qIsMYTosVbebGJ9ay8yYl0CJgC6S8cmISnhY8UfVM&usqp=CAU"
        },
        
    ];


    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage;
       
    
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            
            const elementoProducto = document.createElement('div');
            elementoProducto.classList.add('card', 'col-sm-4');
            
            const productoCardBody = document.createElement('div');
            productoCardBody.classList.add('card-body');
            
            const productoTitulo = document.createElement('h5');
            productoTitulo.classList.add('card-title');
            productoTitulo.textContent = info.nombre;
            
            const productoImagen = document.createElement('img');
            productoImagen.classList.add('img-fluid');
            productoImagen.setAttribute('src', info.imagen);
            
            const productoPrecio = document.createElement('p');
            productoPrecio.classList.add('card-text');
            productoPrecio.textContent = `${info.precio}${divisa}`;
            
            const productoBoton = document.createElement('button');
            productoBoton.classList.add('btn', 'btn-primary');
            productoBoton.textContent = '+';
            productoBoton.setAttribute('marcador', info.id);
            productoBoton.addEventListener('click', agregarProductoAlCarrito);
            
            productoCardBody.appendChild(productoImagen);
            productoCardBody.appendChild(productoTitulo);
            productoCardBody.appendChild(productoPrecio);
            productoCardBody.appendChild(productoBoton);
            elementoProducto.appendChild(productoCardBody);
            DOMitems.appendChild(elementoProducto);
        });
    }

    
    function agregarProductoAlCarrito(evento) {        
        carrito.push(evento.target.getAttribute('marcador'))        
        renderizarCarrito();        
        guardarCarritoEnLocalStorage();
    }

    
    function renderizarCarrito() {
        DOMcarrito.textContent = '';        
        const carritoSinDuplicados = [...new Set(carrito)];        
        carritoSinDuplicados.forEach((item) => {            
            const ItemCarrito = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });            
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                return itemId === item ? total += 1 : total;
            }, 0);
            

            const elementoProducto = document.createElement('li');
            elementoProducto.classList.add('list-group-item', 'text-right', 'mx-2');
            elementoProducto.textContent = `${numeroUnidadesItem} x ${ItemCarrito[0].nombre} - ${ItemCarrito[0].precio}${divisa}`;
  
            
            const botonRestar = document.createElement('button');
            botonRestar.classList.add('btn', 'btn-warning', 'mx-5');
            botonRestar.textContent = '-';
            botonRestar.dataset.item = item;
            botonRestar.addEventListener('click', restarItemCarrito);

            
            const botonBorrar = document.createElement('button');
            botonBorrar.classList.add('btn', 'btn-danger', 'mx-5');
            botonBorrar.textContent = 'X';
            botonBorrar.style.marginLeft = '1rem';
            botonBorrar.dataset.item = item;
            botonBorrar.addEventListener('click', borrarItemCarrito);
            

            elementoProducto.appendChild(botonRestar);
            elementoProducto.appendChild(botonBorrar);
            DOMcarrito.appendChild(elementoProducto);
        });
        
        const botonPagar = document.createElement('button');
        botonPagar.classList.add('btn', 'btn-success', 'mt-3');
        botonPagar.textContent = 'Pagar';
        botonPagar.addEventListener('click', procesarPago);
        DOMcarrito.appendChild(botonPagar);
        
        DOMtotal.textContent = calcularTotal();
    }
   
    function borrarItemCarrito(evento) {        
        const id = evento.target.dataset.item;        
        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });        
        renderizarCarrito();        
        guardarCarritoEnLocalStorage();

    }
    
    function calcularTotal() {        
        return carrito.reduce((total, item) => {            
            const ItemCarrito = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });            
            return total + ItemCarrito[0].precio;
        }, 0).toFixed(2);
    }
   
    function vaciarCarrito() {        
        carrito = [];        
        renderizarCarrito();        
        localStorage.clear();
    }

    function restarItemCarrito(evento) {        
        const id = evento.target.dataset.item;        
        const indice = carrito.indexOf(id);
        if (indice > -1) {
            carrito.splice(indice, 1);
        }
        renderizarCarrito();        
        guardarCarritoEnLocalStorage();
    }
    
    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage () {      
        if (miLocalStorage.getItem('carrito') !== null) {
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    function procesarPago() {
        //a        
        //Aca se puede  agregar lógica para procesar el pago con tarjeta pero no supe hacer el formulario             
        if(carrito.length === 0) {
            alert("El carrito está vacío. Agrega productos antes de pagar.");
        } else {
            $('#toastPagoExitoso').toast('show');
            vaciarCarrito();
        }
    }
        
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
})