let productos = []
const carrito = [];

const tarjetas = document.getElementById("productCards");
const botonAgregar = document.getElementById("agregar");


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
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Se ha agregado un producto al carrito',
          showConfirmButton: false,
          timer: 1500
        });
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


 function vaciarCarrito() {
    carrito.length = 0; // Vacía el arreglo del carrito
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarTabla();
  }
  
  const vaciarCarritoBtn = document.getElementById("vaciarCarrito");
  
  vaciarCarritoBtn.addEventListener("click", () => {
    vaciarCarrito();
  });
  
  function actualizarTabla() {
    const itemsTable = document.getElementById("items");
    itemsTable.innerHTML = ""; // Borra todos los elementos de la tabla
  
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
  


vaciarCarritoBtn.addEventListener("click", () => {
  carrito.length = 0; 
  Swal.fire(
    'Se vaciara el carrito',
    'Seguro que desea vaciar el carrito?',
    'warning'
  )

  actualizarTabla();
  localStorage.setItem('carrito', JSON.stringify(carrito));
});
