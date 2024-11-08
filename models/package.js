const sql = require('mssql')
const db = require('../startup/db')

async function insertPackage(name, description, amount, frequency) {
  try {
    let pool = await sql.connect(db)
    let Package = await pool
      .request()
      .input('name', sql.NVarChar, name)
      .input('description', sql.NVarChar, description)
      .input('amount', sql.Money, amount)
      .input('frequency', sql.NVarChar, frequency)

      .execute('uspInsertPackage')
    return Package.recordsets
  } catch (error) {
    console.log(error)
  }
}

const getPackages = async () => {
  try {
    let pool = await sql.connect(db)
    let packages = await pool
      .request()
      //.input('pSearch', sql.NVarChar, null)
      .execute('uspGetPackages')
    return packages.recordsets
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getPackages,
  insertPackage,
}

//Event ID
//CRS-i5Hs-Nvfu-5YMxf
