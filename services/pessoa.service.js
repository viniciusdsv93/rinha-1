const { randomUUID } = require("node:crypto");
const {
	inserirPessoa,
	checarDuplicidadeApelido,
	buscarPessoaPorId,
	buscarPessoaPorTermo,
	contarPessoas,
	listarPessoas,
} = require("../models/pessoa.model");

async function cadastrarPessoaService(pessoa) {
	// gerar UUID
	const uuid = randomUUID();

	const apelidoDuplicado = await checarDuplicidadeApelido(pessoa.apelido);
	if (apelidoDuplicado.rowCount > 0) {
		return {
			ok: false,
			erro: "Apelido ja em uso",
		};
	}
	pessoa["uuid"] = uuid;
	const pessoaInserida = await inserirPessoa(pessoa);
	return {
		ok: true,
		id: uuid,
	};
}

async function buscarPessoaPorIdService(id) {
	return await buscarPessoaPorId(id);
}

async function buscarPessoaPorTermoService(termo) {
	return await buscarPessoaPorTermo(termo);
}

async function ContarPessoasService() {
	return await contarPessoas();
}

async function ListarPessoasService() {
	return await listarPessoas();
}

module.exports = {
	cadastrarPessoaService,
	buscarPessoaPorIdService,
	ContarPessoasService,
	buscarPessoaPorTermoService,
	ListarPessoasService,
};
