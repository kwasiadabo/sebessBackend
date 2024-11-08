const smsFetch = require('../models/smsFetch');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const app = express();
const fetch = require('node-fetch');

const smsSenderId = 'SEBESS';
const smsUsername = 'adabo';
const smsPswd = 'Kaw3se4dr5$$1';
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.post('/generalsms', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	console.log(req.body);
	const x = req.body;

	const msgs = x.map((i) => {
		const msg = `Hello ${i.FullName}, ${i.message}`;
		let requestOptions = {
			method: 'GET',
			redirect: 'follow',
		};

		fetch(
			`https://sms.nalosolutions.com/smsbackend/clientapi/Resl_Nalo/send-message/?username=${smsUsername}&password=${smsPswd}&type=0&destination=${i.Tel}&dlr=1&source=${smsSenderId}&message=${msg}`,
			requestOptions
		)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error));
	});
	//console.log(`${x.length} message(s) submitted`);
	res.status(200).send(`${x.length} message(s) submitted`);
});

router.post('/smsresults', async (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	//console.log(req.body);
	const x = req.body;
	const msgs = x.map((i) => {
		const msg = `Hello ${i.StudentName}, Your exam results for ${i.academicYear}, ${i.term} semester are as follows: -> ${i.Grade}`;
		//   //console.log(i)
		let requestOptions = {
			method: 'GET',
			redirect: 'follow',
		};
		console.log(i.phone_Number);

		fetch(
			`https://sms.nalosolutions.com/smsbackend/clientapi/Resl_Nalo/send-message/?username=${smsUsername}&password=${smsPswd}&type=0&destination=${i.phone_Number}&dlr=1&source=${smsSenderId}&message=${msg}`,
			requestOptions
		)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log('error', error));
	});
	//console.log(x.results.length)
	res.status(200).send(`${x.length} student(s) Results Sent`);
});

router.get('/academicyear', (request, response) => {
	response.header('Access-Control-Allow-Origin', '*');
	smsFetch.getAcademicYears().then((result) => {
		response.json(result[0]);
	});
});

router.get('/programs', (request, response) => {
	response.header('Access-Control-Allow-Origin', '*');
	smsFetch.getPrograms().then((result) => {
		response.json(result[0]);
	});
});

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Get a list of classes
 *     description: Retrieve a list of classes from the database.
 *     responses:
 *       200:
 *         description: Successful response with a list of classes.
 */
router.get('/classes/:program', (request, response) => {
	response.header('Access-Control-Allow-Origin', '*');
	smsFetch.getClasses(request.params.program).then((result) => {
		response.json(result[0]);
	});
});
router.get('/student/:academicyear/:program/:classe', (request, response) => {
	response.header('Access-Control-Allow-Origin', '*');
	console.log(request.params);
	const { academicyear, program, classe } = request.params;
	smsFetch.getStudentsByYear(academicyear, program, classe).then((result) => {
		response.json(result[0]);
	});
});

router.get(
	'/results/:academicyear/:program/:sclass/:term',
	(request, response) => {
		response.header('Access-Control-Allow-Origin', '*');
		const { academicyear, program, sclass, term } = request.params;
		smsFetch
			.getStudentsResults(academicyear, program, sclass, term)
			.then((result) => {
				response.json(result[0]);
			});
	}
);

router.get('/entire/:academicyear/:term/:program', (request, response) => {
	response.header('Access-Control-Allow-Origin', '*');
	const { academicyear, term, program } = request.params;
	smsFetch
		.getEntireStudentsResults(academicyear, term, program)
		.then((result) => {
			response.json(result[0]);
		});
});

router.get('/allStudents/:search', (request, response) => {
	response.header('Access-Control-Allow-Origin', '*');
	const { search } = request.params;
	smsFetch.loadStudents(search).then((result) => {
		response.json(result[0]);
	});
});

module.exports = router;
