"use strict"
import sql from 'mssql'
import { sqlConfig } from './db.config.js'

export class Review {

    static async getSummary_self(staff_id, assign_type) {
        // assign_type default = 'S'
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('staff_id', sql.VarChar(50), staff_id)
                .input('assign_type', sql.VarChar(50), assign_type)
                .execute('get_my_summary_self')

            console.log(result.recordset[0])
            return result.recordset[0]
        } catch (err) {
            console.log(err)
        }
    }
    static async getSummary_self_alt(staff_id,year){
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('staff_id', sql.VarChar(50), staff_id)
                .input('year', sql.VarChar(50), year)
                .query("Select staff.staff_id,staff.name,staff.date_joined,dept.dept_name,position.position_desc,staff.grade_id as grade,t_id = null,completion_dt = null, status = null,score_avg = null, staff_form.form_type_id, form.appr_from_date, form.appr_to_date,form.close_date FROM staff join dept on staff.dept_id = dept.dept_id join position on staff.position_id = position.position_id join staff_form on staff.staff_id = staff_form.staff_id join form on form.form_type_id = staff_form.form_type_id Where staff.staff_id = @staff_id and form.year = @year")

            console.log(result.recordset[0])
            return result.recordset[0]
        } catch (err) {
            console.log(err)
        }

    }

    static async getSummary_td(staff_id, assign_type) {

        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('staff_id', sql.VarChar(50), staff_id)
                .input('assign_type', sql.VarChar(50), assign_type)
                .execute('get_my_summary')

            console.log(result)
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
            console.log(err)

        }
    }
    static async ansInsert(obj) {
        console.log(obj)
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('t_id', sql.VarChar(50), obj.t_id)
                .input('form_id', sql.VarChar(50), obj.form_id)
                .input('question_id', sql.Int, obj.question_id)
                .input('comments', sql.NVarChar(4000), obj.comments)
                .input('choice_id', sql.Int, obj.choice_id)
                .input('section', sql.Int, obj.section)
                .input('emp_mon_sales', sql.NVarChar(50), obj.emp_mon_sales)
                .input('store_mon_sales', sql.NVarChar(50), obj.store_mon_sales)
                .input('emp_avg_sales', sql.NVarChar(50), obj.emp_avg_sales)
                .input('store_avg_sales', sql.NVarChar(50), obj.store_avg_sales)
                .query("INSERT INTO answer(t_id, form_id, question_id, choice_id, comments, section, emp_mon_sales, store_mon_sales, emp_avg_sales, store_avg_sales) VALUES (@t_id, @form_id, @question_id, @choice_id, @comments, @section, @emp_mon_sales, @store_mon_sales, @emp_avg_sales, @store_avg_sales)")
            console.log(result)
            console.log({ rowsAffected: result.rowsAffected[0] })
            return { rowsAffected: result.rowsAffected[0] }
        } catch (err) {
            console.log(err)
            return { payload: obj, message: "insert failed, please try again" }

        }

    }
    static async ansUpdate(obj) {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('t_id', sql.VarChar(50), obj.t_id)
                // .input('form_id', sql.VarChar(50), obj.form_id)
                .input('question_id', sql.Int, obj.question_id)
                .input('comments', sql.NVarChar(4000), obj.comments)
                .input('choice_id', sql.Int, obj.choice_id)
                .input('section', sql.Int, obj.section)
                .input('emp_mon_sales', sql.NVarChar(50), obj.emp_mon_sales)
                .input('store_mon_sales', sql.NVarChar(50), obj.store_mon_sales)
                .input('emp_avg_sales', sql.NVarChar(50), obj.emp_avg_sales)
                .input('store_avg_sales', sql.NVarChar(50), obj.store_avg_sales)
                .query("UPDATE answer SET comments = @comments, choice_id = @choice_id, emp_mon_sales = @emp_mon_sales, store_mon_sales = @store_mon_sales, emp_avg_sales = @emp_avg_sales, store_avg_sales = @store_avg_sales WHERE (t_id = @t_id) AND (section = @section) AND (question_id = @question_id)")
            console.log(result)
            console.log({ rowsAffected: result.rowsAffected[0] })
            return { rowsAffected: result.rowsAffected[0] }
        } catch (err) {
            console.log(err)
            return { payload: obj, message: "update failed, please try again" }

        }

    }

    static async scoreInsert(obj) {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('t_id', sql.VarChar(50), obj.t_id)
                .input('form_id', sql.VarChar(50), obj.form_id)
                .input('staff_id', sql.VarChar(50), obj.staff_id)
                .input('assign_type', sql.VarChar(50), obj.assign_type)
                .input('reviewer_id', sql.VarChar(50), obj.reviewer_id)
                .input('status', sql.Int, obj.status)
                .input('appr_id', sql.VarChar(50), obj.appr_id)
                // .input('appr_dt', sql.DateTime2(7), obj.appr_dt)
                .input('score_ttl', sql.Int, parseInt(obj.score_ttl))
                .input('score_avg', sql.Decimal(3, 2), parseFloat(obj.score_avg))
                // .input('last_upd_dt', sql.DateTime2(7), obj.last_upd_dt)
                // .input('completion_dt', sql.DateTime2(7), obj.completion_dt)
                .input('is_optional', sql.VarChar(1), obj.is_optional)

                .query("INSERT INTO score(t_id, form_id, staff_id, assign_type, reviewer_id, status, appr_id, appr_dt, score_ttl, score_avg, last_upd_dt, completion_dt, is_optional) VALUES (@t_id, @form_id, @staff_id, @assign_type, @reviewer_id, @status, @appr_id, getdate(), @score_ttl, @score_avg, getdate(), getdate(), @is_optional)")
            console.log("score insert:")
            console.log({ rowsAffected: result.rowsAffected[0] })
            return { rowsAffected: result.rowsAffected[0] }
        } catch (err) {
            console.log(err)
            return { payload: obj, message: "insert failed, please try again" }

        }

    }
    static async scoreUpdate(obj) {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('t_id', sql.VarChar(50), obj.t_id)
                // .input('form_id', sql.VarChar(50), obj.form_id)
                .input('staff_id', sql.VarChar(50), obj.staff_id)
                // .input('assign_type', sql.VarChar(50), obj.assign_type)
                // .input('reviewer_id', sql.VarChar(50), obj.reviewer_id)
                .input('status', sql.Int, obj.status)
                // .input('appr_dt', sql.DateTime2(7), obj.appr_dt)
                .input('score_ttl', sql.Int, parseInt(obj.score_ttl))
                .input('score_avg', sql.Decimal(3, 2), parseFloat(obj.score_avg))
                // .input('last_upd_dt', sql.DateTime2(7), obj.last_upd_dt)
                // .input('completion_dt', sql.DateTime2(7), obj.completion_dt)
                .input('is_optional', sql.VarChar(1), obj.is_optional)
                .query("UPDATE score SET status = @status, score_ttl = @score_ttl, score_avg = @score_avg, last_upd_dt = GETDATE(), completion_dt = GETDATE(), appr_dt = GETDATE(),is_optional = @is_optional WHERE (t_id = @t_id)")
            // console.log(result)
            console.log("score update:")
            console.log({ rowsAffected: result.rowsAffected[0] })
            return { rowsAffected: result.rowsAffected[0] }
        } catch (err) {
            console.log(err)
            return { payload: obj, message: "update failed, please try again" }

        }

    }
    static async getTopDownList(staff_id, assign_type) {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('staff_id', sql.VarChar(50), staff_id)
                .input('assign_type', sql.VarChar(50), assign_type)
                .execute('get_other_topdown')
            // console.log(result)
            console.log(result.recordset)
            return result.recordset
        } catch (err) {
            console.log(err)
            return { error: err.message, message: "please try again" }
        }
    }

    static async getDeptReview(staff_id) {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('dept_head_id', sql.VarChar(50), staff_id)
                .execute('get_dept_summary')
            // console.log(result)
            console.log(result.recordset)
            return result.recordset
        } catch (err) {
            console.log(err)
            return { error: err.message, message: "please try again" }
        }
    }

    static async getScoreSummaryById(staff_id) {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('staff_id', sql.VarChar(50), staff_id)
                .execute('get_staff_score_summary')
            console.log(result.recordset)
            return result.recordset[0]
        } catch (err) {
            console.log(err)
            return { error: err.message, message: "please try again" }

        }
    }
    static async getResultById(staff_id) {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('staff_id', sql.VarChar(50), obj.staff_id)
                .query("SELECT * FROM result where staff_id = @staff_id and year = convert(varchar(32),YEAR(getDate()))")
                console.log(result.recordset)
                return result.recordset[0]
        } catch (err) {
            console.log(err)
            return { error: err.message, message: "please try again" }
        }
    }
    static async resultInsert(obj) {
        console.log(obj)
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('staff_id', sql.VarChar(50), obj.staff_id)
                .input('reviewer_id', sql.VarChar(50), obj.reviewer_id)
                .input('comment', sql.NVarChar(4000), obj.comment)
                .input('score', sql.Int, parseInt(obj.score))
                .input('terminate', sql.Bit, obj.terminate)
                .input('extend', sql.Bit, obj.extend)
                .input('extend_txt', sql.VarChar(50), obj.extend_txt)
                .input('salary_adj', sql.Bit, obj.salary_adj)
                .input('salary_adj_txt', sql.VarChar(50), obj.salary_adj_txt)
                .input('promotion', sql.Bit, obj.promotion)
                .input('promotion_txt', sql.VarChar(50), obj.promotion_txt)
                .input('pass', sql.Bit, obj.pass)
                .input('status', sql.Int, obj.status)
                .query("INSERT INTO result(staff_id, reviewer_id, comment, score, terminate, extend,extend_txt, salary_adj,salary_adj_txt, promotion,promotion_txt, pass, last_upd_dt, completion_dt, status, year) VALUES (@staff_id, @reviewer_id, @comment, @score, @terminate, @extend,@extend_txt, @salary_adj,@salary_adj_txt, @promotion,@promotion_txt, @pass, GETDATE(), GETDATE(), @status, convert(varchar(32),YEAR(getDate())))")
            console.log(result)
            console.log({ rowsAffected: result.rowsAffected[0] })
            return { rowsAffected: result.rowsAffected[0] }
        } catch (err) {
            console.log(err)
            return { payload: obj, message: "insert failed, please try again", error: err.message }

        }

    }
    static async resultUpdate(obj) {
        console.log(obj)
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('staff_id', sql.VarChar(50), obj.staff_id)
                // .input('reviewer_id', sql.VarChar(50), obj.reviewer_id)
                .input('year', sql.VarChar(50), obj.year)
                .input('comment', sql.NVarChar(4000), obj.comment)
                .input('score', sql.Int, obj.score)
                .input('terminate', sql.Bit, obj.terminate)
                .input('extend', sql.Bit, obj.extend)
                .input('extend_txt', sql.VarChar(50), obj.extend_txt)
                .input('salary_adj', sql.Bit, obj.salary_adj)
                .input('salary_adj_txt', sql.VarChar(50), obj.salary_adj_txt)
                .input('promotion', sql.Bit, obj.promotion)
                .input('promotion_txt', sql.VarChar(50), obj.promotion_txt)
                .input('pass', sql.Bit, obj.pass)
                .input('status', sql.Int, obj.status)
                .query("UPDATE result SET comment = @comment,score = @score, terminate = @terminate, extend = @extend,extend_txt = @extend_txt, salary_adj = @salary_adj, salary_adj_txt = @salary_adj_txt, promotion = @promotion ,promotion_txt = @promotion_txt, pass = @pass, last_upd_dt = GETDATE(), completion_dt = GETDATE(), status = @status WHERE staff_id = @staff_id AND year = @year")
            console.log(result)
            console.log({ rowsAffected: result.rowsAffected[0] })
            return { rowsAffected: result.rowsAffected[0] }
        } catch (err) {
            console.log(err)
            return { payload: obj, message: "update failed, please try again", error: err.message }

        }

    }


}
/*
let obj = {
    staff_id: '1-9002',
    reviewer_id: '1-0001',
    comment: 'T',
    score: 5,
    terminate: null,
    extend: null,
    extend_txt: null,
    salary_adj: null,
    salary_adj_txt: null,
    promotion: null,
    promotion_txt: null,
    pass: null,
    status: 3,    
}
*/
let obj = {
    staff_id: '1-9002',
    reviewer_id: '1-0001',
    comment: 'sss',
    score: 5,
    terminate: null,
    extend: null,
    extend_txt: null,
    salary_adj: null,
    salary_adj_txt: null,
    promotion: null,
    promotion_txt: null,
    pass: null,
    status: 3,
    year: '2022'
}
// Review.resultUpdate(obj)
// Review.scoreUpdate(obj)