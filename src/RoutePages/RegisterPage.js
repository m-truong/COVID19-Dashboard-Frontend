import React, { useRef } from "react";
import axios from "axios"

const RegisterPage = (props) => {
    const url = "https://localhost:3000"

    const regNameInput = useRef(null);
    const regPasswordInput = useRef(null);
    const registerHandler = async (evt) => {
        evt.preventDefault();
        const body = JSON.stringify({
            username: regNameInput.current.value,
            password: regPasswordInput.current.value
        })
        evt.currentTarget.reset();
        try {
            const response = await fetch(`${url}/api/customers/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body
            })
            const data = await response.json();
        } catch (err) {
            console.error(err);
        } finally {
            // console.log("check MongoDB Atlas if new Customer username was created...");
            // This redirects the user to the "LoginPage" after a new customer has succesffuly created an account.
            alert("Successfully created new username, please login.")
            // window.location.href = `${url}/login`;
        }
    }
    return (
        <>
            <div className="x-form-container">
                <h2>Register New Customer Form</h2>
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