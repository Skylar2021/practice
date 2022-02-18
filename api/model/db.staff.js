"use strict"
import sql from 'mssql'
import { sqlConfig } from './db.config.js'

export class Record {
    static async getAllStaffRecord() {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .query("select * from staff join staff_assign on staff.staff_id = staff_assign.staff_id join staff_form on staff.staff_id = staff_form.staff_id join position on staff.position_id = position.position_id join dept on staff.dept_id = dept.dept_id where staff.staff_id = '1-9005'",)
            if (result.recordset) {
                console.log(`row affected: [${result.rowsAffected}]`)
                console.log("get all record:")
                // console.log(result)
                console.log("recordset")
                console.log(result.recordset)
                // console.log("recordsets[0]")
                // console.log(result.recordsets[0])
                return result.recordset
            }

        } catch (err) {
            console.log(err)

        }
    }

    static async getStaffDataById(id) {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request(con)
                .input('staff_id', sql.VarChar, id)
                .query('select * from staff join staff_assign on staff.staff_id = staff_assign.staff_id join staff_form on staff.staff_id = staff_form.staff_id join position on staff.position_id = position.position_id join dept on staff.dept_id = dept.dept_id where staff.staff_id = @staff_id')

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

    static async getAllExistUID() {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .query('select uid from crud_time',)
            if (result.rowsAffected[0]) {
                // console.log(result)
                console.log(`row affected: [${result.rowsAffected[0]}]`)
                // console.log("recordset")
                // console.log(result.recordset)
                let uidArr = [], resultArr = result.recordset
                for (let i of resultArr) {
                    uidArr.push(i.uid)
                }
                console.log("all user id", uidArr)
                return uidArr
            }

        } catch (err) {
            console.log(err)

        }

    }
    static async renewRecord(uid, time, visible) {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('uid', sql.VarChar, uid)
                //uid to lower case
                .input('time', sql.DateTime2, time)
                .input('visible', sql.Bit, visible)
                .query('UPDATE crud_time SET time = @time , private = @visible WHERE uid = @uid')
            console.log(result.rowsAffected[0])
            console.log(result)
            return { rowsAffected: result.rowsAffected[0] }
        } catch (error) {
            console.log(error)

        }
    }

}

Record.getAllStaffRecord()

// Record.renewRecord('andy','2022-01-06 00:00:00', 1)