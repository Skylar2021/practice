"use strict"
import sql from 'mssql'
import { sqlConfig } from './db.config.js'

export class Summary {
    static async self_review(id, assign_type) {
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

    Summary.self_review('1-2878', 'S')