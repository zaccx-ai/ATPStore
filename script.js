
// Base de datos de productos secuenciales con degradados
const productosBase = [
  { id: "IMG-01", num: "01", grad: "grad-3" },
  { id: "IMG-02", num: "02", grad: "grad-4" },
  { id: "IMG-03", num: "03", grad: "grad-5" },
  { id: "IMG-11", num: "11", grad: "grad-1" },
  { id: "IMG-12", num: "12", grad: "grad-2" },
  { id: "IMG-04", num: "04", grad: "grad-6" },
  { id: "IMG-05", num: "05", grad: "grad-7" },
  { id: "IMG-06", num: "06", grad: "grad-8" },
  { id: "IMG-07", num: "07", grad: "grad-9" }
];

let carrito = [];
let contadorGlobal = 0;
let filas = [];
let idFilaContador = 1;

// Alternar visibilidad entre la página principal y el carrito
function mostrarSeccion(seccion) {
  const principal = document.getElementById('pagina-principal');
  const carritoSec = document.getElementById('pagina-carrito');

  if (!principal || !carritoSec) return;

  principal.classList.remove('activa');
  carritoSec.classList.remove('activa');

  if (seccion === 'principal') {
    principal.classList.add('activa');
  } else {
    carritoSec.classList.add('activa');
    renderizarCarrito();
  }
}

// Crear nueva fila de recuadros cuando se da clic en el botón
function agregarFila() {
  if (filas.length <= 3) return;

  const items = [];
  for (let i = 0; i < 5; i++) {
    items.push(productosBase[contadorGlobal % productosBase.length]);
    contadorGlobal++;
  }

  filas.push({ id: idFilaContador++, items });
  renderizarFilas(true); // Se activa la animación de entrada
  actualizarBotonFila();
}

// Eliminar fila por su ID al hacer clic en ✕
function eliminarFilaPorId(idFila) {
  filas = filas.filter(f => f.id !== idFila);
  renderizarFilas(false);
  actualizarBotonFila();
}

// Visibilidad del botón según el máximo de 3 filas
function actualizarBotonFila() {
  const btn = document.getElementById('btn-agregar-fila');
  if (btn) {
    btn.style.display = filas.length <= 3 ? 'none' : 'inline-block';
  }
}

// Desplazar recuadros de derecha a izquierda con la flecha &gt;
function desplazarDerecha(indexFila) {
  if (!filas[indexFila]) return;
  const fila = filas[indexFila];
  fila.items.shift(); // Desaparece el de la izquierda
  fila.items.push(productosBase[contadorGlobal % productosBase.length]); // Aparece el nuevo por la derecha
  contadorGlobal++;
  renderizarFilas(true);
}

// Desplazar recuadros hacia la izquierda con la flecha &lt;
function desplazarIzquierda(indexFila) {
  if (!filas[indexFila]) return;
  const fila = filas[indexFila];
  fila.items.pop();
  fila.items.unshift(productosBase[contadorGlobal % productosBase.length]);
  contadorGlobal++;
  renderizarFilas(true);
}

// Renderizar recuadros y aplicar animación
function renderizarFilas(animar = false) {
  const contenedor = document.getElementById('contenedor-filas');
  if (!contenedor) return;

  contenedor.innerHTML = '';

  filas.forEach((fila, idxFila) => {
    const cardFila = document.createElement('div');
    cardFila.className = `card-container-fila ${animar ? 'animar-entrada' : ''}`;

    const headerFila = document.createElement('div');
    headerFila.className = 'header-fila';
    headerFila.innerHTML = `
      <span>Fila ${idxFila + 1}</span>
      
    `;

    const carruselBody = document.createElement('div');
    carruselBody.className = 'carrusel-body';

    const btnPrev = document.createElement('button');
    btnPrev.className = 'btn-nav-arrow';
    btnPrev.innerText = '‹';
    btnPrev.onclick = () => desplazarIzquierda(idxFila);

    const grid = document.createElement('div');
    grid.className = 'grid-recuadros';

    fila.items.forEach((item, itemIdx) => {
      const recuadro = document.createElement('div');
      recuadro.className = `recuadro ${itemIdx === 2 ? 'destacado' : ''} ${animar ? 'animar-recuadro' : ''}`;
      recuadro.innerHTML = `
        <div>
          <span>${itemIdx === 2 ? item.num : ''}</span>
        </div>
        <div>${item.id}</div>
      `;
      grid.appendChild(recuadro);
    });

    const btnNext = document.createElement('button');
    btnNext.className = 'btn-nav-arrow';
    btnNext.innerText = '›';
    btnNext.onclick = () => desplazarDerecha(idxFila);

    carruselBody.appendChild(btnPrev);
    carruselBody.appendChild(grid);
    carruselBody.appendChild(btnNext);

    const footerFila = document.createElement('div');
    footerFila.className = 'footer-fila';
    footerFila.innerHTML = `
      
    `;

    cardFila.appendChild(headerFila);
    cardFila.appendChild(carruselBody);
    cardFila.appendChild(footerFila);
    contenedor.appendChild(cardFila);
  });
}

// Agregar producto central al carrito
function agregarCentralAlCarrito(indexFila) {
  if (!filas[indexFila]) return;
  const productoCentral = filas[indexFila].items[2];
  carrito.push(productoCentral);

  const badge = document.getElementById('cart-count');
  if (badge) badge.innerText = carrito.length;
}

// Eliminar producto individual del carrito
function eliminarDelCarrito(indexItem) {
  carrito.splice(indexItem, 1);
  const badge = document.getElementById('cart-count');
  if (badge) badge.innerText = carrito.length;
  renderizarCarrito();
}

// Renderizar la sección del carrito
function renderizarCarrito() {
  const container = document.getElementById('lista-carrito');
  if (!container) return;

  if (carrito.length === 0) {
    container.innerHTML = '<p>Todavía no tienes ningún articulo en tu carrito de compras</p>';
    return;
  }

  container.innerHTML = '';
  carrito.forEach((item, idx) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-carrito';
    itemDiv.innerHTML = `
      <div>${item.num}</div>
      <div>
        <h4>Producto ${item.id}</h4>
        <small>ID Identificador: #${item.id}</small>
      </div>
      
    `;
    container.appendChild(itemDiv);
  });
}
