import { useLayoutEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import Button from "../../../assets/elements/button/button"
import FormGroup from "../../../assets/elements/custom/formGroup/formGroup"
import Input from "../../../assets/elements/input/input"
import useFetchFrom from "../../../assets/hooks/useFetchFrom"
import { useInput } from "../../../assets/hooks/useInput"
import WorkSpaceContainer from "../workspaceContainer"
import config from "../../../config"
import useFormInputBind from "../../../assets/hooks/useFormInputBind"
import DynamicTable from "../../../assets/elements/custom/dynamicTable/dynamicTable"
import useAuth from "../../../assets/hooks/useAuth"

const PaymentRecord = (props) => {
    const [ , , user] = useAuth();
    const {paymentRecordName, organizationId} = useParams();

    /* form input */
    const [userId, , userIdBind,] = useInput("userId", "text", "Please supply the user id");
    const [amount, , amountBind,] = useInput("amount");
    const [ , , modeBind, ] = useInput("mode")
    const [ , ,timePeriodBind, ] = useInput("timePeriod", "text", "Time period like 'January' or 'Week 7' ")
    const [ , , yearBind, ] = useInput("year", "number", "please, type the year")
    const inputBinds = [userIdBind, amountBind, modeBind, timePeriodBind, yearBind]; 
    const inputValues = useFormInputBind(inputBinds);

    /* state variables */
    const [requestOptions, setRequestOptions] = useState({})
    const [callbackObject, setCallback] = useState(undefined)
    const [payments, setPayments] = useState([])

    const tableRef = useRef()

    const clearInputValues = (inputBinds = []) => {
        inputBinds.forEach(input => input.setvalue(""))
    }
    const handleRequestResult = (statusCode, responseBody) => {
        if(statusCode === 200) {
            alert("payment was successfuly posted!")
            clearInputValues(inputBinds);
            setRequestUrl(undefined)
        }
        else {
            alert("process failed");
            setRequestUrl(undefined)
        }
    }
    const [setRequestUrl, ] = useFetchFrom(requestOptions, callbackObject, true)

    const onSubmit = (e) => {
        e.preventDefault()
        if(userId && amount) {
            const body = {
                ...inputValues, organizationId,
                recordName: paymentRecordName
            }
            const options = {
                "method": "POST",
                "body": JSON.stringify(body),
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${user.token}`
                }
            }
            
            setRequestOptions(opt => {
                return {
                    ...opt, ...options
                }
            })
            
            setCallback(() => handleRequestResult)
            const requestUrl = config.backendUrl + config.backendApiPath + "/org/post-payment"
            setRequestUrl(requestUrl)
        }
        else {
            alert("please, supply valid inputs")
        }
        
    }
    

    const handleGetResult = (statusCode, responseBody) => {
        if(statusCode === 200) {
            console.log(responseBody);
            setPayments(responseBody.result);
            alert("process was successful");
        }
        else {
            alert("process failed")
        }
        setRequestUrl(undefined)
    }

    useLayoutEffect(() => {
        tableRef.current.updateTableData(payments)
    }, [payments])

    const getPayments = () => {
            const options = {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${user.token}`
                }
            }

            setRequestOptions(options);
            setCallback(() => handleGetResult);
            const requestUrl = config.backendUrl + config.backendApiPath 
            + `/org/get-payments?page=1&organizationId=${organizationId}&recordName=${paymentRecordName}`
            setRequestUrl(requestUrl);
    }
    return(
        <WorkSpaceContainer breadCrumbsList={[`/${paymentRecordName}`]}> {/* bread crumbs value should be dynamically generated */}
            <form onSubmit={onSubmit.bind(this)}>
                <div className="form-area">
                    <FormGroup className="stacked">
                        <label>User Id</label>
                        <Input {...userIdBind}/>
                    </FormGroup>
                    <FormGroup className="stacked">
                        <label>Amount</label>
                        <Input {...amountBind}/>
                    </FormGroup>
                    <FormGroup className="stacked">
                        <label>Time Period</label>
                        <Input {...timePeriodBind}/>
                    </FormGroup>
                    <FormGroup className="stacked">
                        <label>Year</label>
                        <Input {...yearBind}/>
                    </FormGroup>
                    <FormGroup className="stacked">
                        <label>Mode</label>
                        <Input {...modeBind}/>
                    </FormGroup>
                    <div>
                        <Button type="submit">Post</Button>
                    </div>
                </div>
            </form>
            <div className="divider"></div>
            <Button onClick={getPayments.bind(this)}>Load Payments</Button>
            <div className="table">
                {<DynamicTable ref={tableRef} ignore={["_id"]}/> }
            </div>
        </WorkSpaceContainer>
    )
}

export default PaymentRecord