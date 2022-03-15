import cookies from 'react-cookies';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";

import { getQuestions } from '../../app/slice.js'
import { useEffect } from 'react';


function BlankForm() {
    const dispatch = useDispatch()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const questions = useSelector(state => state.staff.questionsBank)

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
            <select name="choice" id={`S${s}Q${q}_choice`} type="text" {...register("choice_d", { required: true })}>
                {choices.map((choice, index) =>
                    (<option value={choice} key={index}>{choice}</option>)
                )}
                {/* <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option> */}
            </select>
        )
    }
    // console.log(dropDown())
    const disableInput = () => {

    }
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
        }
    }
    useEffect(() => {
        getQuestionContent()

        console.log(questions[0])
    }, [])

    return (
        <>
            <div width="100%">
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", justifyCotent: "space-between", alignItems: "center" }}>
                    <div>
                        <label>
                            <input type={"checkbox"} name="supervisor"/>{questions[0]?.show_header === "Y" && <b>{questions[0]?.section_header}</b>}
                            <p>
                            </p>
                        </label>
                        <label>{questions[0]?.question_text}</label>
                        <label>{questions[0]?.question_subtext}</label>
                    </div>
                    <input name="section" {...register("section", {value: questions[0]?.section})} value={questions[0]?.section} type="hidden"/>
                    <input name="question_id" {...register("question_id", {value: questions[0]?.question_id})} value={questions[0]?.question_id} type="hidden"/>
                    <input name="form_id" {...register("form_id", {value: questions[0]?.form_id})} value={questions[0]?.form_id} type="hidden"/>
                    {/* <input name="form_id" value={questions[0]?.form_id}/> */}
                    {dropDown(questions[0]?.section, questions[0]?.question_id)}
                    <textarea {...register("comment")} id={`S${questions[0]?.section.toString()}Q${questions[0]?.question_id.toString()}_cmt`} name='comment' className='comments' rows={5} cols={30}></textarea>
                    <input type="submit" />
                </form>
            </div>

            <form >
                <table border="1">
                    <thead>
                        <tr>
                            <th width="60%"></th>
                            <th width="10%">Rating 評分</th>
                            <th width="30%">Comments 評語<br />(Required if scored 7 to 10  必填，若評分為7至10)</th>
                        </tr>
                    </thead>
                    <tbody>

                        {questions[0]?.show_header === "Y" &&
                            <tr><td colSpan={3}><b>{questions[0]?.section_header}</b></td></tr>}

                        <tr>
                            <td>{questions[0]?.question_text}</td>
                            <td>{dropDown()}</td>
                            <td>
                                <textarea id='comments' name='comments' className='comments' rows={5} cols={30} placeholder="Comments 評語
                        (Required if scored 7 to 10  必填，若評分為7至10)"></textarea>
                            </td>
                        </tr>
                        {/* <input type="submit" /> */}

                        {questions.map((question, index) => (
                            <>
                                {question?.show_header === "Y" &&
                                    <tr key={index}><td colSpan={3}>{question?.section === 10 && <input type={'checkbox'} />}<b>{question?.section_header}</b></td></tr>}

                                <tr>
                                    <td>{question?.question_text}<br />{question?.question_subtext}</td>
                                    <td>{dropDown()}</td>
                                    <td>
                                        <textarea id='comments' name='comments' className='comments' rows={5} cols={30}></textarea>
                                    </td>
                                </tr>
                            </>
                        ))
                        }


                    </tbody>
                </table>
                {/* <form onSubmit={handleSubmit(onSubmit)}>
                {questions[0]?.show_header === "Y" &&
                            <label>{questions[0]?.section_header}</label>}
                <label>{questions[0]?.question_text}</label>
                <label>{questions[0]?.question_subtext}</label>
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
        </>

    )
}

export default BlankForm