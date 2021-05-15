import {useInput} from "../../assets/hooks/useInput"
import Button from "../../assets/elements/button/button"
import { Redirect, useLocation } from "react-router";
import { useEffect, useState } from "react";
import useAuth from "../../assets/hooks/useAuth";
import MainContent from "../../assets/elements/custom/maincontent/maincontent";
import Page from "../../assets/elements/custom/page/page";
import FormGroup from "../../assets/elements/custom/formGroup/formGroup";
import config from "../../config";

const Login = (props) => {
    const location = useLocation();
    const {from} = location.state || {pathname: "/"}
    const [email, , emailBind, ] = useInput("email");
    const [password, , passwordBind, ] = useInput("password", "password")
    const [isAuthenticated, , , setUser, ] = useAuth();
    const [authUrl, setAuthUrl] = useState(undefined)
    const serverAuthUrl = config.backendUrl + config.backendApiPath + "/auth/login"

    useEffect(() => {
        if(authUrl) {
            const requestBody = {email, password}
            const options = {
                "method": "POST",
                body: JSON.stringify(requestBody),
                "headers": {"Content-Type": "application/json"}
            }
            let response;
            fetch(authUrl,options).then( async(res) => {
                 response = await res.json()
                 const responseBody = JSON.parse(response)
                 setUser(responseBody["user"], responseBody["token"])
            })

        }
    }, [authUrl])

    const setServerAuthUrl = (e) => {
        e.preventDefault()
        setAuthUrl(serverAuthUrl)
    }

    if(isAuthenticated) {
        console.log(from)
        return <Redirect to={from}/>
    }

    return(
        <Page maincontent={
            <MainContent>
                 <div className="container-form">
                    <form >
                        <div className="form-area">
                            <FormGroup className="stacked">
                                <label>email</label>
                                <input name={email.toString()} {...emailBind} />
                            </FormGroup>
                            <FormGroup className="stacked">
                                <label>password</label>
                                <input name={password.toString()} {...passwordBind} />
                            </FormGroup>
                            <div className="submit">
                                <Button type="" onClick={setServerAuthUrl.bind(this)} >Submit</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </MainContent>
        }/>

    )
}

export default Login