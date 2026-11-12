
// Galería de imágenes secuenciales sin repetir
const galeriaImagenes = [
  { id: 101, titulo: "Articulo 1", url: "[suspicious link removed]" },
  { id: 102, titulo: "Articulo 2", url: "[suspicious link removed]" },
  { id: 103, titulo: "Articulo 3", url: "[suspicious link removed]" },
  { id: 104, titulo: "Articulo 4", url: "[suspicious link removed]" },
  { id: 105, titulo: "Articulo 5", url: "[suspicious link removed]" },
  { id: 106, titulo: "Articulo 6", url: "[suspicious link removed]" },
  { id: 107, titulo: "Articulo 7", url: "[suspicious link removed]" },
  { id: 108, titulo: "Articulo 8", url: "[suspicious link removed]" },
  { id: 109, titulo: "Articulo 9", url: "[suspicious link removed]" },
  { id: 110, titulo: "Articulo 10", url: "[suspicious link removed]" }
];

let carrito = [];
let contadorImagen = 0;
let filas = [];

// Alternar visibilidad entre vista principal y carrito
function mostrarSeccion(seccion) {
  document.getElementById('pagina-principal').classList.remove('activa');
  document.getElementById('pagina-carrito').classList.remove('activa');

  if (seccion === 'principal') {
    document.getElementById('pagina-principal').classList.add('activa');
  } else {
    document.getElementById('pagina-carrito').classList.add('activa');
    renderizarCarrito();
  }
}

// Agregar nueva fila (máximo 3)
function agregarFila() {
  if (filas.length >= 3) return;

  const filaId = filas.length;
  const items = [];

  // Seleccionar 5 imágenes secuenciales
  for (let i = 0; i < 5; i++) {
    items.push(galeriaImagenes[contadorImagen % galeriaImagenes.length]);
    contadorImagen++;
  }

  filas.push({ id: filaId, items });
  renderizarFilas();
  actualizarVisibilidadBoton();
}

// Eliminar fila existente
function eliminarFila() {
  if (filas.length > 0) {
    filas.pop();
    renderizarFilas();
    actualizarVisibilidadBoton();
  }
}

// Ocultar botón si se alcanza el máximo de 3 filas
function actualizarVisibilidadBoton() {
  const btnAgregar = document.getElementById('btn-agregar-fila');
  if (filas.length >= 3) {
    btnAgregar.style.display = 'none';
  } else {
    btnAgregar.style.display = 'inline-block';
  }
}

// Mover los recuadros de derecha a izquierda
function moverFila(indexFila) {
  const fila = filas[indexFila];
  fila.items.shift(); // Elimina el elemento de la izquierda
  fila.items.push(galeriaImagenes[contadorImagen % galeriaImagenes.length]); // Añade uno nuevo a la derecha
  contadorImagen++;
  renderizarFilas();
}

// Dibujar las filas y recuadros en la pantalla
function renderizarFilas() {
  const contenedor = document.getElementById('contenedor-filas');
  contenedor.innerHTML = '';

  filas.forEach((fila, index) => {
    const filaWrapper = document.createElement('div');
    filaWrapper.className = 'fila-wrapper';

    const filaRecuadros = document.createElement('div');
    filaRecuadros.className = 'fila-recuadros';

    fila.items.forEach((item, itemIndex) => {
      const recuadro = document.createElement('div');
      // El recuadro del centro (índice 2) es el principal destacado
      recuadro.className = `recuadro ${itemIndex === 2 ? 'destacado' : ''}`;
      recuadro.innerHTML = `
        
        <p>${item.titulo}</p>
        <small>ID: #${item.id}</small>
      `;
      filaRecuadros.appendChild(recuadro);
    });

    // Botón de salto de recuadro
    const btnMover = document.createElement('button');
    btnMover.className = 'btn-nav';
    btnMover.innerHTML = '▶';
    btnMover.onclick = () => moverFila(index);

    // Botón de envío del recuadro central al carrito
    const btnCarrito = document.createElement('button');
    btnCarrito.className = 'btn-agregar-carrito';
    btnCarrito.innerText = '🛒 Agregar Central al Carrito';
    btnCarrito.onclick = () => agregarAlCarrito(fila.items[2]);

    filaWrapper.appendChild(filaRecuadros);
    filaWrapper.appendChild(btnMover);
    filaWrapper.appendChild(btnCarrito);
    contenedor.appendChild(filaWrapper);
  });
}

// Agregar elemento al carrito e incrementar contador
function agregarAlCarrito(item) {
  carrito.push(item);
  document.getElementById('cart-count').innerText = carrito.length;
}

// Mostrar artículos o mensaje de carrito vacío
function renderizarCarrito() {
  const listaContainer = document.getElementById('lista-carrito');

  if (carrito.length === 0) {
    listaContainer.innerHTML = '<p>Todavía no tienes ningún articulo en tu carrito de compras</p>';
    return;
  }

  listaContainer.innerHTML = '';
  carrito.forEach((item) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item-carrito';
    itemDiv.innerHTML = `
      
      <div>
        <h4>${item.titulo}</h4>
        <small>ID de producto: #${item.id}</small>
      </div>
    `;
    listaContainer.appendChild(itemDiv);
  });
}

// Inicializar con 1 fila
agregarFila();