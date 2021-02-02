import { useContext, useRef } from "react"
import { FormBox, Input, Button } from "../utilities"
import { MyContext } from "../Components/Context"
import axios from "axios"
import "../App.css"

const LoginPage = () => {
    const url = "https://covid19-dashboard-backend-api.herokuapp.com/"
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
            if (response.data.status === 200) {
                alert(`You have successfully logged in.`)
                console.log("check window.localStorage to see if user-token appears inside chrome dev tools...")
            }
        } catch (err) {
            alert(`Invalid login, please try again.`)
            console.error(err);
        }
    }
    return (
        <FormBox>
            <h4 style={{textAlign: 'center'}}>Login Form</h4>
            <form onSubmit={loginHandler}>
                <label> Username:
            <Input type="text" ref={usernameInput} placeholder="Username login" />
                </label>
                <label> Password:
            <Input type="password" ref={passwordInput} placeholder="Password login" />
                </label>
                <Button type="submit">Submit!</Button>
            </form>
        </FormBox>
    )
}
export default LoginPage;