const express = require("express");

const app = express();

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
	res.status(200).send(`Hello world: service ${process.env.NAME}`);
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});