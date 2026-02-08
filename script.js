const rojo = document.getElementById("rojo");
const verde = document.getElementById("verde");
const azul = document.getElementById("azul");

const rojoNum = document.getElementById("rojoNum");
const verdeNum = document.getElementById("verdeNum");
const azulNum = document.getElementById("azulNum");

const colorPicker = document.getElementById("colorPicker");
const colorBox = document.getElementById("colorBox");
const rgbTexto = document.getElementById("rgbTexto");
const hexTexto = document.getElementById("hexTexto");
const themeBtn = document.getElementById("themeBtn");
const favBtn = document.getElementById("favBtn");
const favoritesContainer = document.getElementById("favoritesContainer");

function actualizar(r, g, b) {
    rojo.value = r; verde.value = g; azul.value = b;
    rojoNum.value = r; verdeNum.value = g; azulNum.value = b;

    const rgb = `rgb(${r}, ${g}, ${b})`;
    colorBox.style.backgroundColor = rgb;
    rgbTexto.textContent = rgb;

    const hex = "#" +
        r.toString(16).padStart(2,"0") +
        g.toString(16).padStart(2,"0") +
        b.toString(16).padStart(2,"0");

    hexTexto.textContent = hex.toUpperCase();
    colorPicker.value = hex;
}

// Eventos RGB
[rojo, verde, azul].forEach(el =>
    el.addEventListener("input", () =>
        actualizar(+rojo.value, +verde.value, +azul.value)
    )
);

[rojoNum, verdeNum, azulNum].forEach(el =>
    el.addEventListener("input", () =>
        actualizar(+rojoNum.value, +verdeNum.value, +azulNum.value)
    )
);

// Color picker
colorPicker.addEventListener("input", () => {
    const h = colorPicker.value;
    actualizar(
        parseInt(h.substr(1,2),16),
        parseInt(h.substr(3,2),16),
        parseInt(h.substr(5,2),16)
    );
});

// Tema
themeBtn.addEventListener("click", () => {
    const html = document.documentElement;
    const dark = html.getAttribute("data-bs-theme") === "dark";
    html.setAttribute("data-bs-theme", dark ? "light" : "dark");
    themeBtn.textContent = dark ? "☀️" : "🌙";
});

// Favoritos
favBtn.addEventListener("click", () => {
    const color = hexTexto.textContent;

    const fav = document.createElement("div");
    fav.className = "favorite-color";
    fav.style.backgroundColor = color;

    fav.addEventListener("click", () => {
        const r = parseInt(color.substr(1,2),16);
        const g = parseInt(color.substr(3,2),16);
        const b = parseInt(color.substr(5,2),16);
        actualizar(r, g, b);
    });

    favoritesContainer.appendChild(fav);
});

// Inicial
actualizar(0,0,0);
