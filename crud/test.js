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
*/




