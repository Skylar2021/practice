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
    router.get('/review/get_tp_review_summary',control.get_tp_review_summary)
    router.get('/review/questions',control.getQuestions)
    router.get('/review/qna_get',control.getQNA)
    // router.get('/review/ans+score_insert',)
    router.put('/review/ans_update',control.updateAnswer)
    router.post('/review/ans_insert',control.insertAnswer)
    router.get('/review/score_get',control.getScores)
    router.put('/review/score_update',control.updateScore)
    router.post('/review/score_insert',control.insertScore)
    router.get('/review/score_summary_get',control.getScoreSummary)
    router.get('/review/result_get',control.getResult)
    router.put('/review/result_update',control.updateResult)
    router.post('/review/result_insert',control.insertResult)
    router.get('/review/get_topdown',control.getTopDown)
    router.get('/review/get_dept_summary',control.getDeptSummary)
    

    return router
}
// router.get('/', "callback function to get data")