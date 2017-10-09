

var mongodb = require('./api/mongodb');

var insweb = require('./api/inswebcall');

var express = require("express");
var path = require('path');
var app = express();



app.use('/',express.static(path.join(__dirname, 'public')));


var alrt = require("alert-node");
 //var app = express(); 
 var port = 3000; 
var bodyParser = require('body-parser'); 
 app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
 
 
 //require('ssl-root-cas').inject(); 
 
 var querystring = require('querystring');
var https = require('https');
var http = require('http');



var o = {} // empty Object
var key = 'insurance';
o[key] = []; // empty Array, which you can push() values into



	
app.get("/copay", (req, res) => { 
	console.log("dir is " +__dirname);
	var copayamt = insweb.copayamt;
	//console.log(" amount aftr "+JSON.parse(req));
     res.sendFile(__dirname + "/views/copay.html"); 
 }); 
 
app.get("/", (req, res) => { 
	console.log("dir is " +__dirname);
     res.sendFile(__dirname + "/views/home.html"); 
 }); 
 
 
 function css(request, response) {
  if (request.url === '/styles.css') {
    response.writeHead(200, {'Content-type' : 'text/css'});
    var fileContents = fs.readFileSync('./views/styles.css', {encoding: 'utf8'});
    response.write(fileContents);
  }
}  


 
 app.post("/addname", (req, res) => { 
 
   var firstname = req.body.firstname;
   var lastname = req.body.lastname;
   var dob = req.body.dob;
   var telno = req.body.telno;
   var hasins = req.body.insoption;
   
   var insid = req.body.insid;
   var inscar = req.body.inscar;
   
   console.log("enter " + hasins);
         	 
  if(hasins == 'yes')
  {	  
	  insweb.performRequest(res,firstname,lastname,dob,telno,hasins,insid,inscar);
  }
  else
  {
	mongodb.saveData(firstname,lastname,dob,telno, hasins,"na","na","na"); 

	res.redirect('https://www.gohealthuc.com/about/');
	
  }
   
  
	 
	console.log(req.body.username);
		
 }); 
 
 

 
 app.listen(port, () => { 
    console.log("Server listening on port " + port); 
}); 
