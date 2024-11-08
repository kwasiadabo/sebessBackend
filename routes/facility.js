const Facility = require('../models/facility');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const Joi = require('joi');

router.post('/', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	const schema = Joi.object({
		name: Joi.string().required().label('Name of Facility'),
		phone: Joi.string().required().label('Phone'),
		location: Joi.string().required().label('Location'),
		address: Joi.string().required().label('address'),
	});

	const { error } = schema.validate(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	const result = await Facility.insertFacility(
		req.body.name,
		req.body.phone,
		req.body.location,
		req.body.address
	);
	res.json(result[0]);
});

router.get('/', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	const results = await Facility.getFacilities();
	//res.send(results[0])
	res.json(results[0]);
});

module.exports = router;
