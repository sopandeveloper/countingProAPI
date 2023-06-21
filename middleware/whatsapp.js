const accountSid = 'AC46a8a6939fe872e5abfcb875519d1c11';
const authToken = '11c9d5c011e6bfe52d849ea53b8c42ff';
const client = require('twilio')(accountSid, authToken);



const recipientNumber = '+  919767873800';
const sender = '+14175383919';
const message = `Hello! Your OTP is: ${565464}`;


module.exports = {


    sendOTP: (req, res) => {
     
        client.messages.create({
            body: message,
            from: `whatsapp:${sender}`,
            to: `whatsapp:${recipientNumber}`
        })
        .then(message => console.log(message.sid))
        .catch(error => console.error(error))


    },
    
    
}