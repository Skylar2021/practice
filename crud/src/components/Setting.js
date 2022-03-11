import { useEffect } from "react";
import cookies from 'react-cookies';

export default function Setting({ handleLogout, currentUser, delAC, pwdChange, handleInput, newPwdInput }) {
    const delAccount = async (id) => {
        console.log(id)
        let del = window.confirm("Confirm delete?")
        if (del && id) {
            delAC(id)

        }
    }
    console.log(currentUser)
    const handlePwdInput = ({ target }) => {
        handleInput("newPwd", target.value)

        // }
        console.log("target", target.value)
        console.log(newPwdInput)

    }
    // let password = document.querySelector('.change_password')
    const confirmNewPwd = (id, newPwd) => {
        let confirmChange = window.confirm("Confirm password change?")
        if (confirmChange && newPwd && id) {
            pwdChange(id, newPwd)
        }
    }


    // useEffect(()=>{
        
        // if(cookies.load('user')){
        //     setCurrentUser(cookies.load('user'))
        // }
    // },[])
    console.log("currentUser: ",currentUser)
    console.log("cookies's storage: ",cookies.load('userData'))
    return (
        <>
            <h2 className="user">{cookies.load('userData')?.name ? `User: ${cookies.load('userData')?.name}` : "no user login"}</h2>
            <button id="logout_btn" type="button" onClick={() => { handleLogout(currentUser) }}>log out</button>
            {/* <button id="del_btn" type="button" onClick={() => { delAccount(currentUser.id) }}>delete my account</button> */}
            <p>---------------------------------------------------------</p>
            <input
                placeholder="enter new password here"
                type="password"
                name="password"
                className="change_password"
                onChange={e => { handlePwdInput(e) }}
                value={newPwdInput} required />
            <button id="change_pwd_btn" type="button"
                onClick={() => {
                    console.log({ "id": currentUser.id, "pwd": newPwdInput })
                    confirmNewPwd(currentUser.id, newPwdInput)

                }}>change password</button>
        </>
    )
}