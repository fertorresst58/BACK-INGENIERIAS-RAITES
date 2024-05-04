const admin = require('mysql')

const con = admin.createConnection({
  host: 'localhost',
  database: 'raitesug',
  user: 'raitesUG',
  password: '123456'
})

con.connect((error) => {
  if (error) {
    throw error
  } else {
    console.log('DB CONECTADA')
  }
})

con.end()

module.exports = admin