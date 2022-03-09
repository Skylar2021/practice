import { useEffect } from 'react';

export default function Reg({ idInput, pwdInput, userNameInput, handleInput, register }) {
    const idChange = (e) => {
        let text = e.target.value
        handleInput("id", text)
        console.log(idInput)

    }

    const pwdChange = e => {
        let text = e.target.value
        handleInput("pwd", text)
    }
    const usernameChange = e => {
        let text = e.target.value
        handleInput("username", text)
    }

    useEffect(() => {
        return () => {
            if (document.querySelector(".warning")) {

                document.querySelector(".warning").innerHTML = ""
            }
        }
    }, [idInput, pwdInput, userNameInput])

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault()
                let user = {
                    id: e.target.id.value,
                    password: e.target.password.value,
                    username: e.target.username.value
                }
                console.log(user)
                register(user)
                console.log(e.target.id)
            }}
                method="POST"
                action="http://localhost:8080/register">
                <label htmlFor="id"><p>User ID</p></label>
                <input id="id" type="text" name="id" value={idInput} onChange={(e) => idChange(e)} required></input>
                <label htmlFor="username"><p>User Name</p></label>
                <input id="username" type="text" name="username" value={userNameInput} onChange={(e) => usernameChange(e)} required></input>

                <label htmlFor="password"><p>Password</p></label>
                <input id="password" type="password" name="password" value={pwdInput} onChange={(e) => pwdChange(e)} required></input>
                <div>
                    <p className="warning" id="warning" style={{ color: "#ff0000" }}></p>
                </div>
                <button id="reg_btn" type="submit">Register</button>
            </form>
        </>
    )
}