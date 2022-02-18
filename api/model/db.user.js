// "use strict"
import sql from 'mssql'
import { sqlConfig } from './db.config.js'

export class User {
    
    static async getAllUser() {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                // .input('user_id', sql.VarChar, id)
                .query('select * from crud_userlist',)
            if (result.recordset) {
                console.log(`row affected: [${result.rowsAffected}]`)
                console.log("get all users:")
                console.log(result.recordset)
                return result.recordset
            }

        } catch (err) {
            console.log(err)

        }
    }
    static async getUserDataByUserId(id) {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request(con)
                .input('user_id', sql.VarChar, id)
                .query('select * from crud_userlist where uid = @user_id')

            console.log("get user: ",result.recordset[0])
            return result.recordset[0]

            // let con = await sql.connect(sqlConfig)
            // let result = await con.request()
            //     // .input('user_id', sql.VarChar, id)
            //     .query('select * from crud_userlist')

            // console.dir(result.recordset)
        } catch (err) {
            console.log(err)
        }
    }
    static async addNewUser(uid, password, userName) {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('user_id', sql.VarChar(50), uid)
                .input('username', sql.VarChar(50), userName)
                .input('password', sql.VarChar(50), password)
                .query(`insert into crud_userlist values( @user_id , @password, @username, 'G' ) `)
            console.log(result.rowsAffected)
            return { rowsAffected: result.rowsAffected[0] }
        } catch (err) {
            console.log(err)
            return err

        }

    }
    static async delUserByUserId(uid) {
        if (uid) {
            try {
                let con = await sql.connect(sqlConfig)
                let result = await con.request()
                    .input('user_id', sql.VarChar, uid)
                    .query('delete from crud_userlist where uid = @user_id')
                console.log(result.rowsAffected)
                return { rowsAffected: result.rowsAffected[0] }
            } catch (err) {
                console.log(err)
                return err

            }
        }
    }
    static async updatePasswordByUserId(uid, password) {
        // let userid = req.params.uid || req.body.uid
        if (uid && password) {
            try {
                let con = await sql.connect(sqlConfig)
                let result = await con.request()
                    .input('user_id', sql.NVarChar, uid)
                    .input('password', sql.NVarChar, password)
                    .query('update crud_userlist set password = @password where uid = @user_id')
                console.log(result.rowsAffected)
                return { rowsAffected: result.rowsAffected[0] }

            } catch (err) {
                console.log(err)

            }
        } else {
            throw new Error("empty user id or password")
        }
    }
    static async getMySummary(uid, assign_type){
        if(uid){
            try {
                let con = await sql.connect(sqlConfig)
                let result = await con.request()
                    .input('staff_id', sql.VarChar(50), uid)
                    .input('assign_type', sql.VarChar(50), assign_type)
                    .execute('get_my_summary_self')
        
                console.log(result)
                return result
            } catch (err) {
                console.log(err)
            }
        }
    }
    
}

// let func = new User()
// let user = User.getUserDataByUserId('sky')
// console.log(user)
// console.log(user.uid)
(async () => {
    let user = await User.getMySummary('1-2812', 'S')
    console.log('1-2812')
    console.log(user)
    console.log(user?.rowsAffected[0])
})()
// module.exports = User;





