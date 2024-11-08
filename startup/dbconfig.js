const sql = require("mssql");

const dbconn = {
  server: "adabo-pc",
  port: 1433,
  user: "sa",
  password: "19 dec",
  database: "KBTHNEW",
  trustServerCertificate: true,
  options: { enableArithAbort: true },
  connectionTimeout: 150000,
  pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
};

sql.on("error", (err) => {
  console.log(err.message);
});

module.exports = dbconn;
