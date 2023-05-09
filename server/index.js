const express	= require('express');
const cookparse	= require('cookie-parser');
const { Pool } 	= require('pg');
const path		= require('path');
const cors = require('cors');

require('dotenv').config();

const db = new Pool();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookparse());
app.use(userAuth);

const URL = process.env.URL;

const genCode = function(table = process.env.CHARS, num = 4) {
	var str = "";
	var ind = 0;
	while (ind < num){
		str += table[Math.floor(Math.random() * (table.length))];
		ind += 1;
	}
	return str;
}

async function setup() {
	const { db, stores } = await require('./stores/__db')();

	app.db = db;
	app.stores = stores;

	await require('./routes')(app);
}

async function userAuth(req, res, next) {
	var user = req.cookies.user ? JSON.parse(req.cookies.user) : { token: req.headers.authorization ?? req.body.token };
	try {
		const q = await db.query(`SELECT * FROM tokens WHERE token = $1`,[user.token]);
		if(q.rows?.[0]) {
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

app.post("/login", async (req, res) => {
	if(!req.verified) {
		res.status(401).send()
		return;
	}
	res.cookie('user', JSON.stringify({ token: req.headers.authorization ?? req.body.token }), {expires: new Date("1/1/2030")});
	res.status(200).send();
})

app.get("*", (req, res) => {
	return res.status(404).send();
})

setup()
.then(() => {
	app.listen(process.env.PORT || 8080);
	console.log('app started');
});

process.on('SIGINT',() => {
	db.end(()=>{
		console.log("connection severed");
		process.exit();
	})
})

process.on('SIGTERM', () => {
	db.end(()=>{
		console.log("connection severed");
		process.exit();
	})
})