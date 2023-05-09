const { DataStore, DataObject } = require('./__models');

const KEYS = {
	id: { },
	hid: { },
	name: { patch: true },
	url: { patch: true }
}

class Link extends DataObject {
	constructor(store, keys, data) {
		super(store, keys, data);
	}

	async getStats() {
		var stats = await this.stores.stats.getLinkStats(this.hid);

		this.stats = stats;
		return stats;
	}
}

class LinkStore extends DataStore {
	constructor(db, stores) {
		super(db, stores);
	}

	async init() {
		await this.db.query(`
			CREATE TABLE IF NOT EXISTS links (
				id		SERIAL PRIMARY KEY,
				hid 	TEXT UNIQUE,
				url		TEXT,
				name 	TEXT
			)
		`)
	}

	async create(data = {}) {
		try {
			var c = await this.db.query(`
				INSERT INTO links (
					hid,
					url,
					name
				) VALUES ($1, $2, $3)
				RETURNING id
			`, [data.hid, data.url, data.name]);
		} catch(e) {
			console.log(e);
			return Promise.reject(e);
		}

		return await this.getID(c.rows[0].id);
	}

	async get(hid) {
		try {
			var d = await this.db.query(`
				select * from links where hid = $1
			`, [hid]);
		} catch(e) {
			console.log(e);
			return Promise.rejet(e);
		}

		console.log(d.rows)
		if(d.rows?.[0]) return new Link(this, KEYS, d.rows[0]);
		else return new Link(this, KEYS, { });
	}

	async getUrl(url) {
		try {
			var d = await this.db.query(`
				select * from links where url = $1
			`, [url]);
		} catch(e) {
			console.log(e);
			return Promise.rejet(e);
		}

		if(d.rows?.[0]) return new Link(this, KEYS, d.rows[0]);
		else return new Link(this, KEYS, { });
	}

	async getAll() {
		try {
			var d = await this.db.query(`
				select * from links
			`);
		} catch(e) {
			console.log(e);
			return Promise.rejet(e);
		}

		if(d.rows?.[0]) return d.rows.map(x => new Link(this, KEYS, x));
		else return [];
	}

	async getID(id) {
		try {
			var d = await this.db.query(`
				select * from links where id = $1
			`, [id]);
		} catch(e) {
			console.log(e);
			return Promise.rejet(e);
		}

		if(d.rows?.[0]) return new Link(this, KEYS, d.rows[0]);
		else return new Link(this, KEYS, { });
	}

	async update(id, data = {}) {
		try {
			await this.db.query(`
				update links
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
				delete from links where id = $1
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
				delete from links
			`);
		} catch(e) {
			console.log(e);
			return Promise.reject(e.message);
		}
		
		return;
	}
}

module.exports = (db, stores) => new LinkStore(db, stores);