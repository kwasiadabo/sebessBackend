const sql = require('mssql')
const db = require('../startup/db')
const bcrypt = require('bcrypt')

async function insertUser(staffId, controllerId, email, password) {
  const salt = await bcrypt.genSalt(10)
  const hash = bcrypt.hashSync(password, salt)
  try {
    let pool = await sql.connect(db)
    let User = await pool
      .request()
      .input('staffId', sql.NVarChar, staffId)
      .input('controllerId', sql.NVarChar, controllerId)
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, hash)
      .execute('uspInsertLeaveUserAccount')
    return User.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function changePassword(email, password) {
  const salt = await bcrypt.genSalt(10)
  const hash = bcrypt.hashSync(password, salt)
  try {
    let pool = await sql.connect(db)
    let User = await pool
      .request()
      .input('email', sql.NVarChar, email)
      .input('password', sql.NVarChar, hash)
      .execute('uspLeaveChangePassword')
    return User.recordsets
  } catch (error) {
    console.log(error)
  }
}

async function getUserByUserPassword(email) {
  try {
    let pool = await sql.connect(db)
    let usersResult = await pool
      .request()
      .input('email', sql.NVarChar, email)
      .execute('uspGetUser')
    return usersResult.recordset[0]
  } catch (error) {
    console.log(error)
  }
}

async function getUsers() {
  try {
    let pool = await sql.connect(db)
    let usersResult = await pool.request().execute('uspLeaveGetUsers')
    return usersResult.recordset
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getUserByUserPassword,
  insertUser,
  getUsers,
  changePassword,
}
