const { randomUUID } = require("node:crypto");
const {
	inserirPessoa,
	checarDuplicidadeApelido,
	buscarPessoa,
} = require("../models/pessoa.model");

async function cadastrarPessoa(pessoa) {
	// gerar UUID
	const uuid = randomUUID();

	const apelidoDuplicado = await checarDuplicidadeApelido(pessoa.apelido);
	console.log({ apelidoDuplicado });
	if (apelidoDuplicado.rowCount > 0) {
		return {
			ok: false,
			erro: "Apelido ja em uso",
		};
	}
	pessoa["uuid"] = uuid;
	const pessoaInserida = await inserirPessoa(pessoa);
	console.log({ pessoaInserida });
	return {
		ok: true,
		id: uuid,
	};
}

async function buscarPessoaPorId(id) {
	return await buscarPessoa(id);
}

module.exports = { cadastrarPessoa, buscarPessoaPorId };
