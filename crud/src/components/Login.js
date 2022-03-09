import { Link } from 'react-router-dom';
import { useEffect } from 'react';


export default function Login({ isLogin, idInput, pwdInput, handleInput, login }) {
    const idChange = (e) => {
        // console.log(123)
        let text = e.target.value
        // console.log(123)
        handleInput("id", text)
        console.log(idInput)

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
    }, [idInput, pwdInput])
    console.log(idInput, pwdInput)

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault()
                login(idInput, pwdInput)
                console.log(e.target.id)
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
            <Link to="/register">create account</Link>

        </>
    )
}

