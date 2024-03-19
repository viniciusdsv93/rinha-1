const { randomUUID } = require("node:crypto");
const { inserirPessoa, checarDuplicidadeApelido } = require("../models/pessoa.model");

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

module.exports = cadastrarPessoa;
