// Inicializar Muuri
const grid = new Muuri('.grid', {
    layout: {
        fillGaps: true
    }
});

// Refrescar cuando carguen las imágenes
window.addEventListener('load', () => {
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');
});

// Lógica de Filtros
const enlaces = document.querySelectorAll('#categorias a');

enlaces.forEach((enlace) => {
    enlace.addEventListener('click', (e) => {
        e.preventDefault();
        enlaces.forEach(el => el.classList.remove('activo'));
        enlace.classList.add('activo');

        const categoria = enlace.dataset.categoria;
        grid.filter((item) => {
            return categoria === 'all' ? true : item.getElement().dataset.categoria === categoria;
        });
    });
});

// Lógica del Buscador
const barraBusqueda = document.getElementById('barra-busqueda');

barraBusqueda.addEventListener('input', (e) => {
    const busqueda = e.target.value.toLowerCase();
    grid.filter((item) => {
        const descripcion = item.getElement().dataset.descripcion.toLowerCase();
        return descripcion.includes(busqueda);
    });
});

// Lógica del Overlay
const overlay = document.getElementById('overlay');
const imagenOverlay = overlay.querySelector('img');
const descripcionOverlay = overlay.querySelector('.descripcion');

document.querySelectorAll('.item').forEach((item) => {
    item.addEventListener('click', () => {
        const ruta = item.querySelector('.item-contenido').dataset.imagen;
        const texto = item.dataset.descripcion;

        imagenOverlay.src = ruta;
        descripcionOverlay.textContent = texto;
        overlay.classList.add('activo');
    });
});

// Cerrar Overlay
document.getElementById('btn-cerrar-popup').addEventListener('click', () => {
    overlay.classList.remove('activo');
});

overlay.addEventListener('click', (e) => {
    if (e.target.id === 'overlay') overlay.classList.remove('activo');
});

// Cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') overlay.classList.remove('activo');
});