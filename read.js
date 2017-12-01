var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Bogart345",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayStore();
  });

function displayStore(){
    console.log('Welcome to Bamazon, The Greatest Store On the Console!');
  connection.query("SELECT Product_Id ,Product_Name , Department_Name , Price FROM products", function(err, res) {
    if (err) throw err;
    for(var i=0;i<res.length;i++){
    console.log(JSON.stringify(res[i]));

    }
    connection.end();
  
})
}
