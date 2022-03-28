import cookies from 'react-cookies';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// import { useForm } from "react-hook-form";

import { getQuestions } from '../../app/slice.js'
import { useEffect, useState } from 'react';


function BlankForm({ assign_type }) {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    // const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [supervisor, setSupervisor] = useState(false)
    const [ttl, setTtl] = useState(0)
    const [avg, setAvg] = useState(0)
    const { questionsBank } = useSelector(state => state.staff)

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

        // return (
        //     <select name="choice_id" id="choice_id" type="text" style={{ display: "inline-block" }}>
        //         {choices.map((choice, index) =>
        //             (<option value={choice} key={index}>{choice}</option>)
        //         )}
        //         {/* <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option> */}
        //     </select>
        // )
        return choices
    }
    // console.log(dropDown())

    const getQuestionContent = async () => {

        let response = await fetch("http://localhost:8080/review/questions", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "form_id": `${cookies.load("userData").form_id}` })
        })
        if (response.ok) {
            let result = await response.json()
            dispatch(getQuestions(result))
            // console.log("result")
            // console.log(result)
        }
    }
    useEffect(() => {
        getQuestionContent()
        dropDown()
        // console.log("useeffect")
        // console.log(questionsBank[0])
    }, [])

    const calTtl = () => {
        let score_ttl = 0
        let choices = Array.from(document.querySelectorAll(".choice_id"))
        choices.forEach(choice => {
            score_ttl += parseInt(choice.value)
        })

        setTtl(score_ttl)
        console.log(score_ttl)
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


        setAvg(score_avg.toFixed(2))
        console.log(score_avg.toFixed(2))
        // console.log(avg)
        document.querySelector(".avg").innerHTML = score_avg.toFixed(2)

        return score_avg.toFixed(2)
    }

    const calculate = () => {
        calTtl();
        calAvg();
        // console.log(ttl)
        // console.log(avg)
    }
    const removeRedBorder = () => {
        let textAreas = document.querySelectorAll(".red-border")
        textAreas.forEach(textArea => textArea.classList.remove("red-border"))

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
            t_id: genT_id(),
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
            t_id: genT_id(),
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
        insertScore(scoreObj)
        ansArr.forEach(ansObj => insertAnswer(ansObj))

        console.log(ansArr)
        console.log(scoreObj)
        // let objArr = {
        //     t_id: genT_id(),
        //     form_id: allForm[13]?.form_id?.value,
        //     section: allForm[13]?.section?.value,
        //     question_id: allForm[13]?.question_id?.value,
        //     choice_id: allForm[13]?.choice_id?.value,
        //     choice_id: allForm[13]?.choice_id?.disabled ? null : allForm[13]?.choice_id?.value,
        //     comments: allForm[13]?.comment?.disabled ? null : allForm[13]?.comment?.value,
        //     // comments: allForm[13]?.comment?.value,
        //     emp_mon_sales: allForm[13]?.emp_mon_sales ? allForm[13]?.emp_mon_sales.value : null,
        //     store_mon_sales: allForm[13]?.store_mon_sales ? allForm[13]?.store_mon_sales.value : null,
        //     emp_avg_sales: allForm[13]?.emp_avg_sales ? allForm[13]?.emp_avg_sales.value : null,
        //     store_avg_sales: allForm[13]?.store_avg_sales ? allForm[13]?.store_avg_sales.value : null,

        // }

        // console.log(objArr)
        // console.log(allForm[13])
        // console.log(allForm[13].comment.disabled)
        // console.log(allForm[10].comment.disabled)
        navigate('/summary')
    }

    const insertAnswer = async (obj) => {

        let response = await fetch("http://localhost:8080/review/ans_insert", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj)
        })
        if (response.ok) {
            let result = await response.json()
            console.log(result)

        }

    }
    const insertScore = async (obj) => {

        let response = await fetch("http://localhost:8080/review/score_insert", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(obj)
        })
        if (response.ok) {
            let result = await response.json()
            console.log(result)

        }

    }

    //     console.log(allForm[0])
    //     console.log({ section: allForm[0]?.section?.value })
    //     console.log(allForm[0]?.question_id?.value)
    //     console.log(allForm[0]?.form_id?.value)
    //     console.log(allForm[0]?.choice_id?.value)
    //     console.log(allForm[0]?.comment?.value)
    // }

    const checkChoiceOver7 = () => {
        let count = 0
        let warnArr = []
        let answers = Array.from(document.querySelectorAll(".answer"))
        answers.forEach(answer => {
            if (parseInt(answer.choice_id.value) >= 7 && answer.comment.value === "") {
                count++
                warnArr.push(answer.comment.id)
                console.log(answer.choice_id)
                console.log(answer.comment.id)
            }
        })

        warnArr.forEach(warn => document.querySelector(`#${warn}`).classList.add("red-border"))

        return count > 0 ? true : false
    }

    const genT_id = () => {
        let t_id = cookies.load('userData').form_type_id + cookies.load('userData').year.toString().slice(2) + cookies.load('userData').staff_id + assign_type + "01"

        cookies.save("self_review",{t_id: t_id})
        // console.log(t_id)
        return t_id
    }



    return (
        <>
            <div width="100%" id="form-container">
                <label>Total: {ttl}</label><br />
                <label>Average: {avg}</label>
                {questionsBank.filter(question => question.section !== 20).map((question, index) => (
                    <form style={{ borderTop: "solid" }}>
                        {question?.show_header === "Y" &&
                            <div style={{ display: "flex", justifyCotent: "space-between", alignItems: "left", borderBottom: "solid" }}>
                                {question?.is_optional === "Y" && <input type="checkbox" onClick={() => disableSectionTen()} name="supervisor" style={{ display: "inline-block", width: "max-content" }} />}
                                {/* { question?.section?.toString() === "3" && <input type="checkbox" onClick={({ target }) => console.log(target.checked)} name="supervisor" style={{ display: "inline-block", position:"relative", left:"-10px" }} />} */}
                                <b>{question?.section_header}</b>

                            </div>}


                        <div className='qna-container' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>

                            <div style={{ textAlign: "left" }}>

                                <label>{question?.question_text}</label>
                                <br />
                                <label>{question?.question_subtext}</label>
                            </div>
                            {question?.section == "10" ?
                                <form className='answer' width="40%" style={{ borderLeft: "dashed 1px", paddingLeft: "5px" }}>

                                    <input name="section" value={question?.section} type="hidden" />
                                    <input name="question_id" value={question?.question_id} type="hidden" />
                                    <input name="form_id" value={question?.form_id} type="hidden" />
                                    <label style={{ display: "inline-block", marginRight: "10px" }}>Rating 評分</label>
                                    {/* {dropDown(question?.section, question?.question_id)} */}
                                    <select name="choice_id" className={`choice_id section_${question?.section}`} id={`S${question?.section.toString()}Q${question?.question_id.toString()}_choice`} type="text" style={{ display: "inline-block" }} disabled={!supervisor}>
                                        {dropDown().map((choice, index) =>
                                            (<option value={choice} key={index}>{choice}</option>)
                                        )}
                                        {/* <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option> */}
                                    </select>

                                    <textarea name='comment' className={`comments section_${question?.section}`} align="right" type="text" id={`S${question?.section.toString()}Q${question?.question_id.toString()}_cmt`} rows={5} cols={30} placeholder="Comments 評語
                            (Required if scored 7 to 10  必填，若評分為7至10)"  disabled={!supervisor}></textarea>

                                    {question?.sales_figure === "Y" && <table style={{ border: "solid" }}>
                                        <tr><td style={{ width: "max-content" }}></td><td>Employee</td><td>Store Avg.</td></tr>
                                        <tr><td style={{ width: "max-content" }}>Avg. Monthly Sales</td><td><input style={{ width: "80px" }} name='emp_mon_sales' /></td><td><input style={{ width: "80px" }} name='store_mon_sales' /></td></tr>
                                        <tr><td style={{ width: "max-content" }}>Avg. Sales/Transaction</td><td><input style={{ width: "80px" }} name='emp_avg_sales' /></td><td><input style={{ width: "80px" }} name='store_avg_sales' /></td></tr>

                                    </table>}

                                </form>
                                :
                                <form className='answer' width="40%" style={{ borderLeft: "dashed 1px", paddingLeft: "5px" }}>

                                    <input name="section" value={question?.section} type="hidden" />
                                    <input name="question_id" value={question?.question_id} type="hidden" />
                                    <input name="form_id" value={question?.form_id} type="hidden" />
                                    <label style={{ display: "inline-block", marginRight: "10px" }}>Rating 評分</label>
                                    {/* {dropDown(question?.section, question?.question_id)} */}
                                    <select name="choice_id" className={`choice_id section_${question?.section}`} id={`S${question?.section.toString()}Q${question?.question_id.toString()}_choice`} type="text" style={{ display: "inline-block" }}>
                                        {dropDown().map((choice, index) =>
                                            (<option id={choice} value={choice} key={index}>{choice}</option>)
                                        )}
                                        {/* <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option> */}
                                    </select>

                                    <textarea name='comment' className={`comments section_${question?.section}`} align="right" type="text" id={`S${question?.section.toString()}Q${question?.question_id.toString()}_cmt`} rows={5} cols={30} placeholder="Comments 評語
                            (Required if scored 7 to 10  必填，若評分為7至10)" ></textarea>

                                    {question?.sales_figure === "Y" && <table style={{ border: "solid" }}>
                                        <tr><td style={{ width: "max-content" }}></td><td>Employee</td><td>Store Avg.</td></tr>
                                        <tr><td style={{ width: "max-content" }}>Avg. Monthly Sales</td><td><input style={{ width: "80px" }} name='emp_mon_sales' /></td><td><input style={{ width: "80px" }} name='store_mon_sales' /></td></tr>
                                        <tr><td style={{ width: "max-content" }}>Avg. Sales/Transaction</td><td><input style={{ width: "80px" }} name='emp_avg_sales' /></td><td><input style={{ width: "80px" }} name='store_avg_sales' /></td></tr>

                                    </table>}

                                </form>
                            }
                        </div>

                    </form>
                ))}
            </div>

            {/* <div width="100%">
                <form name="form1" className='form' onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", justifyCotent: "space-between", alignItems: "center" }}>
                    <div>
                        <label>
                            <input type={"checkbox"} name="supervisor" />{questionsBank[0]?.show_header === "Y" && <b>{questionsBank[0]?.section_header}</b>}
                            <p>
                            </p>
                        </label>
                        <label>{questionsBank[0]?.question_text}</label>
                        <label>{questionsBank[0]?.question_subtext}</label>
                    </div>
                    <input name="section" value={questionsBank[0]?.section} type="hidden" />
                    <input name="question_id" value={questionsBank[0]?.question_id} type="hidden" />
                    <input name="form_id" value={questionsBank[0]?.form_id} type="hidden" />
                    <input name="form_id" value={questionsBank[0]?.form_id}/>
                    {dropDown(questionsBank[0]?.section, questionsBank[0]?.question_id)}
                    <textarea id={`S${questionsBank[0]?.section.toString()}Q${questionsBank[0]?.question_id.toString()}_cmt`} name='comment' className='comments' rows={5} cols={30} placeholder="Comments 評語
                        (Required if scored 7 to 10  必填，若評分為7至10)"></textarea>
                    <input type="submit" />
                </form>
            </div>
            <button onClick={() => handleSubmit()}>submit</button> */}


            <form style={{ borderTop: "solid" }}>


                {questionsBank.filter(question => question.section == 20).map((question, index) => (
                    <form className='answer'>

                        {question?.show_header === "Y" &&
                            <label key={index}>{question?.section === 10 && <input style={{ display: "inline-block", width: "max-content" }} type={'checkbox'} />}<b>{question?.section_header}</b></label>}
                        <input name="section" value={question?.section} type="hidden" />
                        <input name="question_id" value={question?.question_id} type="hidden" />
                        <input name="form_id" value={question?.form_id} type="hidden" />

                        {question?.question_text}<br />{question?.question_subtext}
                        <textarea name='comment' className='comments' id={`S${question?.section.toString()}Q${question?.question_id.toString()}_cmt`} rows={5} cols={30} placeholder="Comment"></textarea>

                        <input name="choice_id" className={`choice section_${question?.section}`} id={`S${question?.section.toString()}Q${question?.question_id.toString()}_choice`} type="hidden" style={{ display: "inline-block" }} disabled>
                            {/* {dropDown().map((choice, index) =>
                                            (<option value={choice} key={index}>{choice}</option>)
                                        )} */}
                            {/* <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option> */}
                        </input>

                    </form>
                ))
                }

            </form>



            <footer style={{ display: "flex", justifyCotent: "space-evenly", position: "fixed", bottom: "0px" }}>
                <button>Save</button>
                <button onClick={() => handleSubmit()}>submit</button>

                <button onClick={() => calculate()}>Calculate</button>
                <button><a href='#form-container'>Back to Top</a></button>
                <button>Average: <span className='avg'>{avg}</span> Total: <span className='ttl'>{ttl}</span></button>

                {/* <button></button> */}
            </footer>
        </>

    )
}

export default BlankForm;