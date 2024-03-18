const express = require("express");
const validarPessoa = require("../middlewares/pessoa.middleware");
const router = express.Router();

router.get("/", (req, res) => {
	res.status(200).send(`Hello world: service ${process.env.NAME}`);
});

router.post("/pessoas", validarPessoa, (req, res) => {
	console.log({ 9: req.body });
	res.status(201).json({ ok: "Pessoa cadastrada" });
});

module.exports = router;
