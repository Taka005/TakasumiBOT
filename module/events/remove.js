module.exports = async(guild)=>{
  const mysql = require("../lib/mysql");

  mysql(`DELETE FROM bump WHERE server = ${guild.id};`);
  mysql(`DELETE FROM dissoku WHERE server = ${guild.id};`);
  mysql(`DELETE FROM moderate WHERE id = ${guild.id};`);
  mysql(`DELETE FROM pin WHERE server = ${guild.id};`);
}