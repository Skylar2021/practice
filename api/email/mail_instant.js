import nodemailer from 'nodemailer';
import schedule from 'node-schedule';
/*
export class testing extends nodemailer {
    constructor() {

    }
}
*/

// self -> send email to tp appraiser
// tp -> send email to subordinate
export class instantEmail {
    constructor(deadline, receiver, receiverEmailAddress, assign_type = 'S') {
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
        this.receiverEmailAddress = receiverEmailAddress
        // this.apprEmailAddress = apprEmailAddress
        this.assign_type = assign_type
        this.receiver = receiver
        this.deadline = deadline
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

        // return [year, month, day].join('-');
        return [day, month, year].join('-');
    }

    emailContent = () => {

        let content_s =
            `${this.receiver} submitted self review on ${this.today()} and is looking forward to your top-down review.\nPlease login to the following link to process the review on or before ${this.deadline}.\n(This email is generated automatically by web appraisal system.)`
        let content_tp =
            `Your appraiser submitted your top-down review on ${this.today()}.\nYou can login to the following link to review it (This email is generated automatically by web appraisal system.)`
        
            return this.assign_type === 'S' ? content_s : content_tp
    }
    messageInfo = () => {
        let option = {
            from: "appraisal@mail.hkbnes.net",
            to: this.receiverEmailAddress,
            //   to: "skylar.wong@magazzin.com",
            subject: this.emailTitle(),
            text: this.emailContent()
        }
        // console.log(option)
        return option
    }
    emailTitle = () => {
        let subject = `eAppraisal Alert: Self review by ${this.receiver} done`
        return subject
    }
    sendInstantMail = () => {
        this.transporter.sendMail(this.messageInfo(), (err, info) => {
            console.log("transporter called")
            // console.log(this.messageInfo)
            if (err) {
                console.log(err)
                return {status: "fail",err:err}
            }
            if (info) {
                console.log(info)
                return {status: "success",info:info.response}
            }
        })
    }

}
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
