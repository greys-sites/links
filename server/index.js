const express	= require('express');
const path		= require('path');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(userAuth);

const URL = process.env.URL;

async function setup() {
	const { db, stores } = await require('./stores/__db')();

	app.db = db;
	app.stores = stores;

	await require('./routes')(app);
}

async function userAuth(req, res, next) {
	var token = req.headers.authorization ?? req.body.token;
	try {
		const t = await app.stores.tokens.get(token);
		if(t?.id) {
			req.verified = true;
		} else {
			req.verified = false;
		}
	} catch(err) {
		console.log(err);
		req.verified = false;
	}
	next()
}

app.get("/", async (req, res) => {
	return res.send(":)");
})

setup()
.then(() => {
	app.listen(process.env.PORT || 8080);
	console.log('app started');
});

process.on('SIGINT',() => {
	app.db.end(()=>{
		console.log("connection severed");
		process.exit();
	})
})

process.on('SIGTERM', () => {
	app.db.end(()=>{
		console.log("connection severed");
		process.exit();
	})
})