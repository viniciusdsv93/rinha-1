const controleApelidos = require("..");

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
		return res.status(400).json({ erro: "Apelido deve ter até 32 caracteres" });
	}

	// TODO checar no redis se apelido ja foi cadastrado anteriormente
	if (controleApelidos[apelido]) {
		return res.status(422).json({ erro: `Apelido ${apelido} ja em uso` });
	}

	if (typeof nome != "string") {
		return res.status(400).send();
	}

	if (nome.length > 100) {
		return res.status(400).json({ erro: "Nome deve ter até 100 caracteres" });
	}

	if (nascimento.split("-").join("").length != 8 || isNaN(Date.parse(nascimento))) {
		return res
			.status(400)
			.json({ erro: "Nascimento deve estar no formato AAAA-MM-DD" });
	}

	if (stack && !Array.isArray(stack)) {
		return res.status(400).json({ erro: "Stack deve ser um array" });
	}

	if (stack && stack.length == 0) {
		return res.status(400).json({ erro: "Deve conter pelo menos um elemento" });
	}

	if (stack) {
		let haElementoNaoStringOuNullOuExtenso = stack.some(
			(el) => typeof el != "string" || !el || el.length > 32
		);
		if (haElementoNaoStringOuNullOuExtenso) {
			return res
				.status(400)
				.json({ erro: "Ha elemento nao string ou maior que 32 caracteres" });
		}
	}

	next();
}

module.exports = validarPessoa;
