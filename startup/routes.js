const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');
const facility = require('../routes/facility');
const packages = require('../routes/package');
const institutions = require('../routes/institution');
const smsFetch = require('../routes/smsFetch');
// const unitHead = require('../routes/unitHead')
const menus = require('../routes/menus');
// const staff = require('../routes/staff')
// const bank = require('../routes/bank')
// const attendance = require('../routes/attendance')
// const leaveYear = require('../routes/leaveYear')
// const unitSupervisor = require('../routes/unitSupervisors')
// const planYear = require('../routes/planYear')
// const leavePlan = require('../routes/leavePlan')
// const holidays = require('../routes/holidays')
// const salarySetup = require('../routes/salarysetup')
// const specialty = require('../routes/specialty')
// const employee = require('../routes/employeeDetails')
// const Auth = require('../routes/auth');
// const LeaveAuth = require('../routes/leaveauth');
// const nationality = require('../routes/nationality')
// const directorate = require('../routes/directorate')
// const department = require('../routes/department')
// const grade = require('../routes/grade')
// const category = require('../routes/category')
// const appointment = require('../routes/appointment')
// const currentPost = require('../routes/currentPost')
// const unit = require('../routes/unit')
const express = require('express');
const cors = require('cors');
//const app = express()
// const router = express.Router();

const apiPrefix = 'api';

module.exports = function (app) {
	app.use(express.urlencoded({ extended: true }));
	app.use(express.json());
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

	//app.use(cors())
	// app.use('/' + apiPrefix + '/users', users)
	app.use('/' + apiPrefix + '/menus', menus);
	// app.use('/api/staff', staff)
	// app.use('/api/nationality', nationality)
	// app.use('/api/users', users)
	//app.use('/api/staff', staff);
	// app.use('/api/leaveplan', leavePlan)
	// app.use('/api/auth', Auth)
	//app.use('/api/auth', Auth);
	app.use('/api/facilities', facility);
	app.use('/api/packages', packages);
	app.use('/api/institutions', institutions);
	app.use('/api/smsfetch', smsFetch);
	// app.use('/api/unit', unit)
	// app.use('/api/leaveType', leaveType)
	// app.use('/api/employee', employee)
	// app.use('/api/grade', grade)
	// app.use('/api/category', category)
	// app.use('/api/salarysetup', salarySetup)
	// app.use('/api/specialty', specialty)
	// app.use('/api/appointment', appointment)
	// app.use('/api/currentPost', currentPost)
	// app.use('/api/holidays', holidays)
	// app.use('/api/leaveyear', leaveYear)
	// app.use('/api/supervisor', unitSupervisor)
	// app.use('/api/planyear', planYear)
	// app.use('/api/depthead', deptHead)
	// app.use('/api/unithead', unitHead)
	// app.use('/api/attendance', attendance)
	// app.use('/api/leaverequest', leaveRequest)
};
