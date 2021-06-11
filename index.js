const express = require('express');
const app = express();
var nodemailer = require('nodemailer');
var fs = require('fs');

const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
require('dotenv/config');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false,limit: '50mb'}));



app.get('/mail',(req,res,next)=>{
const image=fs.createReadStream('./E.png')
    
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.PASSWORD}`
    }
  });
  
  var mailOptions = {
    from: `${req.body.from}`,
    to: `${req.body.to}`,
    subject: `${req.body.subject}`,
    html: ` <!DOCTYPE html>
    <html>


     <head>
         <meta name="viewport" content="width=device-width">
         <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
         <title>Welcome Email Template</title>
         <style>
body {
  background-image: url('E.png');
}
</style>
     </head>
     <body>

      <p style="font-size: 14px;color:red; font-weight: normal;">Hi jim</p>
      <h1>hooray</h1>
      <img src="https://www.w3schools.com/images/w3schools_green.jpg" alt="Trulli" width="500" height="333">
     </body>
    </html>`,
    attachments:
        [{   // stream as an attachment
            filename: 'E.png',
            content: fs.createReadStream('./E.png')
        }]
    
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send({sent:"Email Sent"})
    }
  });


})




app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`)
})