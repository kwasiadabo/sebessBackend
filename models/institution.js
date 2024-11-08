const sql = require('mssql')
const db = require('../startup/db')

async function insertInstitution(name, phone, location, address) {
  try {
    let pool = await sql.connect(db)
    let Package = await pool
      .request()
      .input('name', sql.NVarChar, name)
      .input('phone', sql.NVarChar, phone)
      .input('location', sql.NVarChar, location)
      .input('address', sql.NVarChar, address)
      .execute('uspInsertInstitution')
    return Package.recordsets
  } catch (error) {
    console.log(error)
  }
}

const getInstitutions = async () => {
  try {
    let pool = await sql.connect(db)
    let institutions = await pool
      .request()
      //.input('pSearch', sql.NVarChar, null)
      .execute('uspGetInstitutions')
    return institutions.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getInstitutions,
  insertInstitution,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
