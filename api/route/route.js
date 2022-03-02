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
    
    // review
    router.get('/review/get_self_review_summary',control.get_self_review_summary)
    router.get('/review/questions',control.getQuestions)
    router.get('/review/qna_get',control.getQNA)
    // router.get('/review/ans+score_insert',)
    router.put('/review/ans_score_update',control.updateAnswer)
    

    return router
}
// router.get('/', "callback function to get data")