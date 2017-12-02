var mysql = require("mysql");
var inquirer = require('inquirer');
var item1;
var item2;
var quanity1;
var quanity2;
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Bogart345",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayStore();
});

function displayStore() {
    console.log('Welcome to Bamazon, The Greatest Store On the Node Console!');
    connection.query("SELECT Product_Id ,Product_Name , Department_Name , Price FROM products ORDER BY Department_Name", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(JSON.stringify(res[i]));

        }
        console.log('To Buy A Product Please Enter The Product Id')
        buyProducts1()
        // connection.end();

    })
}


function buyProducts1() {

    inquirer.prompt([{

            name: 'product',
            message: 'What Product Would like to buy? '
        },
        {
            name: 'quanity',
            message: 'How many Would You Like To Purchase?'
        },
        {
            type: 'input',
            name: 'yes',
            message: 'Would you like to buy another product?Y/N'
        }

    ]).then(function (item) {
        item1 = item.product
        quanity1 = item.quanity
        if (item.yes == 'y') {

            buyProducts1();

        } else {
            connection.query("SELECT * FROM products WHERE ? ", [{
                    Product_Id: item1
                }],
                function (err, res) {
                    if (err) throw err;
                    for (var i = 0; i < res.length; i++) {
                        var table_stock_q = JSON.stringify(res[i].Stock_Quantity);
                        var productN = res[i].Product_Name;
                        if (table_stock_q >= quanity1) {
                            var new_table_sock = quanity1 - table_stock_q;
                            connection.query('UPDATE products SET ? WHERE ?', [{
                                    Stock_Quantity: new_table_sock
                                },
                                {
                                    Product_Id: item1
                                }
                            ], function (err, res) {
                                console.log('You have bought' +' ' + quanity1 + ' '+productN)
                            });

                        }else{
                            console.log('We Do Not Have Enough Stock')
                        }
                    }



                })
        }

    })
}