import { DataStore, DataObject } from './__models';
import pool from './__db';

import Stats from './stats';

const KEYS = {
	id: { },
	hid: { },
	name: { patch: true },
	url: { patch: true },
	description: { patch: true },
	visible: { patch: true }
}

class Link extends DataObject {
	constructor(store, keys, data) {
		super(store, keys, data);
	}

	async getStats() {
		var stats = await Stats.getLinkStats(this.hid);

		this.stats = stats;
		return stats;
	}
}

class LinkStore extends DataStore {
	constructor(db) {
		super(db);
	}

	async init() {
	}

	async create(data = {}) {
		console.log(data);
		try {
			var c = await this.db.query(`
				INSERT INTO links (
					hid,
					url,
					name,
					description,
					visible
				) VALUES ((select coalesce($1,find_unique('links'))), $2, $3, $4, $5)
				RETURNING id
			`, [data.hid, data.url, data.name, data.description, data.visible]);
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

const links = new LinkStore(pool);
await links.init();

export default links;