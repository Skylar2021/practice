import cookies from 'react-cookies';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";

import { getQuestions, toggleSupervisor } from '../../app/slice.js'
import { useEffect } from 'react';


function BlankForm() {
    const dispatch = useDispatch()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const { questionsBank, supervisor } = useSelector(state => state.staff)

    let selection = () => {
        let selection = []
        for (let i = 1; i < 11; i++) {
            selection.push(i)
            // selection.push(`<option value="${i}">${i}</option>`)
        }
        console.log(selection)
        return selection
    }
    // choices()
    let dropDown = (s, q) => {
        let choices = []
        for (let i = 1; i < 11; i++) {
            choices.push(i)
            // selection.push(`<option value="${i}">${i}</option>`)
        }

        return (
            <select name="choice" id={`S${s}Q${q}_choice`} type="text" {...register("choice_id", { required: true })} style={{ display: "inline-block" }}>
                {choices.map((choice, index) =>
                    (<option value={choice} key={index}>{choice}</option>)
                )}
                {/* <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option> */}
            </select>
        )
    }
    // console.log(dropDown())


    const onSubmit = (data) => {

        console.log(data)

    };
    // console.log(errors);
    // console.log(watch());
    const getQuestionContent = async () => {

        let response = await fetch("http://localhost:8080/review/questions", {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "form_id": `${cookies.load("userData").form_id}` })
        })
        if (response.ok) {
            let result = await response.json()
            dispatch(getQuestions(result))
            // console.log(result)
            // console.log("result")
        }
    }
    useEffect(() => {
        getQuestionContent()

        // console.log("useeffect")
        console.log(questionsBank[0])
    }, [])

    const testing = () => {
        let allForm = Array.from(document.querySelectorAll(".answer"))

        // nodeValues.forEach(value=>console.log(value))
        // console.log(nodeValues)
        // .forEach((value)=>console.log())
        console.log(allForm[0])
        console.log({ section: allForm[0]?.section?.value })
        console.log(allForm[0]?.question_id?.value)
        console.log(allForm[0]?.form_id?.value)
        console.log(allForm[0]?.choice_id?.value)
        console.log(allForm[0]?.comment?.value)
    }



    return (
        <>
            <div width="100%">
            {questionsBank.filter(question => question.section != 20).map((question, index) => (
                <form style={{ border: "solid" }}>
                    {question?.show_header === "Y" &&
                    <div style={{ display: "flex", justifyCotent: "space-between", alignItems: "left", borderBottom: "solid" }}>
                        { question?.is_optional === "Y" && <input type="checkbox" onClick={({ target }) => console.log(target.checked)} name="supervisor" style={{ display: "inline-block", width: "max-content" }} />}
                        {/* { question?.section?.toString() === "3" && <input type="checkbox" onClick={({ target }) => console.log(target.checked)} name="supervisor" style={{ display: "inline-block", position:"relative", left:"-10px" }} />} */}
                         <b>{question?.section_header}</b>

                    </div>}
                    <div style={{ display: "flex", justifyCotent: "space-between", alignItems: "center" }}>

                        <div style={{ textAlign: "left" }}>

                            <label>{question?.question_text}</label>
                            <br />
                            <label>{question?.question_subtext}</label>
                        </div>
                        <div className='answer' width="40%" style={{ borderLeft: "dashed 1px", paddingLeft: "5px" }}>

                            <input name="section" value={question?.section} type="hidden" />
                            <input name="question_id" value={question?.question_id} type="hidden" />
                            <input name="form_id" value={question?.form_id} type="hidden" />
                            <label style={{ display: "inline-block", marginRight: "10px" }}>Rating 評分</label>{dropDown(question?.section, question?.question_id)}

                            <textarea id={`S${question?.section.toString()}Q${question?.question_id.toString()}_cmt`} name='comment' className='comments' rows={5} cols={30} placeholder="Comments 評語
                            (Required if scored 7 to 10  必填，若評分為7至10)"></textarea>
                            
                                <table hidden={question?.sales_figure === "Y" ? false: true} style={{ border: "solid" }}>
                                    <tr><td style={{ width:"max-content" }}></td><td>Employee</td><td>Store Avg.</td></tr>
                                    <tr><td style={{ width:"max-content" }}>Avg. Monthly Sales</td><td><input style={{ width:"80px" }} name='emp_mon_sales'/></td><td><input  style={{ width:"80px" }} name='store_mon_sales'/></td></tr>
                                    <tr><td style={{ width:"max-content" }}>Avg. Sales/Transaction</td><td><input  style={{ width:"80px" }} name='emp_avg_sales'/></td><td><input  style={{ width:"80px" }} name='store_avg_sales'/></td></tr>
                                    
                                </table>
                            
                        </div>
                    </div>

                </form>
            ))}
            </div>
            <div width="100%">
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
                    {/* <input name="form_id" value={questionsBank[0]?.form_id}/> */}
                    {dropDown(questionsBank[0]?.section, questionsBank[0]?.question_id)}
                    <textarea id={`S${questionsBank[0]?.section.toString()}Q${questionsBank[0]?.question_id.toString()}_cmt`} name='comment' className='comments' rows={5} cols={30} placeholder="Comments 評語
                        (Required if scored 7 to 10  必填，若評分為7至10)"></textarea>
                    {/* <input type="submit" /> */}
                </form>
            </div>
            <button onClick={() => testing()}>submit</button>

            <form className='form'>
                <table border="1">
                    {/* <thead>
                        <tr>
                            <th width="60%"></th>
                            <th width="10%">Rating 評分</th>
                            <th width="30%">Comments 評語<br />(Required if scored 7 to 10  必填，若評分為7至10)</th>
                        </tr>
                    </thead> */}
                    <tbody>

                        {/* {questionsBank[0]?.show_header === "Y" &&
                            <tr><td colSpan={3}><b>{questionsBank[0]?.section_header}</b></td></tr>}

                        <tr>
                            <td>{questionsBank[0]?.question_text}</td>
                            <td>{dropDown()}</td>
                            <td>
                                <textarea id='comments' name='comments' className='comments' rows={5} cols={30} placeholder="Comments 評語
                        (Required if scored 7 to 10  必填，若評分為7至10)"></textarea>
                            </td>
                        </tr> */}
                        {/* <input type="submit" /> */}

                        {questionsBank.filter(question => question.section != 20).map((question, index) => (
                            <>

                                {question?.show_header === "Y" &&
                                    <tr key={index}><td colSpan={3}>{question?.section === 10 && <input style={{ display: "inline-block", width: "max-content" }} type={'checkbox'} />}<b>{question?.section_header}</b></td></tr>}

                                <tr className='answer'>
                                    <td>{question?.question_text}<br />{question?.question_subtext}</td>
                                    {/* <td></td> */}
                                    <td><label style={{ display: "inline-block", marginRight: "10px" }}>Rating 評分</label>
                                        {dropDown()}
                                        <textarea id='comments' name='comments' className='comments' rows={5} cols={30}></textarea>
                                    </td>
                                </tr>
                            </>
                        ))
                        }



                    </tbody>
                </table>
                <br />
                <table border="1" >
                    <tbody>

                        {questionsBank.filter(question => question.section == 20).map((question, index) => (
                            <>

                                {question?.show_header === "Y" &&
                                    <tr key={index}><td colSpan={3}>{question?.section === 10 && <input style={{ display: "inline-block", width: "max-content" }} type={'checkbox'} />}<b>{question?.section_header}</b></td></tr>}

                                <tr className='answer'>
                                    <td>{question?.question_text}<br />{question?.question_subtext}
                                        <textarea id='comments' name='comments' className='comments' rows={5} cols={30} placeholder="Comment"></textarea>
                                    </td>
                                    {/* <td></td> */}
                                    <td>
                                        {/* <label style={{ display: "inline-block", marginRight: "10px" }}>Rating 評分</label> */}
                                        {/* {dropDown()} */}
                                    </td>
                                </tr>
                            </>
                        ))
                        }
                    </tbody>
                </table>
                {/* <form onSubmit={handleSubmit(onSubmit)}>
                {questionsBank[0]?.show_header === "Y" &&
                            <label>{questionsBank[0]?.section_header}</label>}
                <label>{questionsBank[0]?.question_text}</label>
                <label>{questionsBank[0]?.question_subtext}</label>
                <select name="choice" {...register("Rating", { required: true })}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                <textarea {...register("Comment", {})} placeholder="Comments 評語
                        (Required if scored 7 to 10  必填，若評分為7至10)"/>
                <input type="checkbox" placeholder="supervisor" {...register("supervisor", { maxLength: 12 })} />

                <input type="submit" />
            </form> */}

            </form>
            <footer style={{ display: "flex", justifyCotent: "space-between", position: "fixed", bottom: "0px" }}>
                <button>Save</button>
                <button>Submit</button>
                <button>Back to Top</button>
            </footer>
        </>

    )
}

export default BlankForm