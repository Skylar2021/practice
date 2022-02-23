"use strict"
import sql from 'mssql'
import { sqlConfig } from './db.config.js'

export class Review {
    static async get_self_review(id, assign_type) {
        // assign_type default = 'S'
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('staff_id', sql.VarChar(50), id)
                .input('assign_type', sql.VarChar(50), assign_type)
                .execute('get_my_summary_self')

            console.log(result.recordset[0])
            return result.recordset[0]
        } catch (err) {
            console.log(err)
        }
    }

    static async getQuestionByFormId(form_id) {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('form_id', sql.VarChar(50), form_id)
                // .input('assign_type', sql.VarChar(50), assign_type)
                .query('select * from question where form_id = @form_id order by form_id, section, question_id')

            console.log(result)
            console.log(result.recordset)
            return result.recordset
        } catch (err) {
            console.log(err)
        }

    }

    static async getScoreByStaffId(id) {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('staff_id', sql.VarChar(50), id)
                .query("select staff.staff_id, s.*, t.* from staff left join (select * from score where assign_type = 'S') s  on staff.staff_id = s.staff_id left join (select * from score  where assign_type = 'T') t on s.staff_id = t.staff_id where staff.staff_id = @staff_id")
            console.log(result)
            console.log(result.recordset)
            return result.recordset
        } catch (err) {
            console.log(err)

        }
    }

    static async getQNA(staff_id, form_id, t_id, year) {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('staff_id', sql.VarChar(50), staff_id)
                .input('form_id', sql.VarChar(50), form_id)
                .input('t_id', sql.VarChar(50), t_id)
                .input('year', sql.VarChar(50), year)
                .query("select form.year, a.t_id, q.form_id, q.section,  q.question_id,  q.display_order, q.section_header, q.question_text, q.question_subtext,q.is_optional, q.show_header, q.sales_figure, a.choice_id, a.comments , a.emp_mon_sales, a.store_mon_sales, a.emp_avg_sales, a.store_avg_sales, form.appr_from_date, form.appr_to_date from answer a join question q on q.question_id = a.question_id and q.section = a.section join form on form.form_id = q.form_id join staff_form on staff_form.form_type_id = form.form_type_id where staff_form.staff_id = @staff_id AND t_id = @t_id and year = @year and form.form_id = @form_id order by q.section,q.question_id")
            console.log(result)
            return result.recordset

        } catch (err) {

        }
    }
    /*
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
    */
}

// Review.getQNA('1-9005', 27, 'F221-9005S01', 2022)