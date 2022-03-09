import { User } from '../model/db.user.js'
import { Record } from '../model/db.record.js'
import { Staff } from '../model/db.staff.js'
import { Review } from '../model/db.review.js'
// const User = require('../model/db.model')


export default class Controller {
    constructor() {

    }

    // static year = new Date().getFullYear()

    getTestString = async (req, res, next) => {
        try {
            res.status(200).json({ result: true, message: "ok!" })
        } catch (err) {
            res.status(500).json({ result: false, message: "not ok!" })

        }
    }

    /*
    getAllUserData = async (req, res) => {
        try {
            let result = await User.getAllUser()
            res.status(200).json(result)

        } catch (err) {
            console.log(err)
        }
    }
    */
    getStaffInfo = async (req,res) =>{
        if (!req.body.id ) {
            res.status(400)
            res.json({ message: "Staff ID empty" })
            return
        }
        try {
            let userFound = await Staff.getStaffDataById(req.body.id)

            console.log("userFound: ")
            console.log(userFound)
            if (!userFound) {
                res.status(400).json({ message: "Staff ID not found" })
                return
            } else {
            /*
            else if (userFound.password.toString() === req.body.password) {
                // let user = { "staff_id": userFound.staff_id, "username": userFound.name }
                req.session.userData = {}
                req.session.userData["staff_id"] = userFound.staff_id
                req.session.userData["name"] = userFound.name
                req.session.userData["chinese_name"] = userFound.chinese_name
                req.session.userData["grade_id"] = userFound.grade_id
                req.session.userData["position_id"] = userFound.position_id
                req.session.userData["position_desc"] = userFound.position_desc
                req.session.userData["dept_id"] = userFound.dept_id
                req.session.userData["dept_name"] = userFound.dept_name
                req.session.userData["dept_head_id"] = userFound.dept_head_id
                req.session.userData["div_head_id"] = userFound.div_head_id
                req.session.userData["final_score_id"] = userFound.final_score_id
                req.session.userData["supervisor_id"] = userFound.supervisor_id
                req.session.userData["date_joined"] = userFound.date_joined
                req.session.userData["email"] = userFound.email
                req.session.userData["reviewer_id"] = userFound.reviewer_id
                req.session.userData["form_type_id"] = userFound.form_type_id
                req.session.userData["form_id"] = userFound.form_id
                req.session.userData["year"] = new Date().getFullYear()
                console.log(req.session.userData)
                // req.session.userData[""] = userFound.
                let user = {
                    staff_id: userFound.staff_id,
                    name: userFound.name,
                    chinese_name: userFound.chinese_name,
                    dept: userFound.dept_name,
                    position: userFound.position_desc,
                    date_joined: userFound.date_joined,
                    email: userFound.email
                }
                */
                res.status(200).json({  user: userFound })

            } 

        } catch (err) {
            res.status(400).json({ message: "try again! " })
            console.log(err)
        }
    }

    login = async (req, res) => {
        console.log("login")
        console.log(req.session)
        // console.log("session id")
        console.log(req.sessionID)
        // console.log(req.session?.userData)
        if (!req.body.id || !req.body.password) {
            res.status(400)
            res.json({ login: false, message: "Staff ID or password empty" })
            return
        }
        if (req.session.userData) {
            res.status(400)
            res.json({ login: true, user: req.session.userData, message: "user logged in alreday" })
            return
        }
        try {
            let userFound = await Staff.getStaffDataById(req.body.id)

            console.log("userFound: ")
            console.log(userFound)
            if (!userFound) {
                res.status(400)
                res.json({ login: false, message: "Staff ID not found" })
                return
            } else if (userFound.password.toString() === req.body.password) {
                // let user = { "staff_id": userFound.staff_id, "username": userFound.name }
                req.session.userData = {}
                req.session.userData["staff_id"] = userFound.staff_id
                req.session.userData["name"] = userFound.name
                req.session.userData["chinese_name"] = userFound.chinese_name
                req.session.userData["grade_id"] = userFound.grade_id
                req.session.userData["position_id"] = userFound.position_id
                req.session.userData["position_desc"] = userFound.position_desc
                req.session.userData["dept_id"] = userFound.dept_id
                req.session.userData["dept_name"] = userFound.dept_name
                req.session.userData["dept_head_id"] = userFound.dept_head_id
                req.session.userData["div_head_id"] = userFound.div_head_id
                req.session.userData["final_score_id"] = userFound.final_score_id
                req.session.userData["supervisor_id"] = userFound.supervisor_id
                req.session.userData["date_joined"] = userFound.date_joined
                req.session.userData["email"] = userFound.email
                req.session.userData["reviewer_id"] = userFound.reviewer_id
                req.session.userData["form_type_id"] = userFound.form_type_id
                req.session.userData["form_id"] = userFound.form_id
                req.session.userData["year"] = new Date().getFullYear()
                console.log(req.session.userData)
                // req.session.userData[""] = userFound.
                let user = {
                    staff_id: userFound.staff_id,
                    name: userFound.name,
                    chinese_name: userFound.chinese_name,
                    dept: userFound.dept_name,
                    position: userFound.position_desc,
                    supervisor_id: userFound.supervisor_id,
                    date_joined: userFound.date_joined,
                    email: userFound.email,
                    form_type_id : userFound.form_type_id,
                    form_id : userFound.form_id,
                    year : new Date().getFullYear()
                }
                res.status(200).json({ login: true, user: user })

            } else if (userFound.password.toString() !== req.body.password) {
                res.status(400)
                res.json({ login: false, message: "invalid password" })
            }

        } catch (err) {
            res.status(400).json({ login: false, message: "try again! " })
            console.log(err)
        }
    }

    logout = async (req, res) => {
        // session destory
        console.log("logout")

        console.log(req.session)
        console.log(req.session.userData)

        if (req.session.userData) {
            res.status(200).json({ login: false, message: `user ${req.session.userData.name} logout` })
            req.session.destroy()

        } else {

            res.status(400).json({ message: "please login" })

        }
    }
    /*
    
    pwdChange = async (req, res) => {
        let userid = (req.params.uid) ? req.params.uid : req.body.uid
        // let userid = (req.params.uid) ? req.params.uid : req.body.uid
        let pwd = req.body.password
        console.log(`req: {id: ${userid}, pwd: ${pwd}}`)
        if (userid && pwd) {
            try {
                let affected = await User.updatePasswordByUserId(userid, pwd)
                if (affected.rowsAffected) {
                    res.status(200).json({ message: "password updated" })

                } else {
                    res.status(500).json({ message: "password cannot update" })
                }
            } catch (err) {
                console.log(err)

            }
        } else {
            res.json({ message: "empty Staff ID or password" })
        }
    }
    */
    pwdChange = async (req, res) => {
        let id = req.body.id
        // let userid = (req.params.uid) ? req.params.uid : req.body.uid
        let pwd = req.body.password
        if (id && pwd) {
            console.log(`req: {id: ${id}, pwd: ${pwd}}`)
            try {
                let affected = await Staff.updatePasswordBySatffId(id, pwd)
                if (affected.rowsAffected) {
                    res.status(200).json({ message: "password updated" })

                } else {
                    res.status(400).json({ message: "password cannot update, please try again" })
                }
            } catch (err) {
                res.status(400).json({ message: "Please try again! " })
                console.log(err)

            }
        } else {
            res.status(400).json({ message: "Staff ID or password empty" })
        }
    }

    get_self_review_summary = async (req, res) => {
        let assign_type = 'S'
        // let staffId = req.body.id
        let staffId = req.session.userData["staff_id"]
        console.log("staff_id:", staffId)
        if (staffId) {
            try {
                let result = await Review.get_self_review(staffId, assign_type)
                if (result) {
                    req.session.review = {}
                    req.session.review["t_id"] = result.t_id
                    req.session.review["close_date"] = result.close_date
                    req.session.review["appr_from_date"] = result.appr_from_date
                    req.session.review["appr_to_date"] = result.appr_to_date
                    console.log(req.session.review["t_id"])
                    res.status(200).json(result)
                    // console.log(result)
                }
            } catch (err) {
                console.log(err)
                res.status(400).json({ message: "Please try again! " })
            }
        } else {
            res.status(400).json({ message: "staff id empty" })
        }
    }
    
    get_tp_review_summary = async (req, res) => {
        if (req.session.userData["staff_id"]) {
            let staffId = req.session.userData["staff_id"]
            try {
                let result = await Review.getMySummary_td(staffId, 'T')
                console.log(result)
                res.status(200).json(result)
            } catch (err) {
                console.log(err)
                res.status(400).json({ message: "Please try again!" })
                
            }
        }
    }

    getQuestions = async (req, res) => {
        let form_id = req.session.review["form_id"]
        if (form_id) {
            try {
                let result = await Review.getQuestionByFormId(form_id)
                res.status(200).json(result)


            } catch (err) {
                console.log(err)
                res.status(400).json({ message: "Please try again! " })

            }
        } else if (req.body.form_id) {
            try {
                let result = await Review.getQuestionByFormId(req.body.form_id)
                res.status(200).json(result)
            } catch (err) {
                console.log(err)
                res.status(400).json({ message: "Please try again! " })

            }
        } else {
            res.status(400).json({ message: "form ID empty" })
        }
    }

    getQNA = async (req, res) => {
        if (req.session.userData["staff_id"] && req.session.userData["year"] && req.session.review["t_id"] && req.session.userData["form_id"]) {
            let staffId = req.session.userData["staff_id"],
                year = req.session.userData["year"],
                t_id = req.session.review["t_id"],
                formId = req.session.userData["form_id"]
            try {
                let result = await Review.getQNA(staffId, formId, t_id, year)
                if (result) {
                    res.status(200).json(result)
                }
            } catch (err) {
                console.log(err)
                res.status(400).json({ message: "Please try again!" })
            }
        } else {
            res.status(400).json({ message: "staff id, year, t_id or form id empty" })

        }
    }
// index = 0 >>> self
// index = 1 >>> top down
    getScores = async (req, res) => {
        if (req.session.userData["staff_id"]) {
            try {
                let result = await Review.getScoreByStaffId(req.session.userData["staff_id"])
                if (result) {
                    console.log(result)
                    res.status(200).json(result)
                }
            } catch (err) {
                console.log(err)
                res.status(400).json({ message: "Please try again!" })
            }

        } else {
            res.status(400).json({ message: "staff ID empty" })
        }

    }
    updateAnswer = async (req, res) => {
        if (req.body) {
            console.log(req.body)
            try {
                let result = await Review.ansUpdate(req.body)
                if (result.rowsAffected) {
                    res.status(200).json({ message: "updated" })
                } else {
                    res.status(400).json({ message: "fail to update" })

                }
            } catch (err) {
                res.status(400).json({ message: "Please try again!" })

            }
        }
    }
    insertAnswer = async (req, res) => {
        if (req.body) {
            console.log(req.body)
            try {
                let result = await Review.ansInsert(req.body)
                if (result.rowsAffected) {
                    res.status(200).json({ message: "updated" })
                } else {
                    res.status(400).json({ message: "fail to update" })

                }
            } catch (err) {
                res.status(400).json({ message: "Please try again!" })

            }
        }
    }
    updateScore = async (req, res) => {
        if (req.body) {
            console.log(req.body)
            try {
                let result = await Review.scoreUpdate(req.body)
                if (result.rowsAffected) {
                    res.status(200).json({ message: "updated" })
                } else {
                    res.status(400).json({ message: "fail to update" })

                }
            } catch (err) {
                res.status(400).json({ message: "Please try again!" })

            }
        }
    }
    insertScore = async (req, res) => {
        if (req.body) {
            console.log(req.body)
            try {
                let result = await Review.scoreInsert(req.body)
                if (result.rowsAffected) {
                    res.status(200).json({ message: "inserted" })
                } else {
                    res.status(400).json({ message: "fail to insert" })

                }
            } catch (err) {
                res.status(400).json({ message: "Please try again!" })

            }
        }
    }
    getTopDown = async (req, res) => {
        // get staff_id from session
        let staffId = req.body.staff_id
        console.log(staffId)
        if (staffId) {
            try {
                let result = await Review.getTopDownList(staffId, 'T')
                if (result) {
                    console.log(result)
                    res.status(200).json(result)
                } else {
                    res.status(400).json({ message: "no result" })

                }

            } catch (err) {
                console.log(err)
                res.status(400).json({ message: "Please try again!", error: err.message })

            }
        }
    }
    getDeptSummary = async (req, res) => {
        // get staff_id from session
        let staffId = req.body.staff_id
        console.log(staffId)
        if (staffId) {
            try {
                let result = await Review.getDeptReview(staffId)
                if (result) {
                    console.log(result)
                    res.status(200).json(result)
                } else {
                    res.status(400).json({ message: "no result" })

                }

            } catch (err) {
                console.log(err)
                res.status(400).json({ message: "Please try again!", error: err.message })

            }
        }
    }

    getScoreSummary = async (req, res) =>{
        let staffId = req.body.staff_id
        if(staffId){
            try {
                let result = await Review.getScoreSummaryById(staffId)
                if (result) {
                    console.log(result)
                    res.status(200).json(result)
                } else {
                    res.status(400).json({ message: "no result" })
                }

            } catch (err) {
                console.log(err)
                res.status(400).json({ message: "Please try again!", error: err.message })
            }
        } else{
            res.status(400).json({ message: "staff id empty" })
        }
    }
    getResult = async (req, res) =>{
        let staffId = req.body.staff_id
        if(staffId){
            try {
                let result = await Review.getResultById(staffId)
                if (result) {
                    console.log(result)
                    res.status(200).json(result)
                } else {
                    res.status(400).json({ message: "no result" })
                }

            } catch (err) {
                console.log(err)
                res.status(400).json({ message: "Please try again!", error: err.message })
            }
        } else{
            res.status(400).json({ message: "staff id empty" })
        }
    }
    insertResult = async (req, res) => {
        if (req.body) {
            console.log(req.body)
            try {
                let result = await Review.resultInsert(req.body)
                if (result.rowsAffected) {
                    res.status(200).json({ message: "inserted" })
                } else {
                    res.status(400).json({ message: "fail to insert" })

                }
            } catch (err) {
                res.status(400).json({ message: "Please try again!",error:err.message })

            }
        }
    }
    updateResult = async (req, res) => {
        if (req.body) {
            console.log(req.body)
            try {
                let result = await Review.resultUpdate(req.body)
                if (result.rowsAffected) {
                    res.status(200).json({ message: "updated" })
                } else {
                    res.status(400).json({ message: "fail to update" })

                }
            } catch (err) {
                res.status(400).json({ message: "Please try again!",error:err.message })

            }
        }
    }


}




