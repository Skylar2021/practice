import nodemailer from 'nodemailer';
import schedule from 'node-schedule';
import { testing } from './mail';

/*
let a = new testing()
a.nodemailer.createTransport({})

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



export class scheduleEmail {
    constructor(scheduleDateTime, deadline,receiver,receiverEmailAddress) {
        // this.option = {
        //     from: "appraisal@mail.hkbnes.net",
        //     to: receiverEmailAddress,
        //     subject,
        //     text,
        // }
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
        this.scheduleDateTime = scheduleDateTime
        this.receiver = receiver
        this.deadline = deadline
        this.receiverEmailAddress = receiverEmailAddress
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
    // [mm, hh, DD,MM]

    /*
    scheduleDateTime = {
        minute: mm
        hour: hh,
        date: DD,
        month: MM
    }
    */
    rule = (scheduleDateTime) => {
        let arr = new Array(5).fill("*")
        if (scheduleDateTime.minute) arr[0] = scheduleDateTime.minute;
        if (scheduleDateTime.hour) arr[1] = scheduleDateTime.hour;
        if (scheduleDateTime.date) arr[2] = scheduleDateTime.date;
        if (scheduleDateTime.month) arr[3] = scheduleDateTime.month;
        return arr.join(" ")

    }
    emailContent = (receiver, deadline) => {

        let content_s =
            `${receiver} submitted self review on ${this.today()} and is looking forward to your top-down review.\nPlease login to the following link to process the review on or before ${deadline}.`

        return content_s
    }
    messageInfo = (receiver, receiverEmailAddress) => {
        let option = {
            from: "appraisal@mail.hkbnes.net",
            to: this.receiverEmailAddress,
            //   to: "skylar.wong@magazzin.com",
            subject: emailTitle(receiver),
            text: emailContent(receiver, this.today())
        }
        return option
    }
    emailTitle = (receiver) => {
        let subject = `eAppraisal Alert: Self review by ${receiver} done`
        return subject
    }
    sendScheduleMail = () => {
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
    }
}

