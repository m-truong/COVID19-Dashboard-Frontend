import { useRef } from "react"
import { FormBox, Input, Button } from "../utilities"
import axios from "axios"
import "../App.css"

const RegisterPage = (props) => {
    const url = "https://covid19-dashboard-backend-api.herokuapp.com/"

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
            // ** Note: there's an edge-case where same username and password can sign up
            console.log(response.data)
            if (response.data) {
                // This redirects the user to the "LoginPage" after a new visitor has succesffuly created a username.
                alert("Successfully created new username, please login.")
                window.location.href = `/loginpage`;
            }
        } catch (err) {
            alert("Could not create new user, please try again.")
            console.error(err);
        }
    }
    return (
        <FormBox>
            <h4 style={{textAlign: 'center'}}>New Visitor Registration</h4>
            <form onSubmit={registerHandler}>
                <label> New Username:
            <Input type="text" ref={regNameInput} placeholder="New username login" />
                </label>
                <label> New Password:
            <Input type="password" ref={regPasswordInput} placeholder="New password login" />
                </label>
                <Button type="submit">Submit!</Button>
            </form>
        </FormBox>
    )
}

export default RegisterPage; 