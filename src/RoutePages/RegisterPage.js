import React, { useRef } from "react";
import "../RoutePagesStyles/LoginRegister.css"
import axios from "axios"

const RegisterPage = (props) => {
    const url = "http://localhost:3000"

    const regNameInput = useRef(null);
    const regPasswordInput = useRef(null);

    const registerHandler = async (evt) => {
        evt.preventDefault();
        const username = regNameInput.current.value
        const password = regPasswordInput.current.value
        evt.currentTarget.reset();
        try {
            const response = await axios.post(`${url}/users/`, {
                username: username,
                password: password
            })
            console.log(response.data)
            if (response.data.status === 200) {
                // This redirects the user to the "LoginPage" after a new visitor has succesffuly created a username.
                alert("Successfully created new username, please login.")
                window.location.href = `/loginpage`;
            }
        } catch (err) {
            console.error(err);
    }
    return (
        <>
            <div className="form-styles">
                <h2>Register New Visitor Form</h2>
                <form onSubmit={registerHandler}>
                    <label> New Username:
            <input type="text" ref={regNameInput} placeholder="New username login" />
                    </label>
                    <label> New Password:
            <input type="password" ref={regPasswordInput} placeholder="New password login" />
                    </label>
                    <button type="submit">Submit!</button>
                </form>
            </div>
        </>
    )
}

export default RegisterPage; 