import { User } from '../model/db.user.js'
import { Record } from '../model/db.record.js'
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
    getAllUserData = async (req, res) => {
        try {
            let result = await User.getAllUser()
            res.status(200).json(result)

        } catch (err) {
            console.log(err)
        }
    }

    login = async (req, res) => {
        console.log("login")

        console.log(req.session)
        console.log("session id")
        console.log(req.sessionID)
        console.log(req.session.userData)
        if (!req.body.uid || !req.body.password) {
            res.status(400).json({ login: false, message: "user id or password empty" })
            return
        }
        if (req.session.userData) {
            res.json({ login: true, user: req.session.userData, message: "user logged in alreday" })

            return
        }
        try {
            let userFound = await User.getUserDataByUserId(req.body.uid)
            if (!userFound) {
                res.status(400).json({ login: false, message: "user id not found" })
                return
            } else if (userFound.password.toString() === req.body.password) {
                let user = { "uid": userFound.uid, "username": userFound.username }
                req.session.userData = user
                res.status(200).json({ login: true, user: user })

            } else if (userFound.password.toString() !== req.body.password) {
                res.status(401).json({ login: false, message: "invalid password" })
            }

        } catch (err) {
            res.status(400).json({ login: false, message: "invalid user id" })
            console.log(err)
        }
    }
    register = async (req, res) => {
        console.log("register")

        console.log(req.session)
        console.log(req.sessionID)
        if (!req.body.uid || !req.body.password || !req.body.username) {
            res.status(400).json({ register: false, message: "user id, password or username empty" })
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
                res.status(400).json({ register: false, message: "user id existed" })
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
            res.status(200).json({ login: false, message: `user ${req.session.userData.username} logout` })
            req.session.destroy()

        } else {
            res.status(400).json({ message: "please login" })

        }
    }
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
            res.status(400).json({ message: "user id not found" })

        }
    }
    pwdChange = async (req, res) => {
        let userid = (req.params.uid) ? req.params.uid : req.body.uid
        let pwd = req.body.password
        console.log(`req: {uid: ${userid}, pwd: ${pwd}}`)
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
            res.json({ message: "empty user id or password" })
        }
    }
    getTimeRecord = async (req, res) => {
        try {
            let result = await Record.getAllTimeRecord()
            res.status(200).json(result)

        } catch (err) {
            console.log(err)
        }
    }

}

// module.exports = Controller

