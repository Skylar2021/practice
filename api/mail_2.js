import nodemailer from 'nodemailer';

/*
option = {
    from : "appraisal@mail.hkbnes.net",
    to: "receiver email variable",
    subject: "email subject",
    text: "email content template - contain vairable"
}
variable : 
receiver
email content
time???? what circumstance
*/



export class Email{
    constructor(receiver, subject, text){
        this.option = {
            from: "appraisal@mail.hkbnes.net",
            to: receiver,
            subject,
            text,
        }
        this.transporter = nodemailer.createTransport({
            host: "smtp.mail.hkbnes.net",
            port: 25,
            // port: 587,
            secure: false, // upgrade later with STARTTLS
            auth: {
              user: "appraisal@mail.hkbnes.net",
            //   pass: "password",
            },
          })
    }
    today = () => {
        let d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
    
        return [year, month, day].join('-');
    }
}

