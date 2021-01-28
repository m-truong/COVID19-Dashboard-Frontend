import React, { useContext, useRef } from "react";
import "../RoutePagesStyles/LoginRegister.css"

const LoginPage = () => {
    const url = "https://localhost:3000"
    // const { customerLoggedIn, tokenData } = useContext(MyContext)
    // const [currentCustomerLoggedIn, setCustomerLoggedIn] = customerLoggedIn
    // const [token, setToken] = tokenData
    const usernameInput = useRef(null);
    const passwordInput = useRef(null);
    const loginHandler = async (evt) => {
        evt.preventDefault();
        const body = JSON.stringify({
            username: usernameInput.current.value,
            password: passwordInput.current.value
        })
        evt.currentTarget.reset();
        try {
            const response = await fetch(`${url}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body
            })
            const data = await response.json()
            // This sets the "token" and "loggedInUser" inside localStorage and sets the state variables as well.
            window.localStorage.setItem('token', `Bearer ${data.token}`)
            window.localStorage.setItem('currentCustomerLoggedIn', data.user)
            setCustomerLoggedIn(data.user)
            setToken(`Bearer ${data.token}`)
        } catch (err) {
            console.error(err);
        } finally {
            // console.log("check window.localStorage to see if user-token appears inside chrome dev tools...")
        }
    }
    return (
        <>
            <div className="form-styles">
                <h2>Login Existing Customer Form</h2>
                <form onSubmit={loginHandler}>
                    <label> Username:
            <input type="text" ref={usernameInput} placeholder="Username login" />
                    </label>
                    <label> Password:
            <input type="password" ref={passwordInput} placeholder="Password login" />
                    </label>
                    <button type="submit">Submit!</button>
                </form>
            </div>
        </>
    )
}
export default LoginPage;