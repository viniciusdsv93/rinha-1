const cadastrarPessoa = require("../services/pessoa.service");

function pessoaController(req, res) {
	console.log(2);
	return cadastrarPessoa(req.body);
}

module.exports = pessoaController;
