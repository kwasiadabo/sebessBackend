const sql = require('mssql');

const db = {
	server: 'SQL8011.site4now.net',
	//server: '192.168.8.127',
	port: 1433,
	user: 'db_aa95d7_schoolsmsdb_admin',
	password: 'Kaw3se4dr5',
	database: 'db_aa95d7_schoolsmsdb',
	options: {
		encrypt: false,
		// enableArithAbort: true,
		trustServerCertificate: true,
		cryptoCredentialsDetails: {
			minVersion: 'TLSv1',
		},
	},
	pool: { max: 50, min: 0, idleTimeoutMillis: 70000 },
};

sql.on('error', (err) => {
	console.log(err.message);
});

module.exports = db;
