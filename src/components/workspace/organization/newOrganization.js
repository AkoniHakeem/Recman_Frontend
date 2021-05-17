import WorkSpaceContainer from "../workspaceContainer";
import {useInput} from "../../../assets/hooks/useInput";
import Button from "../../../assets/elements/button/button";
import Input from "../../../assets/elements/input/input";
import FormGroup from "../../../assets/elements/custom/formGroup/formGroup";
import useFetchFrom from "../../../assets/hooks/useFetchFrom";
import { useContext, useState } from "react";
import config from "../../../config";
import { AppContext } from "../../contexts/appContext";

const NewOrganization = (props) => {
    const [name, nameError, nameBind, nameActions] = useInput("name");
    const [requestBody, setRequestBody] = useState({name});
    const appContext = useContext(AppContext);
    const userContext = appContext.userContext
    const options = {
        "method": "POST",
        body: JSON.stringify(requestBody),
        "headers": {"Content-Type": "application/json", "authorization": `bearer ${userContext.user.token}`}
    }
    const [setRequestUrl] = useFetchFrom(options, (statusCode, responseBody)=> {
        if(statusCode === 200) {
            alert(responseBody.message)
            nameActions.setvalue("")
        }
        else {
            alert("process failed")
        }
        appContext.loadingContext.setLoading(false)
    })

    const onSubmit = (e) => {
        e.preventDefault();
        if(name) {
            setRequestBody((body) => {
                return {...body, name}
            })
            const requestUrl = config.backendUrl + config.backendApiPath + "/org/create";
            setRequestUrl(requestUrl);
            appContext.loadingContext.setLoading(true)
        }
    }

    return(
        <WorkSpaceContainer breadCrumbsList={["new-organization"]}>
            <div>
                <form onSubmit={onSubmit.bind(this)}>
                    <div className="form-area">
                        <FormGroup className="stacked">
                            <label title="name of organization">Name</label>
                            <Input {...nameBind} />
                        </FormGroup>
                        <div>
                            <Button type="submit">Submit</Button>
                        </div>
                    </div>
                    
                </form>
            </div>
        </WorkSpaceContainer>
    )
}

export default NewOrganization