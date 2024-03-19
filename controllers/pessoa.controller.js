const cadastrarPessoa = require("../services/pessoa.service");

async function pessoaController(req, res) {
	const pessoaCadastrada = await cadastrarPessoa(req.body);
	if (!pessoaCadastrada.ok) {
		return res.status(400).json({ erro: pessoaCadastrada.erro });
	}
	res.status(201).setHeader("Location", `/pessoas/${pessoaCadastrada.id}`).send();
}

module.exports = pessoaController;
