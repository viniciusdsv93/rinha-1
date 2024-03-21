const pg = require("pg");

const URL = process.env.DB_URL || "postgres://postgres:12345678@postgres:5432/postgres";

const pool = new pg.Pool({
	connectionString: URL,
	max: Number(process.env.DB_POOL) || 200,
	idleTimeoutMillis: 0,
	connectionTimeoutMillis: 10000,
});

async function connect() {
	try {
		console.log(`Connecting to db ${URL}`);
		await pool.connect();
	} catch (err) {
		setTimeout(() => {
			connect();
			console.log(
				`database.js: an error occured when connecting ${err} retrying connection on 3 secs`
			);
		}, 3000);
	}
}

pool.on("error", connect);

pool.once("connect", () => {
	return pool.query(`
      CREATE TABLE IF NOT EXISTS pessoas (
          id VARCHAR(255) PRIMARY KEY,
          apelido VARCHAR(32) UNIQUE NOT NULL,
          nome VARCHAR(100) NOT NULL,
          nascimento DATE NOT NULL,
          stack JSON
      ); 
    `);
});

//CREATE UNIQUE INDEX IF NOT EXISTS pessoas_apelido_index ON public.pessoas USING btree (apelido);

connect();

async function inserirPessoa(pessoa) {
	const { uuid, apelido, nome, nascimento, stack } = pessoa;
	const query = `
    INSERT INTO
     pessoas(
        id,
        apelido,
        nome,
        nascimento,
        stack
     )
    VALUES (
        $1,
        $2,
        $3,
        $4,
        $5::json
    )
    `;
	return pool.query(query, [uuid, apelido, nome, nascimento, JSON.stringify(stack)]);
}

async function checarDuplicidadeApelido(apelido) {
	const query = `SELECT * FROM pessoas WHERE apelido = $1`;
	return pool.query(query, [apelido]);
}

async function buscarPessoaPorId(id) {
	const query = `SELECT * FROM pessoas WHERE id = $1`;
	return pool.query(query, [id]);
}

async function buscarPessoaPorTermo(termo) {
	const query = `SELECT * FROM pessoas WHERE nome ILIKE $1 OR apelido ILIKE $1 OR stack::TEXT ILIKE $1 LIMIT 50`;
	return pool.query(query, [`%${termo}%`]);
}

async function contarPessoas() {
	const query = `SELECT count(id) as total_pessoas FROM pessoas`;
	return pool.query(query, []);
}

async function listarPessoas() {
	const query = `SELECT * FROM pessoas`;
	return pool.query(query, []);
}

module.exports = {
	inserirPessoa,
	checarDuplicidadeApelido,
	buscarPessoaPorId,
	buscarPessoaPorTermo,
	contarPessoas,
	listarPessoas,
};
