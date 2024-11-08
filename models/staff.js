const sql = require('mssql')
const db = require('../startup/db')

async function insertStaff(
  title,
  firstName,
  lastName,
  otherName,
  gender,
  nationality,
  staffCode,
  position,
  marritalStatus,
  picture,
  dob,
  phone,
  nationalId,
) {
  try {
    let pool = await sql.connect(db)
    let Staff = await pool
      .request()
      .input('title', sql.NVarChar, title)
      .input('firstName', sql.NVarChar, firstName)
      .input('lastName', sql.NVarChar, lastName)
      .input('otherName', sql.NVarChar, otherName)
      .input('gender', sql.NVarChar, gender)
      .input('nationality', sql.NVarChar, nationality)
      .input('staffCode', sql.NVarChar, staffCode)
      .input('position', sql.NVarChar, position)
      .input('marritalStatus', sql.NVarChar, marritalStatus)
      .input('picture', sql.Image, picture)
      .input('Dob', sql.NVarChar, dob)
      .input('phone', sql.NVarChar, phone)
      .input('nationalId', sql.NVarChar, nationalId)
      .execute('uspInsertStaff')
    return Staff.recordsets
  } catch (error) {
    console.log(error)
  }
}

const getAllStaff = async () => {
  try {
    let pool = await sql.connect(db)
    let staffResults = await pool
      .request()
      //.input('pSearch', sql.NVarChar, null)
      .execute('uspGetStaff')
    return staffResults.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getAllStaff,
  insertStaff,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
