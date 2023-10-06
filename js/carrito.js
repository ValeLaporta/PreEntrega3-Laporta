let productos = []
const carrito = [];

/*
productos.push(new Producto("Huevo", 500, "./imagenes/tienda/huevo.png"))
productos.push(new Producto("Succionador", 2500, "./imagenes/tienda/succionador(1).png"))
productos.push(new Producto("Masturbador Masculino", 3200, "./imagenes/tienda/masturbador-masculino.png"))
productos.push(new Producto("Bala", 250, "./imagenes/tienda/bala.png"));
productos.push(new Producto("Bolas de menta para masajes", 180, "./imagenes/tienda/bolas-menta.png"));
productos.push(new Producto("Copa Menstrual", 60, "./imagenes/tienda/copa.png"));
productos.push(new Producto("Gel Frio Calor", 60, "./imagenes/tienda/gel-frio-calor.png"));
productos.push(new Producto("Gel Prolube", 60, "./imagenes/tienda/prolube.png"));
productos.push(new Producto("Vibrador con control remoto", 60, "./imagenes/tienda/vibrador.png"));


localStorage.setItem("productos", JSON.stringify(productos));
*/
const tarjetas = document.getElementById("productCards");
const botonAgregar = document.getElementById("agregar")

function recuperarItemsStorage() {
  productos = JSON.parse(localStorage.getItem("productos")) || [];
}

function mostrarTarjetas() {
  productos.forEach((x, index) => {
    tarjetas.innerHTML += `
      <div class="col">
          <div class="card">
              <img src="${x.img}" class="card-img-top" alt="${x.nombre}">
              <div class="card-body">
              <h5 class="card-title text-center">${x.nombre}</h5>
              <p class="card-text text-center"> $${x.precio}</p>
              <button type="button" id="agregar${index}" class="btn btn-light">Agregar al carrito +</button>
              </div>
          </div>
      </div>
    `;
  });

document.addEventListener("DOMContentLoaded", () => {
  recuperarItemsStorage();
  mostrarTarjetas();
});

  productos.forEach((x, index) => {
    const botonAgregar = document.getElementById(`agregar${index}`);
    botonAgregar.addEventListener("click", () => {
      agregarAlCarrito(productos[index]);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  recuperarItemsStorage();
  mostrarTarjetas();
});


function agregarAlCarrito(producto) {
  const productoSeleccionado = carrito.find((item) => item.producto.nombre === producto.nombre);

  if (productoSeleccionado) {
    productoSeleccionado.cantidad++;
  } else {
    carrito.push({ producto, cantidad: 1 });
  }


  actualizarTabla();
}

function actualizarTabla() {
  const itemsTable = document.getElementById("items");
  let total = 0;



  carrito.forEach((item) => {
    const { producto, cantidad } = item;
    const subtotal = producto.precio * cantidad;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio.toFixed(2)}</td>
      <td>${cantidad}</td>
      <td>$${subtotal.toFixed(2)}</td>
    `;
    itemsTable.appendChild(row);
  });

  const totalElement = document.getElementById("total");
  totalElement.textContent = `$${total.toFixed(2)}`;
 }

 const vaciarCarritoBtn = document.getElementById("vaciarCarrito");

vaciarCarritoBtn.addEventListener("click", () => {
  carrito.length = 0; 

  actualizarTabla();
  localStorage.setItem('carrito', JSON.stringify(carrito));
});