require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_TRIAL_NUMBER
} = process.env;

console.log('TWILIO_ACCOUNT_SID', TWILIO_ACCOUNT_SID);
console.log('TWILIO_AUTH_TOKEN', TWILIO_AUTH_TOKEN);
console.log('TWILIO_TRIAL_NUMBER', TWILIO_TRIAL_NUMBER);

const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.post('/message', (req, res) => {
    const { phoneNumber, message } = req.body;
    console.log('body', req.body);
    client.messages.create({
      body: message,
      from: TWILIO_TRIAL_NUMBER,
      to: phoneNumber
    })
    .then(message => {
      console.log(`Message sent: ${message.sid}`);
      res.sendStatus(200);
    })
    .catch(err => {
      console.log(`Error: ${err.message}`);
      console.log(err.stack);
      res.status(500).send(err);
    });
});


app.listen(PORT, function(){
    console.log(`Listening on ${PORT}`);
});



