"use strict"
import sql from 'mssql'
import { sqlConfig } from './db.config.js'

export class Record {
    static async getAllTimeRecord() {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .query('select * from crud_greet',)
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
    static async getAllExistUID() {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .query('select uid from crud_greet',)
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
    static async renewRecord(uid, greet, visible) {
        try {
            let con = await sql.connect(sqlConfig)
            let result = await con.request()
                .input('uid', sql.VarChar, uid)
                //uid to lower case
                .input('greet', sql.VarChar, greet)
                .input('visible', sql.Bit, visible)
                .query('UPDATE crud_greet SET greet = @greet , private = @visible WHERE uid = @uid')
            console.log(result.rowsAffected[0])
            console.log(result)
            return { rowsAffected: result.rowsAffected[0] }
        } catch (error) {
            console.log(error)

        }
    }

}

// Record.getAllExistUID()

// Record.renewRecord('andy','2022-01-06 00:00:00', 1)