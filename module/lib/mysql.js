const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "public.b5m4d.tky2.mdbs.jp",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "b5m4d_"
});

module.exports = async(query)=>{
  require("dotenv").config();
  const util = require("util");

  connection.query = util.promisify(connection.query);

  const res = await connection.query(query);

  return res;
}