import express from 'express'
import Controller from '../controller/control.js'

export function route() {
    let control = new Controller()
    const router = express.Router()

    // router.get('/', control.getAllUserData)

    //staff login, logout, password update
    router.post('/login', control.login)
    router.post('/logout', control.logout)
    router.put('/pwdchange',control.pwdChange)
    // router.delete('/del-ac', control.delAc)
    // router.post('/register', control.register)
    
    router.get('/summary/get_self_review_summary',control.get_self_review_summary)
    

    return router
}
// router.get('/', "callback function to get data")