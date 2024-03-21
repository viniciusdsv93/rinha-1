const {
	cadastrarPessoaService,
	buscarPessoaPorIdService,
	ContarPessoasService,
	buscarPessoaPorTermoService,
} = require("../services/pessoa.service");

async function cadastrarPessoaController(req, res) {
	const pessoaCadastrada = await cadastrarPessoaService(req.body);
	if (!pessoaCadastrada.ok) {
		if (pessoaCadastrada.erro == "Apelido ja em uso") {
			return res.status(422).json({ erro: pessoaCadastrada.erro });
		}
		return res.status(400).send();
	}
	res.status(201).setHeader("Location", `/pessoas/${pessoaCadastrada.id}`).send();
}

async function BuscarPessoaPorIdController(req, res) {
	const pessoaBuscada = await buscarPessoaPorIdService(req.params.id);
	if (pessoaBuscada.rowCount == 0) {
		return res.status(404).send();
	}
	res.status(200).json(pessoaBuscada.rows[0]);
}

async function BuscarPessoaPorTermoController(req, res) {
	if (!req.query.t) {
		return res.status(400).send();
	}
	const pessoasBuscadas = await buscarPessoaPorTermoService(req.query.t);
	res.status(200).json(pessoasBuscadas.rows);
}

async function ContarPessoasController(req, res) {
	let totalPessoas = await ContarPessoasService();
	res.status(200).json({ total: totalPessoas.rows[0].total_pessoas });
}

module.exports = {
	cadastrarPessoaController,
	BuscarPessoaPorIdController,
	ContarPessoasController,
	BuscarPessoaPorTermoController,
};
