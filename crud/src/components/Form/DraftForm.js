import cookies from 'react-cookies';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { getAnswers } from '../../app/slice.js'



function DraftForm({assign_type}) {
    const dispatch = useDispatch()

    const { answers } = useSelector(state => state.staff)
    const [supervisor, setSupervisor] = useState(false)

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
            let answers = await response.json()
            console.log(answers)
            dispatch(getAnswers(answers))
            // console.log(result)
        }
    }
    useEffect(() => {
        getQNA()
        dropDown()
        // console.log("useeffect")
        // console.log(questionsBank[0])
    }, [])
            console.log(answers)

    return (
        <>
            <div width="100%" id="form-container">
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

                                    <input name="section" value={answer?.section} type="hidden" />
                                    <input name="question_id" value={answer?.question_id} type="hidden" />
                                    <input name="form_id" value={answer?.form_id} type="hidden" />
                                    <label style={{ display: "inline-block", marginRight: "10px" }}>Rating 評分</label>
                                    {/* {dropDown(answer?.section, answer?.question_id)} */}
                                    <select name="choice_id" className={`choice_id section_${answer?.section}`} id={`S${answer?.section.toString()}Q${answer?.question_id.toString()}_choice`} type="text" style={{ display: "inline-block" }} disabled={!supervisor}>
                                        {dropDown().map((choice, index) =>
                                            (<option value={choice} key={index}>{choice}</option>)
                                        )}
                                        {/* <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option> */}
                                    </select>

                                    <textarea name='comment' className={`comments section_${answer?.section}`} align="right" type="text" id={`S${answer?.section.toString()}Q${answer?.question_id.toString()}_cmt`} rows={5} cols={30} placeholder="Comments 評語
                            (Required if scored 7 to 10  必填，若評分為7至10)"  disabled={!supervisor}></textarea>

                                    {answer?.sales_figure === "Y" && <table style={{ border: "solid" }}>
                                        <tr><td style={{ width: "max-content" }}></td><td>Employee</td><td>Store Avg.</td></tr>
                                        <tr><td style={{ width: "max-content" }}>Avg. Monthly Sales</td><td><input style={{ width: "80px" }} name='emp_mon_sales' /></td><td><input style={{ width: "80px" }} name='store_mon_sales' /></td></tr>
                                        <tr><td style={{ width: "max-content" }}>Avg. Sales/Transaction</td><td><input style={{ width: "80px" }} name='emp_avg_sales' /></td><td><input style={{ width: "80px" }} name='store_avg_sales' /></td></tr>

                                    </table>}

                                </form>
                                :
                                <form className='answer' width="40%" style={{ borderLeft: "dashed 1px", paddingLeft: "5px" }}>

                                    <input name="section" value={answer?.section} type="hidden" />
                                    <input name="question_id" value={answer?.question_id} type="hidden" />
                                    <input name="form_id" value={answer?.form_id} type="hidden" />
                                    <label style={{ display: "inline-block", marginRight: "10px" }}>Rating 評分</label>
                                    {/* {dropDown(answer?.section, answer?.question_id)} */}
                                    <select name="choice_id" className={`choice_id section_${answer?.section}`} id={`S${answer?.section.toString()}Q${answer?.question_id.toString()}_choice`} type="text" style={{ display: "inline-block" }}>
                                        {dropDown().map((choice, index) =>
                                            (<option id={choice} value={choice} key={index}>{choice}</option>)
                                        )}
                                        {/* <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option> */}
                                    </select>

                                    <textarea name='comment' className={`comments section_${answer?.section}`} align="right" type="text" id={`S${answer?.section.toString()}Q${answer?.question_id.toString()}_cmt`} rows={5} cols={30} placeholder="Comments 評語
                            (Required if scored 7 to 10  必填，若評分為7至10)" ></textarea>

                                    {answer?.sales_figure === "Y" && <table style={{ border: "solid" }}>
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
        </>
    )
}

export default DraftForm