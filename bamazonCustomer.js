const mysql = require('mysql');
const inquirer = require('inquirer');

var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_DB"
})

connection.connect(function(err) {
    console.log("Connected as id: " + connection.threadId);
})
