import { inserirLinkDocumento, removerLinkDocumento } from "./index.js";
import { obterCookie } from "./utils/cookie.js";

const socket = io({
	auth: {
		token: obterCookie("tokenJwt"),
	},
});

socket.emit("obter_documentos", (documentos) => {
	documentos.forEach((documento) => {
		inserirLinkDocumento(documento.nome);
	});
});

function emitirAdicionarDocumento(nome) {
	socket.emit("adicionar_documento", nome);
}

socket.on("adicionar_documento_interface", (nome) => {
	inserirLinkDocumento(nome);
});

socket.on("documento_existente", (nome) => {
	alert(`O documento ${nome} já existe!`);
});

socket.on("excluir_documento_sucesso", (nome) => {
	removerLinkDocumento(nome);
});

export { emitirAdicionarDocumento };
