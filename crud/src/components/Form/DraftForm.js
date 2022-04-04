import cookies from 'react-cookies';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAnswers, setSelfReviewStatus, testing } from '../../app/slice.js'

function DraftForm({ assign_type }) {
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const { answers, self_review } = useSelector(state => state.staff)
    const [supervisor, setSupervisor] = useState(false)

    const [ttl, setTtl] = useState(0)
    const [avg, setAvg] = useState(0)
    const disableSectionTen = () => {
        let section_10 = document.querySelectorAll(".section_10")
        console.log(section_10[0].disabled)
        setSupervisor(prev =>
            prev === true ? false : true
        )
        // return supervisor === true ? setSupervisor(false) : setSupervisor(true)
    }
    let dropDown = () => {
        let choices = []
        for (let i = 1; i < 11; i++) {
            choices.push(i)
        }


        return choices
    }
    const getQNA = async () => {
        let obj = {
            staff_id: cookies.load("userData")?.staff_id,
            year: cookies.load("userData")?.year,
            t_id: cookies.load("self_review")?.t_id,
            form_id: cookies.load("userData")?.form_id
        }
        console.log()
        console.log(obj)
        let response = await fetch("http://localhost:8080/review/qna_get", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj)
        })
        if (response.ok) {
            let result = await response.json()
            // console.log(answers)
            dispatch(getAnswers(result))
            // console.log(result)
        }
    }

    const calTtl = () => {
        let score_ttl = 0
        let choices = Array.from(document.querySelectorAll(".choice_id"))
        choices.forEach(choice => {
            score_ttl += parseInt(choice.value)
        })

        if (isNaN(score_ttl)) {
            answers.forEach(answer => {
                if (typeof answer.choice_id === "number") {
                    score_ttl += parseInt(answer.choice_id)
                }
            })
        }
        setTtl(score_ttl)
        // console.log(score_ttl)
        // console.log(ttl)
        document.querySelector(".ttl").innerHTML = score_ttl

        return score_ttl
    }

    const calAvg = () => {
        let score_ttl = 0, count = 0
        let choices = Array.from(document.querySelectorAll(".choice_id"))
        choices.forEach(choice => {
            score_ttl += parseInt(choice.value)
            count++
        })
        let score_avg = score_ttl / count
        // setAvg(score_avg.toFixed(2))

        if (isNaN(score_avg)) {
            score_ttl = 0
            score_avg = 0
            count = 0
            answers.forEach(answer => {
                if (typeof answer.choice_id === "number") {
                    // console.log(score_ttl)    
                    score_ttl += parseInt(answer.choice_id)
                    count++
                    // console.log(score_ttl, count)
                }

            })

            score_avg = score_ttl / count
        }
        setAvg(score_avg.toFixed(2))
        // console.log(score_avg.toFixed(2))
        // console.log(avg)
        document.querySelector(".avg").innerHTML = score_avg.toFixed(2)
        return score_avg.toFixed(2)
    }

    const calculate = () => {
        calTtl();
        calAvg();
    }
    // console.log(ttl)
    // console.log(avg)
    const checkChoiceOver7 = () => {
        let count = 0
        let warnArr = []
        let answers = Array.from(document.querySelectorAll(".answer"))
        answers.forEach(answer => {
            if (parseInt(answer.choice_id.value) >= 7 && answer.comment.value === "") {
                count++
                warnArr.push(answer.comment.id)
                // console.log(answer.choice_id)
                // console.log(answer.comment.id)
            }
        })

        warnArr.forEach(warn => document.querySelector(`#${warn}`).classList.add("red-border"))
        // warnArr.forEach(warn => document.querySelector(`#${warn}`).style.borderColor = "red")

        return count > 0 ? true : false
    }
    const removeRedBorder = () => {
        let textAreas = document.querySelectorAll(".red-border")
        textAreas.forEach(textArea => textArea.classList.remove("red-border"))

    }

    const sendEmail = async () => {
        let body = {
            deadline: cookies.load("self_review")?.close_date?.slice(0, (cookies.load("self_review")?.close_date.indexOf('T'))),
            receiver: cookies.load("userData")?.name,
            address: cookies.load("userData")?.email,
            assign_type
        }
        let response = await fetch("http://localhost:8080/email/instant", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)

        })
        if (response.ok) {
            let result = await response.json()
            // console.log(result)
        } else {
            let result = await response.json()
            console.log("error", result)
        }
    }

    const handleSave = () => {
        removeRedBorder();
        calculate();
        let allForm = Array.from(document.querySelectorAll(".answer"))
        let ansArr = allForm.map(obj =>
        ({
            t_id: obj?.t_id?.value,
            form_id: obj?.form_id?.value,
            section: obj?.section?.value,
            question_id: obj?.question_id?.value,
            choice_id: obj?.choice_id?.disabled ? null : obj?.choice_id?.value,
            comments: obj?.comment?.disabled ? null : obj?.comment?.value,
            // choice_id: obj?.choice_id?.value,
            // comments: obj?.comment?.value,
            emp_mon_sales: obj?.emp_mon_sales ? obj?.emp_mon_sales.value : null,
            store_mon_sales: obj?.store_mon_sales ? obj?.store_mon_sales.value : null,
            emp_avg_sales: obj?.emp_avg_sales ? obj?.emp_avg_sales.value : null,
            store_avg_sales: obj?.store_avg_sales ? obj?.store_avg_sales.value : null,

        })
        )

        let scoreObj = {
            t_id: cookies.load("self_review")?.t_id,
            form_id: cookies.load('userData')?.form_id,
            staff_id: cookies.load('userData')?.staff_id,
            assign_type: assign_type,
            reviewer_id: cookies.load('userData')?.supervisor_id,
            status: "1",
            appr_id: cookies.load('userData')?.supervisor_id,
            score_ttl: calTtl(),
            score_avg: calAvg(),
            is_optional: "N"
        }
        ansArr.forEach(ansObj => updateAnswer(ansObj))
        ansArr.forEach(ansObj => updateAnswer(ansObj))
        if (typeof ttl === "number" && typeof avg === "number") {
            updateScore(scoreObj)
        }

        // console.log(ansArr)
        // console.log(scoreObj)

        navigate('/summary', { state: { status: "1" } })

    }

    const handleSubmit = () => {
        removeRedBorder()
        calculate();
        if (checkChoiceOver7()) {
            alert("Please enter comments if any performance statement scored 7 to 10. \n任何評估項目分數為7至10，必須輸入評語。")
            return
        };

        let allForm = Array.from(document.querySelectorAll(".answer"))
        let ansArr = allForm.map(obj =>
        ({
            t_id: obj?.t_id?.value,
            form_id: obj?.form_id?.value,
            section: obj?.section?.value,
            question_id: obj?.question_id?.value,
            choice_id: obj?.choice_id?.disabled ? null : obj?.choice_id?.value,
            comments: obj?.comment?.disabled ? null : obj?.comment?.value,
            // choice_id: obj?.choice_id?.value,
            // comments: obj?.comment?.value,
            emp_mon_sales: obj?.emp_mon_sales ? obj?.emp_mon_sales.value : null,
            store_mon_sales: obj?.store_mon_sales ? obj?.store_mon_sales.value : null,
            emp_avg_sales: obj?.emp_avg_sales ? obj?.emp_avg_sales.value : null,
            store_avg_sales: obj?.store_avg_sales ? obj?.store_avg_sales.value : null,

        })
        )

        let scoreObj = {
            t_id: cookies.load("self_review")?.t_id,
            form_id: cookies.load('userData')?.form_id,
            staff_id: cookies.load('userData')?.staff_id,
            assign_type: assign_type,
            reviewer_id: cookies.load('userData')?.supervisor_id,
            status: "2",
            appr_id: cookies.load('userData')?.supervisor_id,
            score_ttl: ttl,
            score_avg: avg,
            is_optional: "N"
        }
        ansArr.forEach(ansObj => updateAnswer(ansObj))

        updateScore(scoreObj)

        // console.log(ansArr)
        // console.log(scoreObj)

        if (assign_type === "S") {

            dispatch(setSelfReviewStatus(2))
        }
        // sendEmail()
        // console.log(self_review.status)

        navigate('/summary', { state: { status: "2" } })



    }
    const updateAnswer = async (obj) => {
        let response = fetch("http://localhost:8080/review/ans_update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj)
        })
        if (response.ok) {
            let result = await result.json()
            console.log(result)
        }
    }
    const updateScore = async (obj) => {
        let response = fetch("http://localhost:8080/review/score_update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj)
        })
        if (response.ok) {
            let result = await result.json()
            // console.log(result)
        }
    }

    useEffect(() => {
        getQNA();
        dropDown();
        // dispatch(testing());
        // dispatch(selfReviewData(cookies.load('userData')?.staff_id))
        // calTtl();
        // calAvg();

    }, [])

    useEffect(() => {
        // console.log("calculate")
        calTtl();
        calAvg();

    }, [answers])

    const questionAvg = sectionId => {
        let allAns = Array.from(document.querySelectorAll(".answer"))
        .filter(ans=> ans.section.value == sectionId)
        // .forEach(ans=>console.log(ans.section.value))
        
        // console.log(allAns)
        let sectionScoreArr = allAns.map(ans=>parseInt(ans.choice_id.value))
        // console.log(sectionScoreArr)
        let ttl = sectionScoreArr.reduce((n1,n2)=>n1+n2,0)
        let avg = ttl / sectionScoreArr.length
        return avg.toFixed(1)

    }
    // console.log(questionAvg(1))

    return (
        <>
            <div width="100%" id="form-container" className='draft-form'>
                {/* <label>Total: {ttl}</label><br />
                <label>Average: {avg}</label> */}
                {answers.filter(answer => answer.section !== 20).map((answer, index) => (
                    <form style={{ borderTop: "solid" }}>
                        {answer?.show_header === "Y" &&
                            <div style={{ display: "flex", justifyCotent: "space-between", alignItems: "left", borderBottom: "solid" }}>
                                {answer?.is_optional === "Y" && <input type="checkbox" onClick={() => disableSectionTen()} name="supervisor" style={{ display: "inline-block", width: "max-content" }} />}
                                {/* { answer?.section?.toString() === "3" && <input type="checkbox" onClick={({ target }) => console.log(target.checked)} name="supervisor" style={{ display: "inline-block", position:"relative", left:"-10px" }} />} */}
                                <b>{answer?.section_header}</b>

                            </div>}

                        <div className='qna-container' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                            <div style={{ textAlign: "left" }}>

                                <label>{answer?.question_text}</label>
                                <br />
                                <label>{answer?.question_subtext}</label>
                            </div>
                            {answer?.section == "10" ?
                                <form className='answer' width="40%" style={{ borderLeft: "dashed 1px", paddingLeft: "5px" }}>

                                    <input name="t_id" value={answer?.t_id} type="hidden" />
                                    <input name="section" value={answer?.section} type="hidden" />
                                    <input name="question_id" value={answer?.question_id} type="hidden" />
                                    <input name="form_id" value={answer?.form_id} type="hidden" />
                                    <label style={{ display: "inline-block", marginRight: "10px" }}>Rating 評分</label>
                                    {/* {dropDown(answer?.section, answer?.question_id)} */}
                                    <select 
                                        name="choice_id" 
                                        className={`choice_id section_${answer?.section}`} 
                                        id={`S${answer?.section.toString()}Q${answer?.question_id.toString()}_choice`} 
                                        type="text" 
                                        style={{ display: "inline-block" }} 
                                        disabled={!supervisor}
                                        onChange={()=>calculate()}
                                        >
                                        {dropDown().map((choice, index) =>
                                            (<option value={choice} key={index}>{choice}</option>)
                                        )}
                                        {/* <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option> */}
                                    </select>

                                    <textarea
                                        name='comment'
                                        className={`comments section_${answer?.section}`}
                                        align="right"
                                        type="text"
                                        id={`S${answer?.section.toString()}Q${answer?.question_id.toString()}_cmt`}
                                        rows={4}
                                        cols={30} placeholder="Comments 評語 (Required if scored 7 to 10  必填，若評分為7至10)"
                                        disabled={!supervisor}
                                        defaultValue={answer?.comments} ></textarea>

                                    {answer?.sales_figure === "Y" && <table style={{ border: "solid" }}>
                                        <tr><td style={{ width: "max-content" }}></td><td>Employee</td><td>Store Avg.</td></tr>
                                        <tr><td style={{ width: "max-content" }}>Avg. Monthly Sales</td><td><input style={{ width: "80px" }} name='emp_mon_sales' /></td><td><input style={{ width: "80px" }} name='store_mon_sales' /></td></tr>
                                        <tr><td style={{ width: "max-content" }}>Avg. Sales/Transaction</td><td><input style={{ width: "80px" }} name='emp_avg_sales' /></td><td><input style={{ width: "80px" }} name='store_avg_sales' /></td></tr>

                                    </table>}

                                </form>
                                :
                                <form className='answer' width="40%" style={{ borderLeft: "dashed 1px", paddingLeft: "5px" }}>
                                    <input name="t_id" value={answer?.t_id} type="hidden" />

                                    <input name="section" value={answer?.section} type="hidden" />
                                    <input name="question_id" value={answer?.question_id} type="hidden" />
                                    <input name="form_id" value={answer?.form_id} type="hidden" />
                                    {cookies.load("userData")?.form_type_id === "F" && answer?.display_order === 1 && <label style={{ display: "block" }}>Average: {questionAvg(answer?.section) } </label>}
                                    <label style={{ display: "inline-block", marginRight: "10px" }}>Rating 評分</label>
                                    {/* {dropDown(answer?.section, answer?.question_id)} */}

                                    <select
                                        name="choice_id"
                                        className={`choice_id section_${answer?.section}`}
                                        id={`S${answer?.section.toString()}Q${answer?.question_id.toString()}_choice`}
                                        type="text"
                                        style={{ display: "inline-block" }}
                                        defaultValue={answer?.choice_id}
                                        onChange={()=>calculate()}
                                    >
                                        {dropDown().map((choice, index) =>
                                            (<option id={choice} value={choice} key={index}>{choice}</option>)
                                        )}
                                        {/* <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option> */}
                                    </select>

                                    <textarea
                                        key={index}
                                        name='comment'
                                        className={`comments section_${answer?.section}`}
                                        align="right" type="text"
                                        id={`S${answer?.section.toString()}Q${answer?.question_id.toString()}_cmt`}
                                        rows={4}
                                        cols={30} placeholder="Comments 評語
                                        (Required if scored 7 to 10  必填，若評分為7至10)"
                                        // value={}
                                        defaultValue={answer?.comments}
                                        onChange={e => {
                                            // console.log(e.target)
                                            console.log(e.target.value)
                                            // console.log(e.target.key)
                                        }}
                                    ></textarea>

                                    {answer?.sales_figure === "Y" && <table style={{ border: "solid" }}>
                                        <tr><td style={{ width: "max-content" }}></td><td>Employee</td><td>Store Avg.</td></tr>
                                        <tr><td style={{ width: "max-content" }}>Avg. Monthly Sales</td><td><input style={{ width: "80px" }} name='emp_mon_sales' defaultValue={answer?.emp_mon_sales} /></td><td><input style={{ width: "80px" }} name='store_mon_sales' defaultValue={answer?.store_mon_sales} /></td></tr>
                                        <tr><td style={{ width: "max-content" }}>Avg. Sales/Transaction</td><td><input style={{ width: "80px" }} name='emp_avg_sales' defaultValue={answer?.emp_avg_sales} /></td><td><input style={{ width: "80px" }} name='store_avg_sales' defaultValue={answer?.store_avg_sales} /></td></tr>

                                    </table>}

                                </form>
                            }
                        </div>

                    </form>
                ))}
            </div>
            <form style={{ borderTop: "solid" }}>

                {answers.filter(answer => answer.section == 20).map((answer, index) => (
                    <form className='answer'>

                        {answer?.show_header === "Y" &&
                            <label key={index}>{answer?.section === 10 && <input style={{ display: "inline-block", width: "max-content" }} type={'checkbox'} />}<b>{answer?.section_header}</b></label>}
                        <input name="t_id" value={answer?.t_id} type="hidden" />

                        <input name="section" value={answer?.section} type="hidden" />
                        <input name="question_id" value={answer?.question_id} type="hidden" />
                        <input name="form_id" value={answer?.form_id} type="hidden" />

                        {answer?.question_text}<br />{answer?.question_subtext}
                        <textarea name='comment' className='comments' id={`S${answer?.section.toString()}Q${answer?.question_id.toString()}_cmt`} rows={5} cols={30} placeholder="Comment" defaultValue={answer?.comments}></textarea>

                        <input name="choice_id" className={`choice section_${answer?.section}`} id={`S${answer?.section.toString()}Q${answer?.question_id.toString()}_choice`} type="hidden" style={{ display: "inline-block" }} disabled />

                    </form>
                ))
                }

            </form>

            <footer style={{ display: "flex", justifyCotent: "space-evenly", position: "fixed", bottom: "0px" }}>
                <button onClick={() => handleSave()}>Save</button>
                <button onClick={() => handleSubmit()}>submit</button>
                {/* <button onClick={() => calculate()}>Calculate</button> */}
                {/* <button onClick={() => calculate()}>Send Email</button> */}
                <button><a href='#top'>Back to Top</a></button>
                <button>Average: <span className='avg'>{avg}</span> Total: <span className='ttl'>{ttl}</span></button>
            </footer>


        </>
    )
}

export default DraftForm