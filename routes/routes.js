const express = require("express");
const validarPessoa = require("../middlewares/pessoa.middleware");
const router = express.Router();
const pessoaController = require("../controllers/pessoa.controller.js");

router.get("/", (req, res) => {
	res.status(200).send(`Hello world: service ${process.env.NAME}`);
});

router.post("/pessoas", validarPessoa, (req, res) => {
	console.log({ 9: req.body });
	return pessoaController(req, res);
});

module.exports = router;
