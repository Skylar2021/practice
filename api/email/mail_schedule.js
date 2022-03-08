import nodemailer from 'nodemailer';
import schedule from 'node-schedule';
// import { testing } from './mail';

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
    constructor(scheduleDateTime, deadline, receiver, receiverEmailAddress) {

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
    rule = () => {
        let arr = new Array(5).fill("*")
        if (this.scheduleDateTime.minute) arr[0] = this.scheduleDateTime.minute;
        if (this.scheduleDateTime.hour) arr[1] = this.scheduleDateTime.hour;
        if (this.scheduleDateTime.date) arr[2] = this.scheduleDateTime.date;
        if (this.scheduleDateTime.month) arr[3] = this.scheduleDateTime.month;
        return arr.join(" ")

    }
    emailContent = () => {

        let content_s =
            `${this.receiver} submitted self review on ${this.today()} and is looking forward to your top-down review.\nPlease login to the following link to process the review on or before ${this.deadline}.`

        return content_s
    }
    messageInfo = () => {
        let option = {
            from: "appraisal@mail.hkbnes.net",
            to: this.receiverEmailAddress,
            //   to: "skylar.wong@magazzin.com",
            subject: this.emailTitle(this.receiver),
            text: this.emailContent(this.receiver, this.today())
        }

        return option
    }
    emailTitle = () => {
        let subject = `eAppraisal Alert: Self review by ${this.receiver} done`
        return subject
    }
    sendScheduleMail = () => {
        let job = schedule.scheduleJob(this.messageInfo(), () => {
            console.log("schedule job called")
            this.transporter.sendMail(this.messageInfo(), (err, info) => {
                console.log("transporter called")
                if (err) {
                    console.log(err)
                    return
                }
                console.log(info)
                job.cancel()

            })
        });
    }
}

let a = {
    minute: 40,
    hour: 9,
    date: 9,
    month: 3
}

let b = new scheduleEmail(a, '07-03-2022', 'Skylar', "skylar.wong@magazzin.com")

b.sendScheduleMail()