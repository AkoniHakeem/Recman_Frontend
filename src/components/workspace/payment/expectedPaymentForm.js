import { useState } from "react";
import Button from "../../../assets/elements/button/button";
import FormGroup from "../../../assets/elements/custom/formGroup/formGroup"
import Input from "../../../assets/elements/input/input"
import useAuth from "../../../assets/hooks/useAuth";
import useFetchFrom from "../../../assets/hooks/useFetchFrom";
import { useInput } from "../../../assets/hooks/useInput";
import config from "../../../config";

const ExpectedPaymentForm = ({paymentRecordName, organizationId}) => {
    const [timePeriod, , timePeriodBind] = useInput("timePeriod", "text", "jan, feb, ...");
    const [year, , yearBind] = useInput("year", "number", "")
    const [requestOptions, setRequestOptions] = useState({});
    const [requestCallback, setRequestCallback] = useState(null)
    const [,, user] = useAuth()

    const [setRequestUrl] = useFetchFrom(requestOptions, requestCallback, true)

    const onSubmit = (e) => {
        e.preventDefault();
        const url = `${config.backendUrl}${config.backendApiPath}/org/generate-expected-payments`
        const options = {
            "method": "POST",
            "body": JSON.stringify({timePeriod, year, paymentRecordName, organizationId}),
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `bearer ${user.token}`
            }
        }

        const handleResponse = (statusCode, responseBody) => {
            if(statusCode === 200) {
                
            }
            else {
                alert("process failed");
            }
        }
        setRequestOptions(options)
        setRequestCallback(()=> handleResponse);
        setRequestUrl(url);
    }
    return(
        <div>
            <form onSubmit={onSubmit.bind(this)}>
                <div className="form-area">
                    <FormGroup className="stacked">
                        <lable>time period</lable>
                        <Input {...timePeriodBind}/>
                    </FormGroup>
                    <FormGroup className="stacked">
                        <label>year</label>
                        <Input {...yearBind}/>
                    </FormGroup>
                    <div>
                        <Button>Submit</Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ExpectedPaymentForm