// import mysql from 'mysql2/promise'
const mysql = require('mysql2/promise')
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'myorder',
  connectionLimit: 10,
})

async function testQuery() {
  try {
    const connection = await pool.getConnection()
    const [rows, fields] = await connection.query('SELECT * FROM users')
    console.log(rows)
    connection.release()
  }
  catch (err) {
    console.error(err)
  }
}

testQuery()
