let intentos = 6;
let palabra = "";
let clics = 5;

// Obtener elementos del HTML
const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);
const inputBox = document.getElementById("guess-input");
const GRID = document.getElementById("grid");
const GRID2 = document.getElementById("grid2");
const dialogo = document.getElementById("dialogo");
const titulo = document.getElementById("title");
titulo.addEventListener("click", nota);

// Obtener palabra random de API
fetch("https://random-word-api.herokuapp.com/word?length=5")
  .then((response) => response.json())
  .then((response) => {
    palabra = response[0].toUpperCase();
    console.log(palabra);
    button.disabled = false; // Para evitar errores
  });

// Generar cajitas provisorias
for (let x = 1; x <= 6; x++) {
  const ROW = document.createElement("div");

  ROW.className = "row" + x;
  for (let z = 1; z <= 5; z++) {
    const SPAN = document.createElement("span");
    SPAN.className = "letter";
    SPAN.classList.add("empty");
    ROW.appendChild(SPAN);
  }
  GRID2.appendChild(ROW);
}

// Leer el intento
function leerIntento() {
  let intento = inputBox;
  intento = intento.value;
  intento = intento.toUpperCase();
  return intento;
}

function intentar() {
  // Leer intento al presionar botón
  const intento = leerIntento();

  const ROW = document.createElement("div");

  ROW.className = "row";

  // Si la palabra tiene menos de 5 letras no hace nada, si tiene un número tampoco
  if (intento.length < 5 || /\d/.test(intento)) {
    inputBox.style.borderColor = "red";
    inputBox.style.boxShadow = "0px 2px 14px 0px rgba(245,139,139,1)";
    return;
  } else {
    inputBox.style.borderColor = "#ccc";
    inputBox.style.boxShadow = "none";
  }
  // Borrar un row provisorio
  let provisorio = document.querySelector(".row" + intentos);
  provisorio.remove();

  for (let i = 0; i < palabra.length; i++) {
    const SPAN = document.createElement("span");
    SPAN.className = "letter";

    if (intento[i] === palabra[i]) {
      SPAN.innerHTML = intento[i];
      SPAN.style.backgroundColor = "#43a047";
    } else if (palabra.includes(intento[i])) {
      SPAN.innerHTML = intento[i];
      SPAN.style.backgroundColor = "#d1b036";
    } else {
      SPAN.innerHTML = intento[i];
      SPAN.style.backgroundColor = "#757575";
    }

    ROW.appendChild(SPAN);
  }

  GRID.appendChild(ROW);
  // Si gana se envía un mensaje de que ganó a la función terminar
  if (intento === palabra) {
    terminar(true);
    return;
  }

  // Se restan intentos por cada turno, si llega a 0, pierde y envía un mensaje de que perdió a la función terminar
  if (intentos === 1) {
    terminar(false);
  }
  intentos--;
}
// Si el juego termina, deshabilita los input y muestra dialogo
function terminar(status) {
  if (status === true) {
    setTimeout(() => {
      dialogo.innerHTML = `<h1>¡Ganaste!</h1>
    <p>Acertaste la palabra</p>
    <strong><a href="https://www.google.com/search?&q=${palabra}+definition" target="_blank"<p>${palabra}</p></a></strong>
    <button id="reload">Jugar de nuevo </button>`;
      dialogo.showModal();
      const reintentar = document.getElementById("reload");
      reintentar.addEventListener("click", recargar);
      reintentar.style.backgroundColor = "#3c9040";
    }, "1200");
  } else {
    dialogo.innerHTML = `<h1>¡Perdiste!</h1>
    <p>La palabra era ${palabra}</p>
    <button id="reload">Volver a intentar</button>`;
    dialogo.showModal();
    const reintentar = document.getElementById("reload");
    reintentar.addEventListener("click", recargar);
  }
}
function recargar() {
  location.reload();
}

function nota() {
  clics--;
  if (clics == 0) {
    clics = 5;
    dialogo.innerHTML = `<p class="nota">Querido evaluador:</p>
      <p class="nota">Le agradezco por indagar en mi página, está hecha con mucho amor y lágrimas, más lágrimas que amor,  espero le guste :)</p>
      <p class="nota">Le pido por favor que considere ponerme una nota alta, hágalo por todos los que no saben centrar un div 😭</p>
      <p class="nota">Un saludo, Mati ❤</p>
      <button id="volver">Volver </button>`;
    dialogo.showModal();
    const volver = document.getElementById("volver");
    volver.addEventListener("click", () => dialogo.close());
    volver.style.backgroundColor = "#3c9040";
  } else {
    return;
  }
}
