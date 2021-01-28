import React, { useContext, useRef } from "react"
import { MyContext } from "../Components/Context"
import "../RoutePagesStyles/LoginRegister.css"
import axios from "axios" 

const LoginPage = () => {
    const url = "http://localhost:3000"
    const { userData, tokenData } = useContext(MyContext)
    const [userLoggedIn, setUserLoggedIn] = userData
    const [token, setToken] = tokenData

    const usernameInput = useRef(null);
    const passwordInput = useRef(null);

    const loginHandler = async (evt) => {
        evt.preventDefault();
        const username = usernameInput.current.value
        const password = passwordInput.current.value
        evt.currentTarget.reset();
        try {
            const response = await axios.post(`${url}/users/login`, {

                username: username,
                password: password
            })
            console.log(response.data)
            // This sets the "token" and "loggedInUser" inside localStorage and sets the state variables as well.
            localStorage.setItem('userLoggedIn', response.data.user.username) 
            localStorage.setItem('token', `Bearer ${response.data.token}`)
            setUserLoggedIn(response.data.user.username)
            setToken(`Bearer ${response.data.token}`)
        } catch (err) {
            console.error(err);
        } finally {
            alert(`You have successfully logged in.`)
            console.log("check window.localStorage to see if user-token appears inside chrome dev tools...")
        }
    }
    return (
        <>
            <div className="form-styles">
                <h2>Login Existing Visitor Form</h2>
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