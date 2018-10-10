
var jsonData = require('./2002763_STP.TIF.jsonoutput-1-to-20.json');
var fileContent=jsonData.responses[0].fullTextAnnotation.text;
// console.log("json:",fileContent);
var fs = require('fs');
var filename="2002763_STP.TIF.jsonoutput-1-to-20.json";


var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vijo@93",
  database: "MLPOC"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  fileContent=fileContent.trim();
  var size = Object.keys(fileContent).length;
  fileContent=fileContent.substr(90,size);
  var sql = "INSERT INTO responseJson (filename, fileContent) VALUES ('"+filename+"', '"+fileContent+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    
    console.log("1 record inserted");
  });
});



fs.writeFile(`${filename}.txt`, fileContent, function (err) {
  if (err) throw err;
  console.log('Saved!');
});


