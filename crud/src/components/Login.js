import { Link,useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import cookies from 'react-cookies';

import { login,selfReview,tdReview } from '../app/slice.js'
// import { decrement, increment } from '../app/slice.js'


export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [pwdInput, setPwdInput] = useState('')
    const [idInput, setIdInput] = useState('')
    const {isLogin} = useSelector(state=>state.staff)

    // const topDownReviewData = async () => {
    //     // console.log('selfReviewData fired')
    //     let res = await fetch("http://localhost:8080/review/get_td_review_summary", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ "id": `${cookies.load('userData')?.staff_id}` }),
    //         credentials: 'include'
    //     })
    //     if (res.ok) {
    //         let result = await res.json()
    //         console.log(result)
    //         dispatch(tdReview(result))
    //         cookies.save('top_down_review', result, {path: '/'})
    //     }
    // }
    // const selfReviewData = async () => {
    //     // console.log('selfReviewData fired')
    //     let res = await fetch("http://localhost:8080/review/get_self_review_summary", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ "id": `${cookies.load('userData')?.staff_id}` }),
    //         credentials: 'include'
    //     })
    //     if (res.ok) {
    //         let result = await res.json()
    //         console.log(result)
    //         dispatch(selfReview(result))

    //         cookies.save('self_review', result, {path: '/'})
        
            
    //     }
    // }

    // const getSummary = () =>{
    //     selfReviewData()
    //     topDownReviewData()

    // }
    const handleLogin = async (id, password) => {
        
        try {
            let res = await fetch("http://localhost:8080/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "id": `${id}`, "password": `${password}` }),
                    credentials: 'include'
                })
            if (res.ok) {
                let result = await res.json()
                console.log(result)
                setPwdInput("")
                setIdInput("")
                cookies.save("userData", result.userData)
                dispatch(login())
                // getSummary()
                // setCurrentUser(cookies.load('user'))
                navigate('/summary')
                // navigate('/setting')

            } else {
                let result = await res.json()
                console.log(result)
                document.querySelector(".warning").innerHTML = `${result.message}`

            }

        } catch (err) {
            console.log(err)
        }
    }
    const idChange = (e) => {
        // console.log(123)
        let text = e.target.value
        console.log(text)
        setIdInput(text)

    }

    const pwdChange = e => {
        let text = e.target.value
        console.log(text)
        setPwdInput(text)
    }
    useEffect(() => {
        return () => {
            if (document.querySelector(".warning"))
                document.querySelector(".warning").innerHTML = ""
        }
    }, [idInput, pwdInput])
    // console.log(idInput, pwdInput)

    return (
        <>
                    
            <form onSubmit={(e) => {
                e.preventDefault()
                handleLogin(idInput, pwdInput)
                console.log("login button clicked")
            }}
                method="POST"
                action="http://localhost:8080/login">
                <label htmlFor="id"><p>User ID</p></label>
                <input id="id" type="text" name="id" value={idInput} onChange={(e) => idChange(e)} required></input>
                <label htmlFor="password"><p>Password</p></label>
                <input id="password" type="password" name="password" value={pwdInput} onChange={(e) => pwdChange(e)} required></input>
                <div>
                    <p className="warning" id="warning"></p>
                </div>
                <button id="login_btn" type="submit">log in</button>
            </form>
            

            {/* <h2>Login Status: {isLogin}</h2>
            <button id='login' type="button" onClick={() => dispatch(login())}>login</button>
            <button id='logout' type="button" onClick={() => dispatch(logout())}>logout</button> */}

            <Link to="/register">create account</Link>

        </>
    )
}

