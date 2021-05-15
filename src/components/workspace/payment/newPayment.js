import { useContext, useState } from "react"
import Button from "../../../assets/elements/button/button"
import FormGroup from "../../../assets/elements/custom/formGroup/formGroup"
import Input from "../../../assets/elements/input/input"
import Select from "../../../assets/elements/select/select"
import useFetchFrom from "../../../assets/hooks/useFetchFrom"
import { useInput } from "../../../assets/hooks/useInput"
import WorkSpaceContainer from "../workspaceContainer"
import config from "../../../config"
import { AppContext } from "../../contexts/appContext"
import { useParams } from "react-router"

const NewPaymentRecord = (props) => {
    const userContext = useContext(AppContext).userContext;
    const {organizationId} = useParams()
    const [recordName, , recordNameBind, ] = useInput("recordName", "text", "please, enter the payment record name to create")
    const [target, , targetBind, ] = useInput("target", "number", "write the payment amount to track with this record")
    const [cycle, , cycleBind, ] = useInput("cycle", "text", "please, enter the frequency");
    const inputBinds = [recordNameBind, targetBind, cycleBind]

    const [requestBody, setRequestBody] = useState({})

    const options = {
        "method": "POST",
        body: JSON.stringify(requestBody),
        "headers": {"Content-Type": "application/json", "authorization": `bearer ${userContext.user.token}`}
    }
    const handleRequestResult = (statusCode, responseBody) => {
        if(statusCode === 200) {
            // todo: do stuff
            alert("process successful")
            inputBinds.forEach(bind => bind.setvalue(""))
            setRequestUrl(undefined);
        }
        else {
            alert("process failed, please, try again")
            setRequestUrl(undefined);
        }
    }
    const [setRequestUrl, setRetry] = useFetchFrom(options,handleRequestResult, true);

    const onSubmit = (e) => {
        e.preventDefault();
        if(recordName) {
            const requstUrl = config.backendUrl + config.backendApiPath + "/org/create-payment"
            setRequestBody(body => {
                return {
                    ...body, recordName, target, cycle, organizationId
                }
            })
            setRequestUrl(requstUrl);
        }
        else {
            alert("please, record name is required");
        }

    }
    return(
        <WorkSpaceContainer breadCrumbsList={["/new-payment-record"]}>
            <form onSubmit={onSubmit.bind(this)}>
                <div className="form-area">
                    <FormGroup className="stacked">
                        <label>payment record name</label>
                        <Input {...recordNameBind}/>
                    </FormGroup>
                    <FormGroup className="stacked">
                        <label>target</label>
                        <Input {...targetBind}/>
                    </FormGroup>
                    <FormGroup className="stacked">
                        <label>cycle</label>
                        <Select {...cycleBind}>
                            <option value="undefined">please, select one option</option>
                            <option value="monthly">monthly</option>
                            <option value="weekly">weekly</option>
                        </Select>
                    </FormGroup>
                    <div>
                        <Button type="submit">Save</Button>
                    </div>
                </div>
            </form>
        </WorkSpaceContainer>
    )
}

export default NewPaymentRecord