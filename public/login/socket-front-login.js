import { definirCookie } from "../utils/cookie.js";

const socket = io();

socket.on("connect_error", (erro) => {
	alert(erro);
	window.location.href = "/login/index.html";
})

function emitirAutenticarUsuario(dados) {
	socket.emit("autenticar_usuario", dados);
}

socket.on("autenticacao_sucesso", (tokenJwt) => {
	definirCookie("tokenJwt", tokenJwt);

	alert("Usuário autenticado com sucesso!");
	window.location.href = "/";
});

socket.on("autenticacao_erro", () => alert("Erro na autenticação."));
socket.on("usuario_nao_encontrado", () => alert("Usuário não encontrado."));

export { emitirAutenticarUsuario };
