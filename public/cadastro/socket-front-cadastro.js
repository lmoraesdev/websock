const socket = io()

function emitirCadastrarUsario() {
	socket.emitir("cadastrar_usuario", dados)
}

export { emitirCadastrarUsario }
