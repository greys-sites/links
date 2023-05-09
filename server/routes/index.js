const fs = require('fs');
module.exports = async (app) => {
	const files = fs.readdirSync(__dirname);
	for(var f of files) {
		if(['index.js'].includes(f)) continue;
		var n = f.slice(0, -3);
		await require(`${__dirname}/${f}`)(app);
	}
}