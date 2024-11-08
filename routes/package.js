const Package = require('../models/package');
const express = require('express');
const router = express.Router();

const Joi = require('joi');

router.post('/', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	const schema = Joi.object({
		name: Joi.string().required().label('Name of Package'),
		description: Joi.string().required().label('description'),
		amount: Joi.number().required().label('Amount'),
		frequency: Joi.string().required().label('Frequency'),
	});

	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const result = await Package.insertPackage(
		req.body.name,
		req.body.description,
		req.body.amount,
		req.body.frequency
	);
	res.json(result[0]);
});

router.get('/', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	const results = await Package.getPackages();
	//res.send(results[0])
	res.json(results[0]);
});

module.exports = router;
