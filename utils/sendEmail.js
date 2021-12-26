const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

dotenv.config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    const email = { ...data, from: 'koomedna@gmail.com' };
    try {
        await sgMail.send(email)
        return true;
        } catch (error) {
        throw error;
    }
}

// const email = {
//   to: 'mariyka.konochuk@gmail.com',
//   from: 'koomedna@gmail.com',
//   subject: 'New application from site',
//   html:'<p>Hello</p>'
// }

module.exports = sendEmail;

