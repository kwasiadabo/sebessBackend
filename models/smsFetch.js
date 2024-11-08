const sql = require('mssql');
const db = require('../startup/db');
const { search } = require('../routes/smsFetch');

async function insertFacility(name, phone, location, address) {
	try {
		let pool = await sql.connect(db);
		let Facility = await pool
			.request()
			.input('name', sql.NVarChar, name)
			.input('phone', sql.NVarChar, phone)
			.input('location', sql.NVarChar, location)
			.input('address', sql.NVarChar, address)
			.execute('uspInsertFacility');
		return Facility.recordsets;
	} catch (error) {
		console.log(error);
	}
}

const getFacilities = async () => {
	try {
		let pool = await sql.connect(db);
		let facilities = await pool
			.request()
			//.input('pSearch', sql.NVarChar, null)
			.execute('uspGetFacilities');
		return facilities.recordsets;
	} catch (error) {
		console.log(error);
	}
};

const getAcademicYears = async () => {
	try {
		let pool = await sql.connect(db);
		let academicYears = await pool.request().execute('uspLoadAcademicYear');
		return academicYears.recordsets;
	} catch (error) {
		console.log(error);
	}
};

const getPrograms = async () => {
	try {
		let pool = await sql.connect(db);
		let programs = await pool.request().execute('uspGetPrograms');
		return programs.recordsets;
	} catch (error) {
		console.log(error);
	}
};

const getStudentsResults = async (academicYear, program, sclass, term) => {
	try {
		let pool = await sql.connect(db);
		let results = await pool
			.request()
			.input('academicYear', sql.NVarChar, academicYear)
			.input('program', sql.NVarChar, program)
			.input('class', sql.NVarChar, sclass)
			.input('Term', sql.NVarChar, term)
			.execute('usp_sms_csv');
		return results.recordsets;
	} catch (error) {
		console.log(error);
	}
};

const getEntireStudentsResults = async (academicYear, term) => {
	try {
		let pool = await sql.connect(db);
		let results = await pool
			.request()
			.input('academicYear', sql.NVarChar, academicYear, program)
			.input('Term', sql.NVarChar, term)
			.input('program', sql.NVarChar, program)
			.execute('usp_GetEntireSchoolResults');
		return results.recordsets;
	} catch (error) {
		console.log(error);
	}
};

const getClasses = async (program) => {
	try {
		let pool = await sql.connect(db);
		let classes = await pool
			.request()
			.input('program', sql.NVarChar, program)
			.execute('uspGetSebessClass');
		return classes.recordsets;
	} catch (error) {
		console.log(error);
	}
};

const getStudentsByYear = async (academicYear, program, classe) => {
	try {
		let pool = await sql.connect(db);
		let students = await pool
			.request()
			.input('academicYear', sql.NVarChar, academicYear)
			.input('program', sql.NVarChar, program)
			.input('class', sql.NVarChar, classe)
			.execute('uspGetStudentByClassforSMS');
		return students.recordsets;
	} catch (error) {
		console.log(error);
	}
};

const loadStudents = async (search) => {
	try {
		let pool = await sql.connect(db);
		let students = await pool
			.request()
			.input('psearch', sql.NVarChar, search)
			.execute('uspGetStudents');
		return students.recordsets;
	} catch (error) {
		console.log(error);
	}
};
module.exports = {
	getAcademicYears,
	getClasses,
	getStudentsByYear,
	loadStudents,
	getStudentsResults,
	getPrograms,
	getEntireStudentsResults,
};

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
