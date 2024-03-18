const { randomUUID } = require("node:crypto");

function cadastrarPessoa(pessoa) {
	// gerar UUID
	const uuid = randomUUID();
	console.log({ 6: uuid });
	console.log({ 7: pessoa });

	// chamar model para persistir no banco
}

module.exports = cadastrarPessoa;
