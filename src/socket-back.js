import io from "./servidor.js";

const documentos = [
	{
		nome: "JavaScript",
		texto: "texto_de_javascript",
	},
	{
		nome: "Node",
		texto: "texto_de_node",
	},
	{
		nome: "Socket.io",
		texto: "texto_de_socket.io",
	},
];

io.on("connection", (socket) => {
	console.log("Um cliente se conectou! ID:", socket.id);

	socket.on("disconnect", (motivo) => {
		console.log(`Cliente "${socket.id}" desconectado!
		Motivo: ${motivo}`);
	});

	socket.on("selecionar_documento", (nomeDocumento, devolverTexto) => {
		socket.join(nomeDocumento);

		const documento = encontrarDocumento(nomeDocumento);
		if (documento) {
			devolverTexto(documento.texto);
		}
	});

	socket.on("texto_editor", ({ texto, nomeDocumento }) => {
		const documento = encontrarDocumento(nomeDocumento);
		if (documento) {
			documento.texto = texto;
			socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
		}
	});
});

function encontrarDocumento(nome) {
	const documento = documentos.find(() => {
		return documento.nome === nome;
	});
}
