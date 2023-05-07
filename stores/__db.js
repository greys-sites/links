const { Pool } = require('pg');
const fs = require('fs');
module.exports = async () => {
	const db = new Pool();
	const stores = {};

	const files = fs.readdirSync(__dirname);
	for(var f of files) {
		if(['__db.js', '__models.js'].includes(f)) continue;
		var n = f.slice(0, -3);
		console.log(f);
		stores[n] = require(`${__dirname}/${f}`)(db, stores);
		if(stores[n].init) await stores[n].init();
	}

	for(var x in stores) { console.log(x.stores) };
	return { db, stores };
}