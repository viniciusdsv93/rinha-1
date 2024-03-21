const {
	cadastrarPessoa,
	buscarPessoaPorId,
	ContarPessoasService,
} = require("../services/pessoa.service");

async function cadastrarPessoaController(req, res) {
	const pessoaCadastrada = await cadastrarPessoa(req.body);
	if (!pessoaCadastrada.ok) {
		return res.status(400).json({ erro: pessoaCadastrada.erro });
	}
	res.status(201).setHeader("Location", `/pessoas/${pessoaCadastrada.id}`).send();
}

async function BuscarPessoaPorIdController(req, res) {
	const pessoaBuscada = await buscarPessoaPorId(req.params.id);
	if (pessoaBuscada.rowCount == 0) {
		return res.status(404).json({ erro: "Nao ha pessoa com o id informado" });
	}
	res.status(200).json({ data: pessoaBuscada.rows[0] });
}

async function ContarPessoasController(req, res) {
	let totalPessoas = await ContarPessoasService();
	res.status(200).json({ total: totalPessoas.rows[0].total_pessoas });
}

module.exports = {
	cadastrarPessoaController,
	BuscarPessoaPorIdController,
	ContarPessoasController,
};
