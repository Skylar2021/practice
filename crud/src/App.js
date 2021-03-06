import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import cookies from 'react-cookies';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';

// import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import NF from './components/404nf';
import Setting from './components/Setting';
import Reg from './components/Reg';
import NavLink from './components/NavLink';
import Summary from './components/Summary';
import SelfReview from './components/SelfReview';

function App() {
    const [pwdInput, setPwdInput] = useState('')
    const [idInput, setIdInput] = useState('')
    const [userNameInput, setUserNameInput] = useState('')
    const [newPwdInput, setNewPwdInput] = useState('')
    const [currentUser, setCurrentUser] = useState("")
    const [isLogin, setIsLogin] = useState(false)

    let navigate = useNavigate();

    useEffect(() => {
        if (cookies.load('userData')) {
            setCurrentUser(cookies.load('userData'))
        }
    }, [])

    const handleInput = (type, input) => {

        if (type === "id") {
            console.log(idInput)
            return setIdInput(input)
        } else if (type === "pwd") {
            console.log(pwdInput)
            return setPwdInput(input)
        } else if (type === "username") {
            console.log(userNameInput)
            return setUserNameInput(input)
        } else if (type === "newPwd") {
            console.log(newPwdInput)
            return setNewPwdInput(input)
        }

    }

    const register = async ({ id, password, username }) => {
        let warning = document.querySelector(".warning")
        if (id && password && username) {
            try {
                let res = await fetch("http://localhost:8080/register",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ "id": `${id}`, "password": `${password}`, "username": `${username}`, group: "G" })
                    })
                if (res.ok) {
                    let result = await res.json()
                    // navigate('/')
                    console.log(result)
                } else {
                    let result = await res.json()
                    if (warning) {
                        warning.innerHTML = `${result.message}`;
                    }
                    console.log(result)
                }

            } catch (err) {
                console.log(err)

            }
        }
    }

    const handleLogout = async (currentUser) => {
        try {
            let res = await fetch("http://localhost:8080/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: currentUser }),
                credentials: 'include'
            })
            if (res.ok) {
                let result = await res.json()
                console.log(result)
                setIsLogin(false)
                cookies.remove('userData')
                cookies.remove('top_down_review')
                cookies.remove('self_review')
                setCurrentUser('')
                navigate('/')

            }

        } catch (err) {
            console.log(err)

        }
    }
    // logout()

    const delAC = async (id) => {
        if (id) {
            try {
                let res = await fetch("http://localhost:8080/del-ac/" + id, {
                    method: 'DELETE',
                    header: { "Content-Type": "application/json" },
                    body: JSON.stringify({ "id": id })
                })
                if (res.ok) {
                    let result = await res.json()
                    console.log(result)
                    setIsLogin(false)
                    cookies.remove('userData')
                    setCurrentUser('')
                    setNewPwdInput('')
                    navigate('/')

                }

            } catch (err) {
                console.log(err)

            }
        }
    }


    const pwdChange = async (id, password) => {
        if (!id && !password) {
            return
        }
        let data = { id, password }
        console.log(data)

        try {
            let res = await fetch(`http://localhost:8080/pwdchange/${id}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            if (res.ok) {
                let result = await res.json()
                console.log(result)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="App">

            <NavLink isLogin={isLogin} />
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                <Routes>
                    <Route path="/setting" element={
                        <Setting handleLogout={handleLogout}
                            delAC={delAC}
                            pwdChange={pwdChange}
                            handleInput={handleInput}
                            currentUser={currentUser}
                            newPwdInput={newPwdInput} />} >
                    </Route>
                    <Route path="/register"
                        element={
                            <Reg handleInput={handleInput}
                                register={register}
                                pwdInput={pwdInput}
                                idInput={idInput} />}>
                    </Route>

                    <Route path="/summary" element={<Summary />} />

                    <Route path='/self_review' element={<SelfReview assign_type="S"/>}/>
                    <Route path="/" exact index element={<Login />} />
                    <Route path="*" element={<NF />} />
                </Routes>
            </header>
        </div>
    );
}

export default App;
