import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cookies from 'react-cookies';


import { getAnswers, getScore } from '../../app/slice.js'


function SubmittedForm({ assign_type }) {
    const dispatch = useDispatch()
    const { answers, score ,self_review, top_down_review } = useSelector(state => state.staff)
    


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
            let result = await response.json()
            console.log(result)
            // setQna(result)
            dispatch(getAnswers(result))
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
            // console.log(score)
            dispatch(getScore(score))
            // console.log(result)
        }

    }
    const questionAvg = sectionId => {
        let sectionAns = answers.filter(ans=> ans.section == sectionId)
        // .forEach(ans=>console.log(ans.section.value))
        
        // console.log(allAns)
        let sectionScoreArr = sectionAns.map(ans=>parseInt(ans.choice_id))
        // console.log(sectionScoreArr)
        let ttl = sectionScoreArr.reduce((n1,n2)=>n1+n2,0)
        let avg = ttl / sectionScoreArr.length
        return avg.toFixed(1)

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
                <table border="1">
                    <tbody>
                        <tr>
                            <td></td>
                            <td>Rating</td>
                            <td>Comments 評語<br />(Required if scored 7 to 10  必填，若評分為7至10)</td>
                        </tr>
                        {answers.filter(answer => answer.section !== 20).map((answer, index) => (
                            <>
                                {answer?.show_header === "Y" &&
                                    <tr >
                                        <td colSpan={3}><b>{answer?.section_header}</b></td>

                                    </tr>}
                                    { cookies.load("userData")?.form_type_id === "F" && answer?.section !== 10 && answer?.display_order === 1 && <tr><td></td><td colSpan={2}>Average: {questionAvg(answer?.section)}</td></tr>}
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
                <table border="1">
                    <tbody className='answer'>
                        {answers.filter(answer => answer.section == 20).map((answer, index) => (
                            <>
                                <tr>
                                    <td>

                                        {answer?.show_header === "Y" &&
                                            <label key={index}> <b>{answer?.section_header}</b></label>}
                                        <label name="t_id" value={answer?.t_id} type="hidden" />

                                        <label name="section" value={answer?.section} type="hidden" />
                                        <label name="question_id" value={answer?.question_id} type="hidden" />
                                        <label name="form_id" value={answer?.form_id} type="hidden" />

                                        <b>{answer?.question_text}<br />{answer?.question_subtext}</b>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='comments' id={`S${answer?.section.toString()}Q${answer?.question_id.toString()}_cmt`}>
                                        {answer?.comments}

                                        <input name="choice_id" className={`choice section_${answer?.section}`} id={`S${answer?.section.toString()}Q${answer?.question_id.toString()}_choice`} type="hidden" style={{ display: "inline-block" }} disabled />
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>


                </table>



               

            </div>
            <footer >
                <button onClick={() => window.print()}>Print</button>
                <button><a href='#top'>Back to Top</a></button>
                <button>Average: <span className='avg'>{assign_type === "S" ? score?.score_avg_S : score?.score_avg_T}</span> Total: <span className='ttl'>{assign_type === "S" ? score?.score_ttl_S : score?.score_ttl_T}</span></button>
            </footer>
        </>
    )
}

export default SubmittedForm