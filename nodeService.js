const Service = require('node-windows').Service
const svc = new Service({
  name: 'SchoolSMSServer',
  description: 'School SMS server',
  script: '//Users//user//Applications//Backend//New_Dara_Backend//index.js',
})
svc.on('install', () => {
  svc.start()
})

svc.install()
