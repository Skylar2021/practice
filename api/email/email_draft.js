import nodemailer from 'nodemailer';
import schedule from 'node-schedule';

/*

let transporter = nodemailer.createTransport({
    host: "smtp.mail.hkbnes.net",
    port: 25,
    // port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: "appraisal@mail.hkbnes.net",
        //   pass: "password",
    },
});

let today = () => {
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

let emailTitle = (name) => {
    let subject = `eAppraisal Alert: Self review by ${name} done`
    return subject
}

let emailContent = (name, deadline) => {

    let content_s =
        `${name} submitted self review on ${today()} and is looking forward to your top-down review.\nPlease login to the following link to process the review on or before ${deadline}.`

    return content_s
}

let option = {
    from: "appraisal@mail.hkbnes.net",
    to: "skylar.wong@magazzin.com",
    //   to: "skylar.wong@magazzin.com",
    subject: emailTitle('Sky'),
    text: emailContent('Sky', today())
}

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log(success);
        console.log("Server is ready to take our messages");
    }
});
/*
schedule.scheduleJob('* * * * *', () => {

    transporter.sendMail(option, (err, info) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(info)
    })
})
// let dt = new Date(2022, 3, 4, 15, 14)
const rule = new schedule.RecurrenceRule()
rule.year = 2022
rule.month = 3
rule.date = 4
rule.hour = 15
rule.minute = 42
// rule.tz = "Etc/GMT"
// rule.tz = "Asia/Hong_Kong"
console.log(rule)



const rule = (mm, hh, DD, MM) => {
    let arr = new Array(5).fill("*")
    if (mm) arr[0] = mm;
    if (hh) arr[1] = hh;
    if (DD) arr[2] = DD;
    if (MM) arr[3] = MM;
    return arr.join(" ")

}


// date-time array??????
// date-time array??????
// date-time array??????
schedule.scheduleJob(rule(53, 15, 4, 3), () => {
    // console.log("schedule job called")
    transporter.sendMail(option, (err, info) => {
        // console.log("transporter called")
        if (err) {
            console.log(err)
            return
        }
        if (info) {
            console.log(info)
        }
    })
});
*/

// testing 
/*
import {instantEmail} from './mail_instant.js'

let sendEmail = new instantEmail('07-03-2022', 'Skylar', "skylar.wong@magazzin.com")
sendEmail.sendInstantMail()
// sendEmail.messageInfo()

*/