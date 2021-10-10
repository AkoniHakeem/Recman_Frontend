import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { useParams } from "react-router"
import Button from "../../../assets/elements/button/button"
import FormGroup from "../../../assets/elements/custom/formGroup/formGroup"
import Input from "../../../assets/elements/input/input"
import useFetchFrom from "../../../assets/hooks/useFetchFrom"
import { useInput } from "../../../assets/hooks/useInput"
import WorkSpaceContainer from "../workspaceContainer"
import config from "../../../config"
import useFormInputBind from "../../../assets/hooks/useFormInputBind"
import DynamicTable from "../../../assets/elements/custom/table/simpleTable"
import useAuth from "../../../assets/hooks/useAuth"
import useEvent from "../../../assets/hooks/useEvent"

const PaymentRecord = (props) => {
    const [ , , user] = useAuth();
    const {paymentRecordName, organizationId} = useParams();

    /* form input */
    const [emailPhone, , emailPhoneBind, ] = useInput("emailPhone", "text", "please, supply the email or phone")
    const [userId, , userIdBind,] = useInput("userId", "text", "Please supply the user id");
    const [, , nameBind,] = useInput("name")
    const [amount, , amountBind,] = useInput("amount");
    const [ , , modeBind, ] = useInput("mode")
    const [ , ,timePeriodBind, ] = useInput("timePeriod", "text", "Time period like 'January' or 'Week 7' ")
    const [ , , yearBind, ] = useInput("year", "number", "please, type the year")
    const inputBinds = [emailPhoneBind, userIdBind, nameBind, amountBind, modeBind, timePeriodBind, yearBind]; 
    const inputValues = useFormInputBind(inputBinds);

    /* Custom-Events */
    const paymentRecordPageEvent = useEvent("payment-record-page");

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

    useEffect(()=> {
        // publish current payment record name and organization id
        paymentRecordPageEvent.publish({paymentRecordName, organizationId})
    }, [paymentRecordName])

    useLayoutEffect(() => {
        tableRef.current.updateTableData(payments)
    }, [payments])

    useEffect(() => {
        if(emailPhone) {
            const options = {
                "method": "GET",
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${user.token}`
                }
            }

            const handleUserDataFetch = (statusCode, responseBody) =>  {
                if(statusCode === 200) {
                    console.log(responseBody);
                    const user = responseBody
                     // populate form fields with user data
                    nameBind.setvalue(user.firstname + " " + user.lastname);
                    userIdBind.setvalue(user._id);
                    nameBind.setdisabled(true)
                    userIdBind.setdisabled(true);
        
                }
                else {
                    alert("we could not find the user whose id you supplied !");
                }
                setRequestUrl(undefined)
            }
            setCallback(() => handleUserDataFetch);
            setRequestOptions(options);
            setRequestUrl(`${config.backendUrl}${config.backendApiPath}/org/get-user?${emailPhone.includes("@")? "email": "phone"}=${emailPhone}`);
        }
        else {
            nameBind.setdisabled(false)
            userIdBind.setdisabled(false);
        }
    }, [emailPhone])

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
            <h1>Post Payment</h1>
                <div className="form-area">
                <FormGroup className="stacked">
                        <label>Email or Phone</label>
                        <Input {...emailPhoneBind}/>
                    </FormGroup>
                    <FormGroup className="stacked">
                        <label>User Id</label>
                        <Input {...userIdBind}/>
                    </FormGroup>
                    <FormGroup className="stacked">
                        <label>Name</label>
                        <Input {...nameBind}/>
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