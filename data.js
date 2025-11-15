// ========================
//   SISTEMA CENTRAL DE DATOS
// ========================

const STORAGE_KEY = "juegos_data";

// --- Si no hay juegos, se inicializan ---
const juegosIniciales = [
    {
        id: 1,
        titulo: "Elden Ring",
        descripcion: "Elden Ring es un RPG de acción desarrollado por FromSoftware.",
        imagen: "https://via.placeholder.com/150",
        fecha: "2025-06-15",
        votos: []
    },
    {
        id: 2,
        titulo: "GTA 6",
        descripcion: "Grand Theft Auto VI, el regreso más esperado de Rockstar.",
        imagen: "https://via.placeholder.com/150",
        fecha: "2025-09-20",
        votos: []
    },
    {
        id: 3,
        titulo: "Hollow Knight: Silksong",
        descripcion: "Secuela del aclamado Metroidvania Hollow Knight.",
        imagen: "https://via.placeholder.com/150",
        fecha: "2025-03-10",
        votos: []
    }
];

// Cargar juegos desde localStorage
function cargarJuegos() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(juegosIniciales));
    return juegosIniciales;
}

// Guardar juegos
function guardarJuegos(juegos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(juegos));
}

// Obtener siguiente ID disponible
function nuevoID(juegos) {
    return juegos.length ? Math.max(...juegos.map(j => j.id)) + 1 : 1;
}
