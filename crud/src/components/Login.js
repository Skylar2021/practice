import { Link } from 'react-router-dom';
import { useEffect } from 'react';


export default function Login({ isLogin, uidInput, pwdInput, handleInput, login }) {
    const uidChange = (e) => {
        // console.log(123)
        let text = e.target.value
        // console.log(123)
        handleInput("uid", text)
        console.log(uidInput)

    }

    const pwdChange = e => {
        let text = e.target.value
        handleInput("pwd", text)
    }
    useEffect(() => {
        return () => {
            if (document.querySelector(".warning"))
                document.querySelector(".warning").innerHTML = ""
        }
    }, [uidInput, pwdInput])
    console.log(uidInput, pwdInput)

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault()
                login(uidInput, pwdInput)
                console.log(e.target.uid)
            }}
                method="POST"
                action="http://localhost:8080/login">
                <label htmlFor="uid"><p>User ID</p></label>
                <input id="uid" type="text" name="uid" value={uidInput} onChange={(e) => uidChange(e)} required></input>
                <label htmlFor="password"><p>Password</p></label>
                <input id="password" type="password" name="password" value={pwdInput} onChange={(e) => pwdChange(e)} required></input>
                <div>
                    <p className="warning" id="warning"></p>
                </div>
                <button id="login_btn" type="submit">log in</button>
            </form>
            <Link to="/register">create account</Link>

        </>
    )
}

