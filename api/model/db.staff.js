"use strict"
import sql from 'mssql'
import { sqlConfig } from './db.config.js'

export class Staff {
    static async getAllStaffRecord() {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .query("SELECT staff.staff_id, staff.staff_status, staff.password, staff.name, staff.chinese_name, staff.grade_id, staff.position_id, position.position_desc, staff.dept_id, dept.dept_name, dept.dept_head_id, dept.div_head_id, dept.final_score_id, supervisor_id, staff.date_JOINed, staff.email, staff.location, staff_assign.assign_type, staff_assign.reviewer_id,staff_form.form_type_id FROM staff JOIN staff_assign ON staff.staff_id = staff_assign.staff_id JOIN staff_form ON staff.staff_id = staff_form.staff_id JOIN position ON staff.position_id = position.position_id JOIN dept ON staff.dept_id = dept.dept_id WHERE staff_status = 'A' --where staff.staff_id = '1-9005'",)
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
                .query("SELECT staff.staff_id, staff.staff_status, staff.password, staff.name, staff.chinese_name, staff.grade_id, staff.position_id, position.position_desc, staff.dept_id, dept.dept_name, dept.dept_head_id, dept.div_head_id, dept.final_score_id, supervisor_id, staff.date_JOINed, staff.email, staff.location, staff_assign.assign_type, staff_assign.reviewer_id,staff_form.form_type_id FROM staff JOIN staff_assign ON staff.staff_id = staff_assign.staff_id JOIN staff_form ON staff.staff_id = staff_form.staff_id JOIN position ON staff.position_id = position.position_id JOIN dept ON staff.dept_id = dept.dept_id WHERE staff.staff_status = 'A' AND staff.staff_id = @staff_id")
            console.log("get user: ",result)
            console.log("get user: ",result.recordset[0])
            return result.recordset[0]


        } catch (err) {
            console.log(err)
            return err.meassage
        }
    }

    static async getAllExistUID() {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .query("SELECT staff.staff_id, staff.staff_status, staff.password, staff.name, staff.chinese_name, staff.grade_id, staff.position_id, position.position_desc, staff.dept_id, dept.dept_name, dept.dept_head_id, dept.div_head_id, dept.final_score_id, supervisor_id, staff.date_JOINed, staff.email, staff.location, staff_assign.assign_type, staff_assign.reviewer_id,staff_form.form_type_id FROM staff JOIN staff_assign ON staff.staff_id = staff_assign.staff_id JOIN staff_form ON staff.staff_id = staff_form.staff_id JOIN position ON staff.position_id = position.position_id JOIN dept ON staff.dept_id = dept.dept_id WHERE staff.staff_status = 'A'")
            if (result.rowsAffected[0]) {
                // console.log(result)
                console.log(`row affected: [${result.rowsAffected[0]}]`)
                // console.log("recordset")
                // console.log(result.recordset)
                let uidArr = [], resultArr = result.recordset
                for (let i of resultArr) {
                    uidArr.push(i["staff_id"])
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

// Staff.getStaffDataById('1-2878')
Staff.getAllExistUID()

// Staff.renewRecord('andy','2022-01-06 00:00:00', 1)