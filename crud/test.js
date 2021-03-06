/*
let userArr = [
    { "uid": "andy", "password": 123, "username": "Andy" },
    { "uid": "sky", "password": 123, "username": "Sky" },
    { "uid": "will", "password": 123, "username": "Will" }
]

let a = userArr.find(user => user.uid == "sky")
console.log(a)

const sql = require('mssql')

const sqlConfig = {
    user: "sa",
    password: "Pa$$w0rd",
    database: "Performance20v2",
    server: "TMLHR01",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        // encrypt: false, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

const getStaffDataByStaffId = async (id)=> {
    try {
        let con = await sql.connect(sqlConfig)
        let result1 = await con.request()
            .input('staff_id', sql.VarChar, id)
            .query('select * from staff where staff_id = @staff_id')

        console.dir(result1.recordset[0])
        // Stored procedure

        // let result2 = await con.request()
        //     .input('input_parameter', sql.Int, value)
        //     .output('output_parameter', sql.VarChar(50))
        //     .execute('procedure_name')

        // console.dir(result2)
    } catch (err) {
         console.log(error)

    }
}

getStaffDataByStaffId('1-2878')

let a 
let b = 10
let c = a |= b
console.log(c)

const pwdChange = async (uid, password)=>{
    
    let data = {uid,password}
    console.log(data)
}
pwdChange("qwe", "123")


let a = [ { uid: 'andy' }, { uid: 'skylar' } ]
let b = []
for (let i of a) {
    b.push(i.uid)
}
console.log(b)


let date = new Date()
let YY = date.getFullYear()
let MM = date.getMonth()
let DD = date.getDate()
console.log(`${YY}-${MM}-${DD}`) // 2022-1-22
console.log(date.toDateString()) // Tue Feb 22 2022
// console.log(year)
let a = new Date().getFullYear()
console.log(a)

function formatDate() {
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
console.log(formatDate()) //2022-02-22
*/
const rule = (mm, hh, DD,MM)=>{
    let arr = new Array(5).fill("*")
    if(mm) arr[0] = mm;
    if(hh) arr[1] = hh;
    if(DD) arr[2] = DD;
    if(MM) arr[3] = MM;
    return arr.join(" ")
    
}
console.log(rule(50,15,4,3))

[
    {
        "question_id": 1,
        "display_order": 1,
        "question_text": "<b>Customer Service ????????????</b> <br> Level of dedication in meeting the expectations and requirement of internal department and external customers.  Quality in building rapport/relations in a business-like, courteous and friendly manner. ",
        "question_subtext": "???????????????????????????????????????????????????????????????????????????????????????????????????????????????",
        "form_id": 28,
        "section": 1,
        "section_header": "<b>REVIEW OF JOB PERFORMANCE ????????????</b>",
        "is_optional": "N",
        "show_header": "Y",
        "sales_figure": "N"
    },
    {
        "question_id": 2,
        "display_order": 2,
        "question_text": "<b>Quality of Work ????????????</b> <br>Degree of accuracy and thoroughness. ",
        "question_subtext": "?????????????????????",
        "form_id": 28,
        "section": 1,
        "section_header": null,
        "is_optional": "N",
        "show_header": "N",
        "sales_figure": "N"
    },
    {
        "question_id": 3,
        "display_order": 3,
        "question_text": "<b>Productivity ?????????</b> <br>Number of tasks accomplished and/or sales achieved.",
        "question_subtext": "???????????????????????????/??????????????????",
        "form_id": 28,
        "section": 1,
        "section_header": null,
        "is_optional": "N",
        "show_header": "N",
        "sales_figure": "Y"
    },
    {
        "question_id": 4,
        "display_order": 4,
        "question_text": "<b>Technical Knowledge ????????????</b> <br> Level of skills and knowledge to perform the functions of the job. ",
        "question_subtext": "??????????????????????????????????????????????????????",
        "form_id": 28,
        "section": 1,
        "section_header": null,
        "is_optional": "N",
        "show_header": "N",
        "sales_figure": "N"
    },
    {
        "question_id": 5,
        "display_order": 5,
        "question_text": "<b>Commitment & Knowledge of Company ??????????????????????????????</b> <br> Sense of commitment to the Company; Degree of knowledge and adherence to company policies & procedures. ",
        "question_subtext": "?????????????????????; ??????????????????????????????????????????",
        "form_id": 28,
        "section": 1,
        "section_header": null,
        "is_optional": "N",
        "show_header": "N",
        "sales_figure": "N"
    },
    {
        "question_id": 1,
        "display_order": 1,
        "question_text": "<b>Punctuality/ Attendance ??????/??????</b> <br> Consistency of reporting to work and appointments on time, and attending work as scheduled.",
        "question_subtext": "??????????????????????????????????????????",
        "form_id": 28,
        "section": 2,
        "section_header": "<b>WORK METHODS/ APPLICATION ????????????/??????</b>",
        "is_optional": "N",
        "show_header": "Y",
        "sales_figure": "N"
    },
    {
        "question_id": 2,
        "display_order": 2,
        "question_text": "<b>Organization ?????????</b> <br> Effectiveness in organizing activities and tasks.",
        "question_subtext": "??????????????????????????????????????????",
        "form_id": 28,
        "section": 2,
        "section_header": null,
        "is_optional": "N",
        "show_header": "N",
        "sales_figure": "N"
    },
    {
        "question_id": 3,
        "display_order": 3,
        "question_text": "<b>Communication ????????????</b> <br>Ability to speak and write clearly and make himself/herself understood. ",
        "question_subtext": "?????????????????????????????????????????????????????????????????????",
        "form_id": 28,
        "section": 2,
        "section_header": null,
        "is_optional": "N",
        "show_header": "N",
        "sales_figure": "N"
    },
    {
        "question_id": 4,
        "display_order": 4,
        "question_text": "<b>Time Management ????????????</b> <br> Ability to allocate priorities based on importance and urgency and accomplish tasks accordingly. Consistency of meeting deadlines.",
        "question_subtext": "?????????????????????????????????????????????????????????????????????????????????????????????",
        "form_id": 28,
        "section": 2,
        "section_header": null,
        "is_optional": "N",
        "show_header": "N",
        "sales_figure": "N"
    },
    {
        "question_id": 5,
        "display_order": 5,
        "question_text": "<b>Teamwork ????????????</b> <br> Ability to work with fellow team members and support common goals. ",
        "question_subtext": "?????????????????????????????????????????????????????????",
        "form_id": 28,
        "section": 2,
        "section_header": null,
        "is_optional": "N",
        "show_header": "N",
        "sales_figure": "N"
    },
    {
        "question_id": 6,
        "display_order": 6,
        "question_text": "<b>Housekeeping/ Orderliness ??????/??????</b> <br> Degree of cleanliness and organization of work area. ",
        "question_subtext": "??????????????????????????????????????????",
        "form_id": 28,
        "section": 2,
        "section_header": null,
        "is_optional": "N",
        "show_header": "N",
        "sales_figure": "N"
    },
    {
        "question_id": 7,
        "display_order": 7,
        "question_text": "<b>Grooming/ Appearance ??????/??????</b> <br> Adherence of Company's dress code standards. ",
        "question_subtext": "?????????????????????????????????????????????",
        "form_id": 28,
        "section": 2,
        "section_header": null,
        "is_optional": "N",
        "show_header": "N",
        "sales_figure": "N"
    },
    {
        "question_id": 1,
        "display_order": 1,
        "question_text": "<b>Leadership ????????????</b> <br> Effectiveness in developing others the ability, willingness and desire to work towards a common objective. ",
        "question_subtext": "???????????????????????????????????????????????????????????????????????????????????????",
        "form_id": 28,
        "section": 10,
        "section_header": "<b>For Supervisory Personnel only ????????????????????????????????????</b><br> (For supervisory personnel, please check the box on the left and complete the following four questions. ??????????????????????????????????????????????????????????????????????????????????????????????????????)",
        "is_optional": "Y",
        "show_header": "Y",
        "sales_figure": "N"
    },
    {
        "question_id": 2,
        "display_order": 2,
        "question_text": "<b>Delegation ????????????</b> <br> Effectiveness in delegating work and assigning responsibilities to subordinates.  ",
        "question_subtext": "???????????????????????????????????????",
        "form_id": 28,
        "section": 10,
        "section_header": null,
        "is_optional": "Y",
        "show_header": "N",
        "sales_figure": "N"
    },
    {
        "question_id": 3,
        "display_order": 3,
        "question_text": "<b>Judgment ??????</b> <br> Soundness of conclusion, decisions and actions. ",
        "question_subtext": "?????????????????????????????????????????? ",
        "form_id": 28,
        "section": 10,
        "section_header": null,
        "is_optional": "Y",
        "show_header": "N",
        "sales_figure": "N"
    },
    {
        "question_id": 4,
        "display_order": 4,
        "question_text": "<b>Staff Coaching & Counseling ?????????????????????</b> <br> Consistency of relevant feedback and coaching ability. ",
        "question_subtext": "?????????????????????????????????????????????",
        "form_id": 28,
        "section": 10,
        "section_header": null,
        "is_optional": "Y",
        "show_header": "N",
        "sales_figure": "N"
    },
    {
        "question_id": 1,
        "display_order": 1,
        "question_text": "<b>Initiative ?????????</b> <br> Ability to make suggestions and take proper actions without being requested.",
        "question_subtext": "??????????????????????????????????????????",
        "form_id": 28,
        "section": 11,
        "section_header": "<b>INDIVIDUAL QUALITIES ????????????</b>",
        "is_optional": "N",
        "show_header": "Y",
        "sales_figure": "N"
    },
    {
        "question_id": 2,
        "display_order": 2,
        "question_text": "<b>Adaptability to Change ????????????</b> <br> Willingness and ability to accept and adapt change. ",
        "question_subtext": "?????????????????????????????????????????????????????????",
        "form_id": 28,
        "section": 11,
        "section_header": null,
        "is_optional": "N",
        "show_header": "N",
        "sales_figure": "N"
    },
    {
        "question_id": 3,
        "display_order": 3,
        "question_text": "<b>Drive ?????????</b> <br> Basic urge and energy to get things done.",
        "question_subtext": "????????????????????????????????????????????????",
        "form_id": 28,
        "section": 11,
        "section_header": null,
        "is_optional": "N",
        "show_header": "N",
        "sales_figure": "N"
    },
    {
        "question_id": 4,
        "display_order": 4,
        "question_text": "<b>Dependability??????</b> <br> Reliability in assuming and carrying out the commitments and obligations of the position. ",
        "question_subtext": "???????????????????????????????????????",
        "form_id": 28,
        "section": 11,
        "section_header": null,
        "is_optional": "N",
        "show_header": "N",
        "sales_figure": "N"
    },
    {
        "question_id": 5,
        "display_order": 5,
        "question_text": "<b>Emotional Quotient ????????????</b> <br>Ability to manage steady emotions to face and solve problems in different situations. ",
        "question_subtext": "?????????????????????????????????????????????????????????????????????",
        "form_id": 28,
        "section": 11,
        "section_header": null,
        "is_optional": "N",
        "show_header": "N",
        "sales_figure": "N"
    },
    {
        "question_id": 1,
        "display_order": 1,
        "question_text": "<b>2021 Objective 2021??????</b>",
        "question_subtext": "Please specify the percentage of the 2021 objective achieved ?????????2021??????????????????????????????",
        "form_id": 28,
        "section": 20,
        "section_header": null,
        "is_optional": "N",
        "show_header": "N",
        "sales_figure": "N"
    },
    {
        "question_id": 2,
        "display_order": 2,
        "question_text": null,
        "question_subtext": "<b>2022 Objective 2022??????</b>",
        "form_id": 28,
        "section": 20,
        "section_header": null,
        "is_optional": "N",
        "show_header": "N",
        "sales_figure": "N"
    },
    {
        "question_id": 3,
        "display_order": 3,
        "question_text": null,
        "question_subtext": "<b>Staff Comments ????????????</b>",
        "form_id": 28,
        "section": 20,
        "section_header": null,
        "is_optional": "N",
        "show_header": "N",
        "sales_figure": "N"
    }
]


let choices = () => {
    for(let i = 0; i <10; i++ ){
        return <option value={`${i}`}></option>
    }
    
    return (
        <select name="choice" id="pet-select">

            <option value={`${i}`}></option>
            
        </select>
    )
}

choices()