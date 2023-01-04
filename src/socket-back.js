import {
	atualizaDocumento,
	encontrarDocumento,
	obterDocumentos,
	adicionarDocumento,
} from "./documentosDb.js";
import io from "./servidor.js";

io.on("connection", (socket) => {
	socket.on("obter_documentos", async (devolverDocumentos) => {
		const documentos = await obterDocumentos();
		devolverDocumentos(documentos);
	});

	socket.on("selecionar_documento", async (nomeDocumento, devolverTexto) => {
		socket.join(nomeDocumento);
		const documento = await encontrarDocumento(nomeDocumento);
		if (documento) {
			devolverTexto(documento.texto);
		}
	});

	socket.on("adicionar_documento", async (nome) => {
		const resultado = await adicionarDocumento(nome);
		if (resultado.acknowledged) {
			io.emit("adicionar_documento_interface", nome);
		}
	});

	socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
		const atualizacao = await atualizaDocumento(nomeDocumento, texto);
		if (atualizacao.modifiedCount) {
			socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
		}
	});
});
