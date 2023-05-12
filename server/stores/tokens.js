const { DataStore, DataObject } = require('./__models');

const KEYS = {
	id: { },
	label: { patch: true },
	token: { }
}

class Token extends DataObject {
	constructor(store, keys, data) {
		super(store, keys, data);
	}
}

class TokenStore extends DataStore {
	constructor(db, stores) {
		super(db, stores);
	}

	async init() {
		await this.db.query(`
			CREATE TABLE IF NOT EXISTS tokens (
				id 		SERIAL PRIMARY KEY,
				label	TEXT,
				token	TEXT
			);

			create or replace function new_token() returns text as
			'select substr(md5(random()::text), 0, 32);'
			language SQL volatile;
		`);
	}

	async create(data = {}) {
		try {
			var c = await this.db.query(`
				INSERT INTO tokens (
					label,
					token
				) VALUES ($1, new_token())
				RETURNING id
			`, [data.label]);
		} catch(e) {
			console.log(e);
			return Promise.reject(e);
		}

		return await this.getID(c.rows[0].id);
	}

	async get(token) {
		try {
			var d = await this.db.query(`
				select * from tokens where token = $1
			`, [token]);
		} catch(e) {
			console.log(e);
			return Promise.rejet(e);
		}

		if(d.rows?.[0]) return new Token(this, KEYS, d.rows[0]);
		else return new Token(this, KEYS, { });
	}

	async getLabel(label
) {
		try {
			var d = await this.db.query(`
				select * from tokens where label = $1
			`, [label]);
		} catch(e) {
			console.log(e);
			return Promise.rejet(e);
		}

		if(d.rows?.[0]) return new Token(this, KEYS, d.rows[0]);
		else return new Token(this, KEYS, { });
	}

	async getID(id) {
		try {
			var d = await this.db.query(`
				select * from tokens where id = $1
			`, [id]);
		} catch(e) {
			console.log(e);
			return Promise.rejet(e);
		}

		if(d.rows?.[0]) return new Token(this, KEYS, d.rows[0]);
		else return new Token(this, KEYS, { });
	}

	async update(id, data = {}) {
		try {
			await this.db.query(`
				update tokens
				SET ${Object.keys(data).map((k, i) => k+"=$"+(i+2)).join(",")}
				WHERE id = $1
			`, [id, ...Object.values(data)]);
		} catch(e) {
			console.log(e);
			return Promise.reject(e.message);
		}

		return await this.getID(id);
	}

	async delete(id) {
		try {
			await this.db.query(`
				delete from tokens where id = $1
			`, [id]);
		} catch(e) {
			console.log(e);
			return Promise.reject(e.message);
		}
		
		return;
	}

	async deleteAll() {
		try {
			await this.db.query(`
				delete from tokens
			`);
		} catch(e) {
			console.log(e);
			return Promise.reject(e.message);
		}
		
		return;
	}
}

module.exports = (db, stores) => new TokenStore(db, stores);