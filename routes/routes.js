const express = require("express");
const validarPessoa = require("../middlewares/pessoa.middleware");
const router = express.Router();
const {
	cadastrarPessoaController,
	BuscarPessoaPorIdController,
	ContarPessoasController,
	BuscarPessoaPorTermoController,
} = require("../controllers/pessoa.controller.js");

router.get("/", (req, res) => {
	res.status(200).send(`Hello world: service ${process.env.NAME}`);
});

router.post("/pessoas", validarPessoa, (req, res) => {
	return cadastrarPessoaController(req, res);
});

router.get("/pessoas/:id", (req, res) => {
	return BuscarPessoaPorIdController(req, res);
});

router.get("/pessoas", (req, res) => {
	return BuscarPessoaPorTermoController(req, res);
});

router.get("/contagem-pessoas", (req, res) => {
	return ContarPessoasController(req, res);
});

module.exports = router;
