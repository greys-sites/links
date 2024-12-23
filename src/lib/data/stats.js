import { DataStore, DataObject } from './__models';
import pool from './__db';

import { formatDate } from '$lib/utils';

const KEYS = {
	id: { },
	lid: { },
	date: { }
}

class Stats extends DataObject {
	constructor(store, keys, data) {
		super(store, keys, data);
	}
}

class StatStore extends DataStore {
	constructor(db) {
		super(db);
	}

	async init() {
	}

	async create(data = {}) {
		try {
			var c = await this.db.query(`
				INSERT INTO stats (
					lid,
					date
				) VALUES ($1, $2)
				RETURNING id
			`, [data.lid, data.date ?? new Date()]);
		} catch(e) {
			console.log(e);
			return Promise.reject(e);
		}

		return await this.getID(c.rows[0].id);
	}

	async getLinkStats(lid) {
		try {
			var d = await this.db.query(`
				select * from stats
				where lid = $1
			`, [lid]);
		} catch(e) {
			console.log(e);
			return Promise.reject(e);
		}

		if(d.rows?.[0]) {
			var stats = { };
			for(var stat of stats) {
				let dt = stat.date.toISOString();
				if(!stats[dt]) stats[dt] = 0;
				stats[dt] += 1;
			}
			return stats;
		} else return {};
	}

	async getAll() {
		try {
			var d = await this.db.query(`
				select * from stats
			`);
		} catch(e) {
			console.log(e);
			return Promise.reject(e);
		}

		if(d.rows?.[0]) {
			var stats = { };
			for(var stat of d.rows) {
				let dt = (stat.date.toISOString());
				if(!stats[stat.lid]) stats[stat.lid] = { count: 0, dates: { } };
				if(!stats[stat.lid].dates[dt]) stats[stat.lid].dates[dt] = 0;
				stats[stat.lid].dates[dt] += 1;
				stats[stat.lid].count += 1;
			}
			
			return stats;
		} else return {};
	}

	async getBetween(from, to) {
		try {
			var d = await this.db.query(`
				select * from stats where
				date >= $1 and
				date <= $2
			`, [from, to]);
		} catch(e) {
			console.log(e);
			return Promise.reject(e);
		}

		if(d.rows?.[0]) {
			return d.rows;
		} else return {};
	}

	async getID(id) {
		try {
			var d = await this.db.query(`
				select * from stats where id = $1
			`, [id]);
		} catch(e) {
			console.log(e);
			return Promise.rejet(e);
		}

		if(d.rows?.[0]) return new Stats(this, KEYS, d.rows[0]);
		else return new Stats(this, KEYS, { });
	}

	async delete(id) {

	}

	async deleteAll() {

	}
}

const stats = new StatStore(pool);
await stats.init();

export default stats;