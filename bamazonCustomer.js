const mysql = require('mysql'),
      inquirer = require('inquirer'),
      pad = require('pad')

var connection = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_DB"
})

connection.connect(function(err) {
    console.log("Connected as id: " + connection.threadId);
    // start();
})

connection.query("SELECT * FROM products", function(err, res){
      
  if(err) throw err

  console.log("Check out our selection...\n")
  console.log("  ID  |          Product Name          |       Department Name       |     Price    |   In Stock")
  console.log("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - ")
  
  for(let i = 0; i < res.length; i++){

    let itemId = res[i].item_id,
        productName = res[i].product_name,
        departmentName = res[i].department_name,
        price = "$" + res[i].price,
        quantity = res[i].stock_quantity

    console.log((pad(3, " " + itemId) + pad(" " , 3))
                 + "|" + (pad(23, " " + productName) + pad(" ", 9)) 
                 + "|" + (pad(21, " " + departmentName) + pad(" ", 8)) 
                 + "|" + (pad(9, " " + price) + pad(" ", 5)) 
                 + "|" + pad(8, " " + quantity))
  }
})

// var start = function() {
//     inquirer.prompt({
//         name:"selectRole",
//         type:"rawlist",
//         message: "Choose you role.",
//         choices: ["Customer"]
//     }).then(function(answer){
//         if(answer.selectRole.toUpperCase() == "Customer") {
//             // goCustomer();
//         }
    
//     })
// }