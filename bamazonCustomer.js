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

    if (err) throw err

    console.log(`Connected as id: ${connection.threadId}\n`)

    start()

})

function display () {

    connection.query("SELECT * FROM products", function(err, res){
        
        if (err) throw err

        console.log("\n\n  ID  |          Product Name          |       Department Name       |     Price    |   In Stock")
        console.log("________________________________________________________________________________________________\n")
        
        for (let i = 0; i < res.length; i++) {

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
}

var start = function() {

    display()

    inquirer.prompt([
    {
        name:"selectProduct",
        type:"input",
        message: "Select the ID of the product you would like to purchase.",
    },{
        name:"purchaseUnit",
        type:"input",
        message: "Enter amount of unit(s) you would like to purchase.",
    }]).then(function (answer) {
        console.log(`You selected to buy ${answer.purchaseUnit} Units of the product labeled under ID ${answer.selectProduct}.\n`);

        connection.query("SELECT item_id, stock_quantity FROM products", function (err, res) {

            if (err) throw err
            
            var checkId = false

            for (let i = 0; i < res.length; i++) {

                if (parseInt(answer.selectProduct) == res[i].item_id) {

                   var checkId = true
                   var productStock = res[i].stock_quantity

                   if (checkId === true) {
                    
                        if (parseInt(productStock) >= parseInt(answer.purchaseUnit)) { 

                              
                            var newStock = productStock - answer.purchaseUnit

                            connection.query(`UPDATE products SET stock_quantity = ${newStock} WHERE item_id = ${answer.selectProduct}`, function (err) {
                                if (err) throw err

                                display()
                            })

                            connection.query(`SELECT price FROM products WHERE item_id = ${answer.selectProduct}`, function (err, res) { 

                                if (err) throw err

                                let totalCost = res[0].price * parseInt(answer.purchaseUnit)

                                console.log(`\n The total price of your order is ${totalCost}.`)
                                connection.end()
                            })

                        } else { 
                            console.log("There is an insufficient stock quantity to fulfill your order.\n")
                            start()
                        }
                    }
                }
            }
        })
    })
}