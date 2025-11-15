// Lista de juegos (puedes agregar más)
const games = [
    {
        title: "GTA 6",
        date: "2025-09-17",
        desc: "El regreso más esperado del mundo abierto.",
        img: "https://i.imgur.com/2yaf2oV.jpeg",
        id: 1
    },
    {
        title: "Elden Ring 2",
        date: "2025-03-12",
        desc: "La secuela del GOTY con nuevo mapa y jefes.",
        img: "https://i.imgur.com/6yeZ7Gx.jpeg",
        id: 2
    },
    {
        title: "Call of Duty 2025",
        date: "2025-11-05",
        desc: "Nueva entrega llena de acción y campaña épica.",
        img: "https://i.imgur.com/IHrXgGu.jpeg",
        id: 3
    }
];

// Mostrar en inicio
const homeGames = document.getElementById("homeGames");
if (homeGames) {
    games.forEach(g => {
        homeGames.innerHTML += `
        <div class="card">
            <img src="${g.img}">
            <div class="card-content">
                <h3>${g.title}</h3>
                <p><b>Lanzamiento:</b> ${g.date}</p>
                <p>${g.desc}</p>
                <label>Puntaje (1–10)</label>
                <input type="number" min="1" max="10" id="score_${g.id}">
                <button onclick="rateGame(${g.id})">Votar</button>
            </div>
        </div>`;
    });
}

// Guardar voto
function rateGame(id) {
    const value = parseInt(document.getElementById("score_" + id).value);
    if (!value || value < 1 || value > 10) return alert("Puntaje inválido");

    let votes = JSON.parse(localStorage.getItem("votes") || "{}");
    if (!votes[id]) votes[id] = [];
    votes[id].push(value);
    localStorage.setItem("votes", JSON.stringify(votes));

    alert("¡Gracias por tu voto!");
}

// Ranking
const rankingList = document.getElementById("rankingList");
if (rankingList) {
    let votes = JSON.parse(localStorage.getItem("votes") || "{}");

    let ranking = games.map(g => {
        let v = votes[g.id] || [];
        let avg = v.length ? (v.reduce((a,b) => a + b, 0) / v.length).toFixed(1) : 0;
        return { title: g.title, avg: avg };
    });

    ranking.sort((a,b) => b.avg - a.avg);

    ranking.forEach(r => {
        rankingList.innerHTML += `
            <div class="comment">
                <h3>${r.title}</h3>
                <p>Puntaje promedio: ${r.avg}</p>
            </div>`;
    });
}

// Lanzamientos
const launchList = document.getElementById("launchList");
if (launchList) {
    games.forEach(g => {
        launchList.innerHTML += `
        <div class="card">
            <img src="${g.img}">
            <div class="card-content">
                <h3>${g.title}</h3>
                <p><b>Fecha:</b> ${g.date}</p>
                <p>${g.desc}</p>
            </div>
        </div>`;
    });
}

// Comentarios generales
function addGeneralComment() {
    const text = document.getElementById("commentText").value;
    if (!text.trim()) return;

    let comments = JSON.parse(localStorage.getItem("generalComments") || "[]");
    comments.push(text);
    localStorage.setItem("generalComments", JSON.stringify(comments));

    renderGeneralComments();
    document.getElementById("commentText").value = "";
}

function renderGeneralComments() {
    const box = document.getElementById("generalComments");
    let comments = JSON.parse(localStorage.getItem("generalComments") || "[]");
    box.innerHTML = "";
    comments.forEach(c => {
        box.innerHTML += `<div class="comment">${c}</div>`;
    });
}

if (document.getElementById("generalComments")) {
    renderGeneralComments();
}
