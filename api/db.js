import mysql from 'mysql'

export const db = mysql.createConnection({
  host: "localhost",
  user:"root",
  password: "andre1986",
  database: "crud",
})