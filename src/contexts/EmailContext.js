require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.API_KEY);

export const sendMail = async (msg) => {
    try {
        await sgMail.send(msg);
        alert("Email Sent!!");
    } catch (error) {
        alert("Error Occured!!");
        if (error.response) {
            console.error(error.response.body);
        }
    }
};
