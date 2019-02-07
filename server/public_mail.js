const nodemailer = require('nodemailer');
module.exports = {
	mailepass: function mailepass(message) {
		let transporter = nodemailer.createTransport({
			host: 'smtp.qq.com',
			port: 465,
			secure: true, // true for 465, false for other ports
			auth: {
				user: "1360234119@qq.com", // generated ethereal user
				pass: 'hgxjirbvirzpbadb' // generated ethereal password
			}
		});

		let mailOptions = {
			from: {
				name: 'XiYouMobile',
				address: '1360234119@qq.com'
			},
			to: [
				'"fzb" <1360234119@qq.com>'
			], // list of receivers
			subject: '移动应用开发实验室--管理员通知', // Subject line
			text: message,
			html: '', // html body
		}

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				return console.log(error);
			}
			console.log("邮件发送成功----->\n" + info);
		});
	}
}
