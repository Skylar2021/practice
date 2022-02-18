import express from 'express'
import Controller from '../controller/control.js'

export function route() {
    let control = new Controller()
    const router = express.Router()

    router.get('/', control.getAllUserData)
    router.post('/login', control.login)
    router.post('/register', control.register)
    router.post('/logout', control.logout)

    router.delete('/del-ac', control.delAc)
    
    router.put('/pwdchange/:uid',control.pwdChange)

    return router
}
// router.get('/', "callback function to get data")