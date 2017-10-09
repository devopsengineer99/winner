var https = require('https');

var mongodb = require('./mongodb');

var myMap = new Map();

module.exports = {
 performRequest: function(resp,firstname,lastname,dob,telno,hasins,insid,inscar) {
  var dataString = JSON.stringify(data);
  var headers = {'authtoken':'ghsaik8427','Content-Type': 'application/json'};
  var headers1="";
  
  var host = 'apistage.gohealthuc.com:1981/';
  
  
  var m = {
    first_name: firstname,
    last_name: lastname,
    id: insid,
    birth_date: dob
	};


	var p = {
    npi: '1234567890',
    "partner_id": "united_health_care",
    first_name: 'Marty',
    last_name: 'Seeger'
	};



	// setting the values
	myMap.set("member", m);
	myMap.set("provider", p);


	var data = JSON.stringify(myMap);



  
  var options = {
    host: host,
    path: 'v1/eligibility_demo',
    method: 'POST',
    headers: headers
  };


 
// set content-type header and data as json in args parameter 
var args = {
    data: data,
    headers: headers
};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var host1 = "http://services.groupkt.com/country/get/all";
var host2 = "https://apistage.gohealthuc.com:1981/v1/eligibility_demo";
 

var http = require('https');

var bod1 = JSON.stringify({
	"member": {
		"first_name": "Isabelle",
		"last_name": "Ringing",
		"id": "YGG456123",
		"birth_date": "1976-7-6"
	},
	"provider": {
		"first_name": "Marty",
		"last_name": "Seeger",
		"npi": "1234567890"
	},
	"trading_partner_id": "united_health_care"
});

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
var options = {
  host: 'apistage.gohealthuc.com',
  port:'1981',
  path: '/v1/eligibility_demo',
  method:'POST',
  //form:bod,
  headers: headers
};

var req = http.request(options, function(res) {
  console.log('Status: ' + res.statusCode);
  console.log('Headers: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  var obj;
  
   var body1 = '';
   res.on('data', function (body) {
    //console.log('Body: ' + body);
	// body1 = JSON.parse(JSON.stringify(body));
	//obj = JSON.parse(body);
	body1 += body;
	
  });
  
 
	
    res.on('end', function(){
        var fbr = JSON.parse(body1);
		// console.log(fbr.data.coverage+"\n tts ");
		var copay = fbr.data.coverage.copay;
		for (var i=0; i<copay.length; i++) {
			if (copay[i].hasOwnProperty('messages')) {
				console.log(JSON.stringify(copay[i].messages) + "\ncopay message");
				var messages = copay[i].messages;
				
				for (var j=0; j<messages.length; j++) {
					if (messages[j].message == 'URGENT CARE') {
						var copayamt = copay[i].copayment.amount;
						console.log(copay[i].copayment.amount);
						
						mongodb.saveData(firstname,lastname,dob,telno, hasins,insid,inscar,copayamt); 
						//resp.copayamt = copayamt;
						//var string = encodeURIComponent('copayamt='+copayamt);
						//res.redirect('/?valid=' + string);

						resp.redirect('/copay?copayamt='+copayamt);
						//resp.sendFile(__dirname + "/html/copay.html?copayamt="+copayamt); 
						
					}
					
				}
			}
		}

    });
 console.log(body1);
 console.log('new code32n');
    

});

req.write(bod1);

  console.log('End of webservice call');
  
  
  req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

req.end();

}

}