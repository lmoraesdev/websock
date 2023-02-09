import { usuariosColecao } from "./dbConnect.js";

function encontrarUsuario(nome) {
	return usuariosColecao.findOne({ nome });
}

function cadastrarUsuario({ nome, senha }) {
	return usuariosColecao.insertOne({ nome: nome, senha });
}

export { cadastrarUsuario, encontrarUsuario };
