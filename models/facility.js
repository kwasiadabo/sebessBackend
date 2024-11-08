const sql = require('mssql');
const db = require('../startup/db');

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

module.exports = {
	getFacilities,
	insertFacility,
};

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
