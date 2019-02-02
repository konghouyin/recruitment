var qs = require("querystring");
var http = require("http");

module.exports = {

	send: function(phone,style,message) {
		var phone_string = phone.join(',');
		var options = {
			"method": "POST",
			"hostname": "api.feige.ee",
			"path": '/SmsService/Template',
			"headers": {
				"Content-Type": "application/x-www-form-urlencoded",
				"cache-control": "no-cache",
				"Postman-Token": "c54505d6-0cb5-4a26-9b25-8a8e9e0ce28b"
			}
		};
		var req = http.request(options, function(res) {
			var chunks = [];

			res.on("data", function(chunk) {
				chunks.push(chunk);
			});

			res.on("end", function() {
				var body = Buffer.concat(chunks);
				console.log(body.toString());
			});
		});

		req.write(qs.stringify({
			Account: '15399475736',
			Pwd: 'xxx',
			Content: message,
			Mobile: phone_string,
			TemplateId: style,
			SignId: '89039',
		}));
		req.end();
	}
}
