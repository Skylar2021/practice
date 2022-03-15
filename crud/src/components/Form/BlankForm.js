import cookies from 'react-cookies';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";

import { getQuestions } from '../../app/slice.js'
import { useEffect } from 'react';


function BlankForm() {
    const dispatch = useDispatch()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const questions = useSelector(state => state.staff.questionsBank)

    let choices = () => {
        let selection = []
        for (let i = 1; i < 11; i++) {
            selection.push(`<option value="${i}">${i}</option>`)
        }
        console.log(selection)
        return selection
    }
    // choices()
    let dropDown = () => {

        return (
            <select name="choice" id="choice" type="text">
                <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option>
            </select>
        )
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
            // console.log(result)
        }
    }
    useEffect(() => {
        getQuestionContent()

        console.log(questions[0])
    }, [])

    return (

        <form>
            <table border="1">
                <thead>
                    <tr>
                        <th width="60%"></th>
                        <th width="10%">Rating 評分</th>
                        <th width="30%">Comments 評語<br />(Required if scored 7 to 10 / 必填，若評分為7至10)</th>
                    </tr>
                </thead>
                <tbody>

                    {questions[0]?.show_header === "Y" && <tr><td colSpan={3}><b>{questions[0]?.section_header}</b></td></tr>}

                    <tr>
                        <td>{questions[0]?.question_text}</td>
                        <td>{dropDown()}</td>
                        <td><input type="text" /></td>
                    </tr>

                </tbody>
            </table>
        </form>
    )
}

export default BlankForm