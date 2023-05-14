const router = require('express').Router();

function genCode(table = process.env.CHARS, num = 4) {
	var str = "";
	var ind = 0;
	while (ind < num){
		str += table[Math.floor(Math.random() * (table.length))];
		ind += 1;
	}
	return str;
}

module.exports = (app) => {
	router.get('/', async (req, res) => {
		if(!req.verified) {
			return res.status(401).send();
		} else {
			var links = await app.stores.links.getAll();
			res.send(links);
		}
	});

	router.post('/', async (req,res) => {
		if(!req.verified) return res.status(401).send();
		var hid;
		if(req.body.hid?.length) hid = req.body.hid;
		else hid = genCode();
		console.log(hid);
		var dat = await app.stores.links.create({
			url: req.body.url,
			name: req.body.name, hid
		});
		res.status(200).send(dat);
	})

	router.patch('/:id', async (req,res) => {
		if(!req.verified) return res.status(401).send();
		var link = await app.stores.links.get(req.params.id);
		if(!link?.id) return res.status(404).send();

		link.url = req.body.link ?? link.url;
		link.name = req.body.name ?? link.name;
		await link.save();
		res.status(200).send(dat);
	})

	router.delete('/:id', async (req, res) => {
		if(!req.verified) return res.status(401).send();
		var link = await app.stores.links.get(req.params.id);
		console.log(link)
		if(!link?.id) return res.status(404).send();
		await link.delete();
		res.status(204).send();
	})

	app.use('/links', router);
}