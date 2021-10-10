import Page from "../../assets/elements/custom/page/page";
import MainContent from "../../assets/elements/custom/maincontent/maincontent";
import FormGroup from "../../assets/elements/custom/formGroup/formGroup";
import Input from "../../assets/elements/input/input";
import Button from "../../assets/elements/button/button";
import { useInput } from "../../assets/hooks/useInput";
import useAuth from "../../assets/hooks/useAuth";
import { useState } from "react";
import useFormInputBind from "../../assets/hooks/useFormInputBind";
import useFetchFrom from "../../assets/hooks/useFetchFrom";
import config from "../../config"
import { Redirect } from "react-router";

const Signup = (props) => {

        /* handle auth */
        const [isAuthenticated, , , setUser] = useAuth();

        /* state variables */
        /* form state */
        const [firstname, , firstnameBind,] = useInput("firstname");
        const [lastname, , lastnameBind] = useInput("lastname");
        const [email, , emailBind] = useInput("email");
        const [password, , passwordBind] = useInput("password", "password");
        const [confirmPassword, , confirmPasswordBind] = useInput("password", "password");
        const [phone, , phoneBind] = useInput("phone");

            /* requst body state*/
    const [requestBody, setRequestBody] = useState({})

    const inputVals = [phoneBind, passwordBind, emailBind, lastnameBind, firstnameBind];
    const inputBind = useFormInputBind(inputVals);

    /* response callback */
    const responseCallback = (statusCode, responseBody) => {
        if(statusCode === 200 || statusCode === 201) {
            alert("process successful");
            setUser(responseBody["user"], responseBody["token"]);
        }
        else {
            alert("process failed")
        }
        setRequestUrl(null);
    }

    /* request options */
    const options = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
        },
        "body": JSON.stringify(requestBody)
    }

    
    const [setRequestUrl] = useFetchFrom(options, responseCallback, true)

    const onSubmit = (e) => {
        e.preventDefault();
        setRequestBody({...inputBind})
        const url = config.backendUrl + config.backendApiPath + "/auth/signup"
        setRequestUrl(url)
    }

    if(isAuthenticated) {
        return <Redirect to="/" />
    }

    return (
        <Page maincontent={
            <MainContent>
                <div className="container-form">
                <form onSubmit={onSubmit.bind(this)}>
                <div className="form-area">
                        <FormGroup className="stacked">
                            <label>first name</label>
                            <Input {...firstnameBind} />
                        </FormGroup>
                        <FormGroup className="stacked">
                            <label>last name</label>
                            <Input {...lastnameBind} />
                        </FormGroup>
                        <FormGroup className="stacked">
                            <label>email</label>
                            <Input {...emailBind} />
                        </FormGroup>
                        <FormGroup className="stacked">
                            <label>password</label>
                            <Input {...passwordBind} />
                        </FormGroup>
                        <FormGroup className="stacked">
                            <label>confirm password</label>
                            <Input {...confirmPasswordBind} />
                        </FormGroup>
                        <FormGroup className="stacked">
                            <label>phone</label>
                            <Input {...phoneBind} />
                        </FormGroup>
                        <div className="submit">
                            <Button type="submit"  >Submit</Button>
                        </div>
                    </div>
                </form>
            </div>
        </MainContent>
          } />
    )
}

export default Signup