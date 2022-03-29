import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cookies from 'react-cookies';


import { getAnswers, getScore } from '../../app/slice.js'


function SubmittedForm({ assign_type }) {
    const dispatch = useDispatch()
    const { answers, score } = useSelector(state => state.staff)
    const scoreArrIndex = () => {
        return assign_type === "S" ? 0 : 1
    }
    // console.log(scoreArrIndex())
    // console.log(score?.score_avg[scoreArrIndex()])


    const getQNA = async () => {
        let obj = {
            staff_id: cookies.load("userData")?.staff_id,
            year: cookies.load("userData")?.year,
            t_id: cookies.load("self_review")?.t_id,
            form_id: cookies.load("userData")?.form_id
        }
        // console.log(obj)
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
    const getScoreSet = async () => {
        // console.log("get score")

        let response = await fetch("http://localhost:8080/review/score_get", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ staff_id: cookies.load("userData")?.staff_id })
        })
        if (response.ok) {
            let score = await response.json()
            console.log(score)
            dispatch(getScore(score))
            // console.log(result)
        }

    }
    useEffect(() => {
        getQNA();
        getScoreSet();
        // calTtl();
        // calAvg();

    }, [])
    return (
        <>
            <h1>Performance Appraisal Form 表現評估表</h1>
            {/* {console.log(score)} */}
            <div width="100%" id="form-container" className='submitted-form'>
                <table>
                    <tbody>
                        {answers.filter(answer => answer.section !== 20).map((answer, index) => (
                            <>
                                <tr>
                                    <td></td>
                                    <td>Rating</td>
                                    <td>Comments 評語<br />(Required if scored 7 to 10  必填，若評分為7至10)</td>
                                </tr>
                                {answer?.show_header === "Y" &&
                                    <tr style={{ display: "flex", justifyCotent: "space-between", alignItems: "left", borderBottom: "solid" }}>
                                        <td></td><b>{answer?.section_header}</b>
                                    </tr>}
                                <tr>
                                    <td>
                                        <label>{answer?.question_text}</label>
                                        <br />
                                        <label>{answer?.question_subtext}</label>
                                    </td>
                                    <td>
                                        <label name="t_id" value={answer?.t_id} type="hidden" />
                                        <label name="section" value={answer?.section} type="hidden" />
                                        <label name="question_id" value={answer?.question_id} type="hidden" />
                                        <label name="form_id" value={answer?.form_id} type="hidden" />
                                        {answer?.choice_id}
                                    </td>
                                    <td>{answer?.comments}</td>
                                </tr>
                            </>
                        ))}



                    </tbody>
                </table>



                {answers.filter(answer => answer.section !== 20).map((answer, index) => (
                    <table style={{ borderTop: "solid" }}>
                        <tbody>
                            {answer?.show_header === "Y" &&
                                <tr style={{ display: "flex", justifyCotent: "space-between", alignItems: "left", borderBottom: "solid" }}>
                                    <td></td><b>{answer?.section_header}</b>
                                </tr>}

                            <div className='qna-container' style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ textAlign: "left" }}>
                                    <label>{answer?.question_text}</label>
                                    <br />
                                    <label>{answer?.question_subtext}</label>
                                </div>
                                {<form className='answer' width="40%" style={{ borderLeft: "dashed 1px", paddingLeft: "5px" }}>
                                    <label name="t_id" value={answer?.t_id} type="hidden" />

                                    <label name="section" value={answer?.section} type="hidden" />
                                    <label name="question_id" value={answer?.question_id} type="hidden" />
                                    <label name="form_id" value={answer?.form_id} type="hidden" />
                                    <label style={{ display: "inline-block", marginRight: "10px" }}>Rating 評分</label>
                                    {/* {dropDown(answer?.section, answer?.question_id)} */}
                                    <select
                                        name="choice_id"
                                        className={`choice_id section_${answer?.section}`}
                                        id={`S${answer?.section.toString()}Q${answer?.question_id.toString()}_choice`}
                                        type="text"
                                        style={{ display: "inline-block" }}
                                        defaultValue={answer?.choice_id}>
                                        <td>{answer?.choice_id}</td>
                                        {/* <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option> */}
                                    </select>

                                    <textarea
                                        key={index}
                                        name='comment'
                                        className={`comments section_${answer?.section}`}
                                        align="right" type="text"
                                        id={`S${answer?.section.toString()}Q${answer?.question_id.toString()}_cmt`}
                                        rows={5}
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
                                        <tr><td style={{ width: "max-content" }}>Avg. Monthly Sales</td><td><label style={{ width: "80px" }} name='emp_mon_sales' defaultValue={answer?.emp_mon_sales} /></td><td><label style={{ width: "80px" }} name='store_mon_sales' defaultValue={answer?.store_mon_sales} /></td></tr>
                                        <tr><td style={{ width: "max-content" }}>Avg. Sales/Transaction</td><td><label style={{ width: "80px" }} name='emp_avg_sales' defaultValue={answer?.emp_avg_sales} /></td><td><label style={{ width: "80px" }} name='store_avg_sales' defaultValue={answer?.store_avg_sales} /></td></tr>

                                    </table>}

                                </form>
                                }
                            </div>
                        </tbody>
                    </table>
                ))}

            </div>
            <footer style={{ display: "flex", justifyCotent: "space-evenly", position: "fixed", bottom: "0px" }}>
                <button onClick={() => window.print()}>Print</button>
                <button><a href='#form-container'>Back to Top</a></button>
                <button>Average: <span className='avg'>{assign_type === "S" ? score?.score_avg_S : score?.score_avg_T}</span> Total: <span className='ttl'>{assign_type === "S" ? score?.score_ttl_S : score?.score_ttl_T}</span></button>
            </footer>
        </>
    )
}

export default SubmittedForm