"use strict"

const sql = require('mssql')
const dbConnect = {
    sqlConfig: {
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
    },

    getUserDataByUserId: async function (id) {
        try {
            let con = await sql.connect(this.sqlConfig)
            let result = await con.request()
                // .input('user_id', sql.VarChar, id)
                .query('select * from crud_userlist')

            console.dir(result.recordset)
        } catch (err) {
            console.log(err)
        }
    },
    AddNewUser: async function (uid, password, userName) {
        try {
            let con = await sql.connect(this.sqlConfig)
            let result = await con.request()
                .input('user_id', sql.NVarChar, uid)
                .input('username', sql.VarChar, userName)
                .input('password', sql.NVarChar, password)
                .query('insert into crud_userlist values( @user_id , @password, @username ) ')
            console.log(result.rowsAffected)
        } catch (err) {
            console.log(err)

        }

    },
    delUserByUserId: async function (uid) {
        if (!uid) {
            throw new Error("user id not fund!")
        }
        try {
            let con = await sql.connect(this.sqlConfig)
            let result = await con.request()
                .input('user_id', sql.NVarChar, uid)
                .query('delete from crud_userlist where user_id = @user_id')
            console.log(result.rowsAffected)
        } catch (err) {
            console.log(err)
        }
    },
    updatePasswordByUserId: async function (uid, password) {
        if(uid && password){
            try {
                let con = await sql.connect(this.sqlConfig)
            let result = await con.request()
                .input('user_id', sql.NVarChar, uid)
                .input('password', sql.NVarChar, password)
                .query('update crud_userlist set password = @password where user_id = @user_id')
            console.log(result.rowsAffected)
            } catch (err) {
            console.log(err)
                
            }
        }else{
            console.log("empty username or password")
        }
    }
}
// db.updatePasswordByUserId('sky', 789456)

module.exports = dbConnect;





