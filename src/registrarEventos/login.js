import { encontrarUsuario } from "../db/usuariosDB.js";
import autenticarUsuario from "../utils/autenticarUsuario.js";
import gerarJwt from "../utils/gerarJwt.js";

function registrarEventosLogin(socket, io) {
	socket.on("autentecar_usuario", async ({ nome, senha }) => {
		const usuario = await encontrarUsuario(nome);

		if (usuario) {
			const tokenJwt = gerarJwt({ nomeUsuario: nome });

			const autenticado = autenticarUsuario(senha, usuario);

			if (autenticado) {
				socket.emit("autenticacao_sucesso", tokenJwt);
			} else "autenticacao_erro";
		} else {
			socket.emit("usuario_nao_encontrado")
		}
	});
}

export default registrarEventosLogin;
