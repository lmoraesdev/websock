import "dotenv/config";

import registrarEventosDocumento from "./registrarEventos/documento.js";
import registrarEventosInicio from "./registrarEventos/inicio.js";
import registrarEventosCadastro from "./registrarEventos/cadastro.js";
import registrarEventosLogin from "./registrarEventos/login.js";

import io from "./servidor.js";
import autorizarUsuario from "./middlewares/autorizarUsuario.js";

io.use(autorizarUsuario)

io.on("connection", (socket) => {
	registrarEventosCadastro(socket, io);
	registrarEventosLogin(socket, io);
	registrarEventosInicio(socket, io);
	registrarEventosDocumento(socket, io);
});
