function validarPessoa(req, res, next) {
	const { nome, apelido, nascimento, stack } = req.body;

	if (!nome || !apelido || !nascimento) {
		return res.status(422).json({
			erro: "Faltando um dos seguintes parametros: nome, apelido, nascimento",
		});
	}

	if (typeof apelido != "string") {
		return res.status(422).json({ erro: "Apelido deve ser do tipo string" });
	}

	if (apelido.length > 32) {
		return res.status(422).json({ erro: "Apelido deve ter até 32 caracteres" });
	}

	if (nome.length > 100) {
		return res.status(422).json({ erro: "Nome deve ter até 100 caracteres" });
	}

	if (nascimento.split("-").join("").length != 8 || isNaN(Date.parse(nascimento))) {
		return res
			.status(422)
			.json({ erro: "Nascimento deve estar no formato AAAA-MM-DD" });
	}

	next();
}

module.exports = validarPessoa;
