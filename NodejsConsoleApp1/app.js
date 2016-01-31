var http = require('http');
var https = require('https');
var crypto = require('crypto');
var mysql = require('mysql');

//var connection = mysql.createConnection({
//	host: 'localhost', 
//	user: 'root',
//	password: '',
//	database: 'ok'
//});
//connection.connect();

var count = '100';
var name = '50582132228315';
var anchor = '';
var zaprosDliaHesha = "application_key=CBAJDNALEBABABABAcount="+count+"method=group.getMemberssession_key=tkn1ogczholO7pEKTaDCefnmDmvUgQBDvBfSv40LkpuPC1W0M1RPnujgIVOvPNOI9yvxR7uid=" + name + "1d946ccbaa0facc5f3011d3cfeaab9d6";
var hash = crypto.createHash('md5').update(zaprosDliaHesha).digest("hex");
var vkapiToken = "https://api.ok.ru/fb.do?application_key=CBAJDNALEBABABABA&method=group.getMembers&session_key=tkn1ogczholO7pEKTaDCefnmDmvUgQBDvBfSv40LkpuPC1W0M1RPnujgIVOvPNOI9yvxR7&uid="+name+"&count=" + count  + "&sig=" + hash;
var kolvo = 0;
var text;
function zapros(k, callback) {
	
	https.get(vkapiToken, function (res) {
		res.on('data', function (d) {
			text = JSON.parse(d);
			//if (text.has_more) {
				anchor = text.anchor;
				zaprosDliaHesha = "anchor=" + anchor + "application_key=CBAJDNALEBABABABAcount=" + count + "method=group.getMemberssession_key=tkn1ogczholO7pEKTaDCefnmDmvUgQBDvBfSv40LkpuPC1W0M1RPnujgIVOvPNOI9yvxR7uid=" + name + "1d946ccbaa0facc5f3011d3cfeaab9d6";
				hash = crypto.createHash('md5').update(zaprosDliaHesha).digest("hex");
				vkapiToken = "https://api.ok.ru/fb.do?application_key=CBAJDNALEBABABABA&method=group.getMembers&session_key=tkn1ogczholO7pEKTaDCefnmDmvUgQBDvBfSv40LkpuPC1W0M1RPnujgIVOvPNOI9yvxR7&uid=" + name + "&count=" + count + "&anchor=" + anchor + "&sig=" + hash;
				
				console.log("k  " + anchor);
				
				
				//function zapisvbazu(i, callback) {
				for (var i = 0; i < text.members.length; i++) {
					
					
					var user = {
						id: text.members[i].userId,
					};
				console.log("k - " + k + "    i - " + i);
					
					connection.query('insert into userid set ?', user, function (err, result) {
						
						if (err) {
							console.error(err);
							return;
						} 
					
			//		callback(i + 1);
			//			//console.error(result);
				
			//		//if (i > (text.members.length-2)) return;
			//		//zapros(i + 1);
			 
					});
				console.log(text.members[i].userId);
				//}
				
				}
				//function zapisvbazuCallBack(i) {
				//	if (i < text.members.length) { 
				//		zapisvbazu(i, zapisvbazuCallBack);
				
				//	}
				
				
				//}
				//zapisvbazuCallBack(0);
				
				//setTimeout(function () {
					//console.log(value);
					callback(k + 1);
				//}, Math.random() * 100 + 50);
			//}
			//callback(k + 1);
			//setTimeout(, Math.random() * 10000);
		});
		console.log(k);
	})
	
};
function zaprosCallBack(k) {
	if (true) { 
		zapros(k, zaprosCallBack);
	}
}

	zaprosCallBack(0);

//getReq.end()
//getReq.on('error', function (err) {
//	console.log("Error: ", err);
//}); 
//r++;
//console.log("r=" + (r));




		
