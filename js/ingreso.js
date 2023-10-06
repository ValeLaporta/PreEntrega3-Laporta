

function ingreso() {
    const cliente = {
        nombreCliente: prompt("Ingrese su nombre"),
        direccionCliente: prompt("Ingrese su dirección para el envío")
    };


    alert(`Según nuestros datos registrados, usted es ${cliente.nombreCliente} y su dirección de envío es ${cliente.direccionCliente}`);


    const comenzarCompra = prompt("Si los datos son correctos, conteste 'si' para comenzar la compra");


    if (comenzarCompra && comenzarCompra.toLowerCase() === 'si') {
        alert('La compra ha comenzado.');
    } else {
        alert('La compra ha sido cancelada.');
    }
}


ingreso();
