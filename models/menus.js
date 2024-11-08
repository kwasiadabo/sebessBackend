const { all } = require("express/lib/application");
const sql = require("mssql");
const dbconn = require("../startup/dbconfig");

async function getMenus(req) {
  try {
    let pool = await sql.connect(dbconn);
    let menusRequest = await pool
      .request()
      .input("val", sql.Int, req)
      .query("select * from vwMenus where menu_level=@val");
    //console.log(menusRequest.recordsets);
    return menusRequest.recordsets;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { getMenus: getMenus };
