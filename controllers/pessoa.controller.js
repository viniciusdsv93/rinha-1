const {
	cadastrarPessoaService,
	buscarPessoaPorIdService,
	ContarPessoasService,
	buscarPessoaPorTermoService,
	ListarPessoasService,
} = require("../services/pessoa.service");

async function cadastrarPessoaController(req, res) {
	try {
		const pessoaCadastrada = await cadastrarPessoaService(req.body);
		if (!pessoaCadastrada.ok) {
			if (pessoaCadastrada.erro == "Apelido ja em uso") {
				return res.status(422).json({ erro: pessoaCadastrada.erro });
			}
			return res.status(400).send();
		}
		res.status(201).setHeader("Location", `/pessoas/${pessoaCadastrada.id}`).send();
	} catch (error) {
		return res.status(500).send();
	}
}

async function BuscarPessoaPorIdController(req, res) {
	try {
		const pessoaBuscada = await buscarPessoaPorIdService(req.params.id);
		if (pessoaBuscada.rowCount == 0) {
			return res.status(404).send();
		}
		res.status(200).json(pessoaBuscada.rows[0]);
	} catch (error) {
		return res.status(500).send();
	}
}

async function BuscarPessoaPorTermoController(req, res) {
	try {
		if (!req.query.t) {
			return res.status(400).send();
		}
		const pessoasBuscadas = await buscarPessoaPorTermoService(req.query.t);
		res.status(200).json(pessoasBuscadas.rows);
	} catch (error) {
		return res.status(500).send();
	}
}

async function ContarPessoasController(req, res) {
	try {
		let totalPessoas = await ContarPessoasService();
		res.status(200).json({ total: totalPessoas.rows[0].total_pessoas });
	} catch (error) {
		return res.status(500).send();
	}
}

async function ListarPessoasController(req, res) {
	try {
		let pessoas = await ListarPessoasService();
		res.status(200).json(pessoas.rows);
	} catch (error) {
		return res.status(500).send();
	}
}

module.exports = {
	cadastrarPessoaController,
	BuscarPessoaPorIdController,
	ContarPessoasController,
	BuscarPessoaPorTermoController,
	ListarPessoasController,
};
