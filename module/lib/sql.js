module.exports = ()=>{
  const sql = require("mysql");
  require("dotenv").config();

  const connection = mysql.createConnection({
    host: "public.b5m4d.tky2.mdbs.jp",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "b5m4d_"
  });

  let res;
  connection.query(query,(error,results,fields)=>{
    res = results;
  });
  connection.end();

  return res;
}