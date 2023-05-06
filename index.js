const express	= require('express');
const cookparse	= require('cookie-parser');
const { Pool } 	= require('pg');
const path		= require('path');

require('dotenv').config();

const db = new Pool();

const app = express();

app.set("view-engine","ejs");
app.set("views","./pages");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookparse());
app.use(userAuth);

app.use(express.static(__dirname + '/public'));

const URL = process.env.URL;

const genCode = function(table,num) {
	var codestring="";
	var codenum=0;
	while (codenum<(num==undefined ? 4 : num)){
		codestring=codestring+table[Math.floor(Math.random() * (table.length))];
		codenum=codenum+1;
	}
	return codestring;
}

async function setup() {
	await db.query(`
		CREATE TABLE IF NOT EXISTS links (
			id		VARCHAR(8) PRIMARY KEY,
			url 	TEXT NOT NULL,
			name 	TEXT
		);

		CREATE TABLE IF NOT EXISTS users (
			id 			SERIAL PRIMARY KEY,
			name 		TEXT,
			password 	TEXT
		);

		CREATE TABLE IF NOT EXISTS stats (
			id 			SERIAL PRIMARY KEY,
			lid 		TEXT references links(id) on delete cascade,
			date 		DATE
		);
	`)
}

async function userAuth(req, res, next) {
	var user = (req.cookies.user ? JSON.parse(req.cookies.user) : {username: req.body.username, pass: req.body.pass});
	try {
		const q = await db.query(`SELECT * FROM users WHERE name = $1 AND password = $2`,[user.username, user.pass]);
		if(q.rows[0]) {
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

async function getLink(link) {
	try {
		var data = await db.query(`SELECT * FROM links WHERE url = $1`,[link]);
		if(data.rows[0]) {
			res(data.rows[0]);
		} else {
			return undefined;
		}
	} catch(err) {
		console.log(err);
		return undefined;
	}
}

async function getLinkID(id) {
	try {
		var data = await db.query(`SELECT * FROM links WHERE id = $1`,[id]);
		if(data.rows[0]) {
			return data.rows[0];
		} else {
			return undefined;
		}
	} catch(err) {
		console.log(err);
		return undefined;
	}
}

async function getLinks() {
	try {
		var data = await db.query(`SELECT * FROM links`);
		if(data.rows?.[0]) return data.rows;
		else return [];
	} catch(err) {
		console.log(err);
		return "ERR";
	}
}

async function createLink(link, name, id) {
	var exists = await getLink(link);
	if(exists) return res({status:'EXISTS', link: URL+exists.id});
	if(id) exists = await getLinkID(id);
	if(exists) res({status:'EXISTS', link: URL+exists.id});
	
	var code;
	if(id) code = id;
	else code = genCode(process.env.CHARS);
	console.log(code);

	try {
		await db.query(`INSERT INTO links (id, url, name) VALUES ($1, $2, $3)`,[code, link, name]);

		return {status: "OK", link: URL+code};
	} catch(err) {
		console.log(err);
		return "ERR"
	}
}

async function deleteLink(id) {
	var exists = await getLinkID(id);
	if(!exists) return {status:'DOES NOT EXIST'};

	try {
		await db.query(`DELETE FROM links WHERE id = $1`,[id]);
		return {status: "OK"};
	} catch(err) {
		console.log(err);
		return {status: "ERR"};
	}
}

async function getStats() {
	try {
		var data = await db.query(`SELECT * FROM stats`);
		if(data.rows?.[0]) {
			var links = { };
			for(var d of data.rows) {
				console.log(d);
				if(!links[d.lid]) links[d.lid] = { count: 0, dates: { }};
				links[d.lid].count += 1;
				if(!links[d.lid].dates[d.date]) links[d.lid].dates[d.date] = 0;
				links[d.lid].dates[d.date] += 1;
			}
			console.log(links);
			return links;
		} else return [];
	} catch(err) {
		console.log(err);
		return "ERR";
	}
}

async function addStat(link) {
	try {
		await db.query(`INSERT INTO stats (lid, date) VALUES ($1, $2)`, [link, new Date()]);
	} catch(e) {
		console.log(e);
		return e;
	}
}

app.get("/", async (req, res) => {
	var logged;
	var links = await getLinks();
	var stats = await getStats();
	res.render("index.ejs",{ logged_in: req.verified, links, stats, url: URL });
})

app.get("/:id", async (req, res) => {
	var link = await getLinkID(req.params.id);
	if(link) {
		await addStat(link.id);
		res.redirect(link.url);
	} else {
		res.send({status: "NOT FOUND"});
	}
})

app.post("/link", async (req,res) => {
	if(!req.verified) return res.send({status: "INVALID LOGIN."});
	var dat = await createLink(req.body.link, req.body.name, req.body.id || undefined);
	res.send(dat);
})

app.post("/unlink", async (req, res) => {
	if(!req.verified) return res.send({status: "INVALID LOGIN."});
	var dat = await deleteLink(req.body.link);
	res.send(dat);
})

app.post("/links", async (req, res) => {
	if(!req.verified) {
		return res.send({status: "INVALID LOGIN."});
	} else {
		links = await getLinks();
		res.send(links);
	}
})

app.post("/login", async (req, res) => {
	if(!req.verified) {
		res.send({status: "INVALID LOGIN."})
		return;
	}
	res.cookie('user', JSON.stringify({username: req.body.username, pass: req.body.pass}), {expires: new Date("1/1/2030")});
	res.send({status: 'OK'});
})

setup()
.then(() => app.listen(process.env.PORT || 8080));

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