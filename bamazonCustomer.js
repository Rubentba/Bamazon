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
    console.log(`Connected as id: ${connection.threadId}\n`);
    start();
})

connection.query("SELECT * FROM products", function(err, res){
      
  if(err) throw err

  console.log("\n\nCheck out our selection...\n")
  console.log("  ID  |          Product Name          |       Department Name       |     Price    |   In Stock")
  console.log("________________________________________________________________________________________________\n")
  
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

var start = function() {
    inquirer.prompt([
    {
        name:"selectProduct",
        type:"input",
        message: "Select the ID of the product you would like to purchase.",
    },{
        name:"purchaseUnit",
        type:"input",
        message: "Enter amount of units you would like to purchase.",
    }])
}