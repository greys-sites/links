const router = require('express').Router();

module.exports = (app) => {
	router.get('/', async (req, res) => {
		if(!req.verified) {
			return res.status(404).send();
		} else {
			res.status(200).send();
		}
	});

	router.post('/', async (req,res) => {
		if(!req.verified) return res.status(401).send();
		var dat = await app.stores.tokens.create({
			label: req.body.label
		});
		res.status(200).send(dat);
	})

	router.delete('/:label', async (req, res) => {
		if(!req.verified) return res.status(401).send();
		var tk = await app.stores.tokens.getLabel(req.params.label);
		if(!tk?.id) return res.status(404).send();
		await tk.delete();
		res.status(204).send();
	})

	app.use('/users', router);
}