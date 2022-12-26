import { emitirTextoEditor } from "./socket-front-documento.js";

const socket = io();

const textoEditor = document.getElementById("editor-texto");

textoEditor.addEventListener("keyup", () => {
	emitirTextoEditor(textoEditor.value)
});

function atualizaTextoEditor(texto){
	textoEditor.value = texto
}

export { atualizaTextoEditor }
