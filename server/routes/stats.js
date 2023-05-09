const router = require('express').Router();

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
		var dat = await app.stores.links.create({url: req.body.link, name: req.body.name, hid: req.body.hid ?? genCode() });
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

	app.use('/api/stats', router);
}