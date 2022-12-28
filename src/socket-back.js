import io from "./servidor.js";

io.on("connection", (socket) => {
	console.log("Um cliente se conectou! ID:", socket.id);

	socket.on("disconnect", (motivo) => {
		console.log(`Cliente "${socket.id}" desconectado!
		Motivo: ${motivo}`);
	});

	socket.on("selecionar_documento", (nomeDoDocumento) => {
		socket.join(nomeDoDocumento);
	});

	socket.on("texto_editor", (texto) => {
		socket.broadcast.emit("texto_editor_clientes", texto);
	});
});
