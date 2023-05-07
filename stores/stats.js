const { DataStore, DataObject } = require('./__models');

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
	constructor(db, stores) {
		super(db, stores);
	}

	async init() {
		await this.db.query(`
			CREATE TABLE IF NOT EXISTS stats (
				id 			SERIAL PRIMARY KEY,
				lid 		TEXT references links(hid) on delete cascade,
				date 		DATE
			)
		`);
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
				if(!stats[stat.date]) stats[stat.date] = 0;
				stats[stat.date] += 1;
			}
			console.log(stats);
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
			for(var stat of stats) {
				if(!stats[stat.lid]) stats[stat.lid] = { count: 0, dates: { } };
				if(!stats[stat.lid].dates[stat.date]) stats[stat.lid].dates[stat.date] = 0;
				stats[stats.lid].dates[stat.date] += 1;
				stats[stats.lid].count += 1;
			}
			
			console.log(stats);
			return stats;
		} else return undefined;
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

module.exports = (db, stores) => new StatStore(db, stores);