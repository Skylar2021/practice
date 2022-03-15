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
        "question_text": "<b>Customer Service 顧客服務</b> <br> Level of dedication in meeting the expectations and requirement of internal department and external customers.  Quality in building rapport/relations in a business-like, courteous and friendly manner. ",
        "question_subtext": "滿足公司內部單位及客戶的期望及要求。以商務、有禮及友好的方式建立融洽關係。",
        "form_id": 28,
        "section": 1,
        "section_header": "<b>REVIEW OF JOB PERFORMANCE 工作表現</b>",
        "is_optional": "N",
        "show_header": "Y",
        "sales_figure": "N"
    },
    {
        "question_id": 2,
        "display_order": 2,
        "question_text": "<b>Quality of Work 工作質素</b> <br>Degree of accuracy and thoroughness. ",
        "question_subtext": "準確及完整性。",
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
        "question_text": "<b>Productivity 生產力</b> <br>Number of tasks accomplished and/or sales achieved.",
        "question_subtext": "達到要求的工作量及/或銷售目標。",
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
        "question_text": "<b>Technical Knowledge 技術知識</b> <br> Level of skills and knowledge to perform the functions of the job. ",
        "question_subtext": "擁有適當的技能及知識以履行工作職能。",
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
        "question_text": "<b>Commitment & Knowledge of Company 對公司的投入感及認識</b> <br> Sense of commitment to the Company; Degree of knowledge and adherence to company policies & procedures. ",
        "question_subtext": "對公司積極投入; 熟悉及遵守公司的政策及程序。",
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
        "question_text": "<b>Punctuality/ Attendance 守時/出勤</b> <br> Consistency of reporting to work and appointments on time, and attending work as scheduled.",
        "question_subtext": "準時上班及按時出席工作活動。",
        "form_id": 28,
        "section": 2,
        "section_header": "<b>WORK METHODS/ APPLICATION 工作方法/應用</b>",
        "is_optional": "N",
        "show_header": "Y",
        "sales_figure": "N"
    },
    {
        "question_id": 2,
        "display_order": 2,
        "question_text": "<b>Organization 組織力</b> <br> Effectiveness in organizing activities and tasks.",
        "question_subtext": "能有效地組織各項工作及活動。",
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
        "question_text": "<b>Communication 溝通技巧</b> <br>Ability to speak and write clearly and make himself/herself understood. ",
        "question_subtext": "於說話及書寫上能清晰表達並使他人理解自己所言。",
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
        "question_text": "<b>Time Management 時間管理</b> <br> Ability to allocate priorities based on importance and urgency and accomplish tasks accordingly. Consistency of meeting deadlines.",
        "question_subtext": "能根據工作的重要性及迫切性按次序處理，並能持續地按時完成工作。",
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
        "question_text": "<b>Teamwork 團隊精神</b> <br> Ability to work with fellow team members and support common goals. ",
        "question_subtext": "能與團隊內的組員衷力協作達成共同目標。",
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
        "question_text": "<b>Housekeeping/ Orderliness 管理/秩序</b> <br> Degree of cleanliness and organization of work area. ",
        "question_subtext": "妥善管理工作空間及保持清潔。",
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
        "question_text": "<b>Grooming/ Appearance 打扮/形象</b> <br> Adherence of Company's dress code standards. ",
        "question_subtext": "穿著合符公司標準的服飾及打扮。",
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
        "question_text": "<b>Leadership 領導才能</b> <br> Effectiveness in developing others the ability, willingness and desire to work towards a common objective. ",
        "question_subtext": "有效指導及發展員工的才能，帶領及鼓勵員工努力完成共同目標。",
        "form_id": 28,
        "section": 10,
        "section_header": "<b>For Supervisory Personnel only 適用於主管工作崗位之員工</b><br> (For supervisory personnel, please check the box on the left and complete the following four questions. 如屬主管工作崗位之員工，請在左方空格加上剔號，然後完成下列四條問題。)",
        "is_optional": "Y",
        "show_header": "Y",
        "sales_figure": "N"
    },
    {
        "question_id": 2,
        "display_order": 2,
        "question_text": "<b>Delegation 工作委任</b> <br> Effectiveness in delegating work and assigning responsibilities to subordinates.  ",
        "question_subtext": "妥善委派工作及責任給下屬。",
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
        "question_text": "<b>Judgment 決策</b> <br> Soundness of conclusion, decisions and actions. ",
        "question_subtext": "作出準確的判斷、決定及行動。 ",
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
        "question_text": "<b>Staff Coaching & Counseling 指導及輔導員工</b> <br> Consistency of relevant feedback and coaching ability. ",
        "question_subtext": "能向員工提出恰當的意見及提點。",
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
        "question_text": "<b>Initiative 主動性</b> <br> Ability to make suggestions and take proper actions without being requested.",
        "question_subtext": "主動提出意見並作出適當行動。",
        "form_id": 28,
        "section": 11,
        "section_header": "<b>INDIVIDUAL QUALITIES 個人素質</b>",
        "is_optional": "N",
        "show_header": "Y",
        "sales_figure": "N"
    },
    {
        "question_id": 2,
        "display_order": 2,
        "question_text": "<b>Adaptability to Change 面對變革</b> <br> Willingness and ability to accept and adapt change. ",
        "question_subtext": "樂意接受及能調節自己以適應不同的改變。",
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
        "question_text": "<b>Drive 進取心</b> <br> Basic urge and energy to get things done.",
        "question_subtext": "具備積極及進取心，盡力完成工作。",
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
        "question_text": "<b>Dependability可靠</b> <br> Reliability in assuming and carrying out the commitments and obligations of the position. ",
        "question_subtext": "可靠、對工作投入及有承擔。",
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
        "question_text": "<b>Emotional Quotient 情緒智商</b> <br>Ability to manage steady emotions to face and solve problems in different situations. ",
        "question_subtext": "在任何環境下都能以平穩的情緒去面對及解決問題。",
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
        "question_text": "<b>2021 Objective 2021目標</b>",
        "question_subtext": "Please specify the percentage of the 2021 objective achieved 請註明2021所設目標達到之百分比",
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
        "question_subtext": "<b>2022 Objective 2022目標</b>",
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
        "question_subtext": "<b>Staff Comments 員工意見</b>",
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