const nodemailer = require('nodemailer');

// Setup Logger
module.exports = async (sendTo, mailSubject, htmlBody) => {
    try {
        var transporter = nodemailer.createTransport({
            host: process.env.EMAILHOST,
            port: process.env.EMAILPORT,
            secure: process.env.EMAILSECURE, // true for 465, false for other ports
            auth: {
                user: process.env.USEREMAIL,
                pass: process.env.USERPASSWORD,
            },
        });

        var info = await transporter.sendMail({
            from: process.env.EMAILFROM, // sender address
            to: sendTo, // list of receivers
            subject: mailSubject, // Subject line
            html: htmlBody, // html body
        });

        return {
            status: true,
            message: 'Message Sended Successfully',
            ...info
        };

    } catch (error) {
        return {
            ...error,
            status: false,
            message: 'Invalid Email !! Error while sending mail.',
        };
    }
};