// require("dotenv").config();
const nodemailer = require('nodemailer');

export const sendMail = (info) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hutechhr@gmail.com',
            pass: process.env.PASSWORD
        }
    });
    let mailOptions = {
        from: 'hutechhr@gmail.com',
        to: 'swetha.vijay@hutechsolutions.com',
        subject: 'Leave Request',
        text: 'Test Mail',
    }
    
    transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Email Sent!!!");
        }
    });
}