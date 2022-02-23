import { User } from '../model/db.user.js'
import { Record } from '../model/db.record.js'
import { Staff } from '../model/db.staff.js'
import { Review } from '../model/db.review.js'
// const User = require('../model/db.model')


export default class Controller {
    constructor() {
    }

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

    login = async (req, res) => {
        console.log("login")
        console.log(req.session)
        console.log("session id")
        console.log(req.sessionID)
        console.log(req.session?.userData)
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
                // let user = { "staff_d": userFound.staff_id, "username": userFound.name }
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
    /*
    register = async (req, res) => {
        console.log("register")

        console.log(req.session)
        console.log(req.sessionID)
        if (!req.body.uid || !req.body.password || !req.body.username) {
            res.status(400).json({ register: false, message: "Staff ID, password or username empty" })
            return
        }
        if (req.session.userData) {
            res.status(400).json({ login: true, message: "user logged in alreday" })
            return
        }
        try {
            let users = await User.getAllUser()
            let isExist = users?.find(user => user.uid == req.body.uid)
            if (isExist) {
                res.status(400).json({ register: false, message: "Staff ID existed" })
            } else {
                try {
                    let regUser = await User.addNewUser(req.body.uid, req.body.password, req.body.username)
                    if (regUser.rowsAffected) {

                        res.status(200).json({ register: true, message: "user created", rowsAffected: `${regUser.rowsAffected}` })
                    } else {
                        console.log(regUser)

                    }

                } catch (err) {
                    console.log(err)
                    res.status(500).json({ register: false, message: "fail to create" })

                }

            }
            // obj = { "uid": req.body.uid, "password": req.body.password, "username": req.body.username }
        } catch (err) {
            console.log(err)

            res.status(500).json({ register: false, message: "server error" })
        }
    }
    */
    logout = async (req, res) => {
        // session destory
        console.log("logout")

        console.log(req.session)
        console.log(req.session.userData)
        // if (this.sessionData["user"]) {
        //     this.sessionData.destroy(err => {
        //         if (err) console.log(err)
        //     })
        if (req.session.userData) {
            res.status(200).json({ login: false, message: `user ${req.session.userData.name} logout` })
            req.session.destroy()

        } else {

            res.status(400).json({ message: "please login" })

        }
    }
    /*
    delAc = async (req, res) => {
        // session destory
        console.log(req.session)
        console.log(req.sessionID)
        let uid = req.body.uid
        if (uid) {
            try {
                let affected = await User.delUserByUserId(uid)
                if (affected.rowsAffected) {
                    req.session.destroy()
                    res.status(200).json({ message: "account deleted", res: affected, "session": req.session.userData })

                } else {
                    res.status(400).json({ message: "fail to delete", res: affected })

                }
            } catch (err) {
                res.status(500).json({ message: "failure" })
                console.log(err)
            }
        } else {
            res.status(400).json({ message: "Staff ID not found" })

        }
    }
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

    getQuestions = async (req, res) => {
        let form_id = req.session.review["form_id"]
        if (form_id) {
            try {
                let result = await Review.getQuestionByFormId(form_id)
                res.status(200).json(result)


            } catch (err) {
                console.log(err)
                res.status(400).json({  message: "Please try again! " })
                
            }
        } else if (req.body.form_id) {
            try {
                let result = await Review.getQuestionByFormId(req.body.form_id)
                res.status(200).json(result)
            } catch (err) {
                console.log(err)
                res.status(400).json({  message: "Please try again! " })
                
            }
        } else {
            res.status(400).json({ message: "form ID empty" })
        }
    }

    getQNA = async(req, res) =>{
        if(req.session.userData["staff_id"] && req.session.userData["year"] && req.session.review["t_id"] && req.session.userData["form_id"]){
            let staffId = req.session.userData["staff_id"],
            year = req.session.userData["year"],
            t_id = req.session.review["t_id"],
            formId = req.session.userData["form_id"]
            try {
                let result = await Review.getQNA(staffId,formId, t_id, year)
                if(result){
                    res.status(200).json(result)
                }
            } catch (err) {
                console.log(err)
                res.status(400).json({  message: "Please try again! " })
            }
        } else {
            res.status(400).json({message: "staff id, year, t_id or form id empty"})

        }
    }

    getScores = async (req, res) => {
        if (req.session.userData["staff_id"]) {
            let result = await Review.getScoreByStaffId(req.session.userData["staff_id"])
            
        } else {
            res.status(400).json({ message: "staff ID empty" })
        }

    }


}


