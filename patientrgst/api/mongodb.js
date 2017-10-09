var mongoose = require("mongoose"); 

module.exports = {




saveData: function (firstname,lastname,dob,telno,hasins,insid,inscar,copay)
{
	console.log("mongo db connection");
	mongoose.Promise = global.Promise; 
	url = "mongodb://localhost:27017/node-demo"; 
	
	var MongoClient = require('mongodb').MongoClient;
	 
	  
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  console.log("Database created!");
	  	
		 
	 var nameSchema = new mongoose.Schema({ 
		 firstName: String, 
		 lastName: String,
		 phonenum:Number,
		 dob:String,
		 hasins:Boolean
	 }); 
	 var User = mongoose.model("User", nameSchema);

	var InsuSchema = new mongoose.Schema({


	});	
	
	var data = {"body":{"firstname":firstname,"lastname":lastname,"dob":dob,"hasins":hasins}};
	
	db.collection("patients").insertOne(data, function(err, res) {
     if (err) throw err;
    console.log("1 document inserted" );
    db.close();
	return true;
  });
	
 });
	

}

}