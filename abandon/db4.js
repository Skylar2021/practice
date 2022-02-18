"use strict"
const sql = require('mssql')
const sqlConfig = require('./db')

const User = function(user){
    this.uid = user.uid;
    this.password = user.password;
    this.userName = user.userName;
}

    // sqlConfig: {
    //     user: "sa",
    //     password: "Pa$$w0rd",
    //     database: "Performance20v2",
    //     server: "TMLHR01",
    //     pool: {
    //         max: 10,
    //         min: 0,
    //         idleTimeoutMillis: 30000
    //     },
    //     options: {
    //         // encrypt: false, // for azure
    //         trustServerCertificate: true // change to true for local dev / self-signed certs
    //     }
    // },
    User.getAllUser = async function(){
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                // .input('user_id', sql.VarChar, id)
                .query('select * from crud_userlist')
                console.log(`row affected: [${result.rowsAffected}]`)
                console.log("get all users:")
                console.log(result.recordset)

        } catch (err) {
            console.log(err)
            
        }

    }
    User.getUserDataByUserId= async function (id) {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                // .input('user_id', sql.VarChar, id)
                .query('select * from crud_userlist where user_id = @user_id')

                console.log(`row affected: [${result.rowsAffected}]`)
        } catch (err) {
            console.log(err)
        }
    }
    
    User.AddNewUser = async function (uid, password, userName) {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('user_id', sql.NVarChar, uid)
                .input('username', sql.VarChar, userName)
                .input('password', sql.NVarChar, password)
                .query('insert into crud_userlist values( @user_id , @password, @username )')
            console.log(`row affected: [${result.rowsAffected}]`)
        } catch (err) {
            console.log(err)

        }

    }

    User.delUserByUserId= async function (uid) {
        if (!uid) {
            throw new Error("user id not fund!")
        }
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('user_id', sql.NVarChar, uid)
                .query('delete from crud_userlist where user_id = @user_id')
            console.log(`row affected: [${result.rowsAffected}]`)
        } catch (err) {
            console.log(err)
        }
    }
    
    User.updatePasswordByUserId = async function (uid, password) {
        if(uid && password){
            try {
                let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('user_id', sql.NVarChar, uid)
                .input('password', sql.NVarChar, password)
                .query('update crud_userlist set password = @password where user_id = @user_id')
            console.log(`row affected: [${result.rowsAffected}]`)
            } catch (err) {
            console.log(err)
                
            }
        }else{
            console.log("empty username or password")
        }
    }

// User.updatePasswordByUserId('sky', 123)
User.getAllUser()

module.exports = User;





