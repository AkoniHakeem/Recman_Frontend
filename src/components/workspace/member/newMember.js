import { useContext, useEffect, useRef, useState } from "react"
import Button from "../../../assets/elements/button/button"
import FormGroup from "../../../assets/elements/custom/formGroup/formGroup"
import Input from "../../../assets/elements/input/input"
import { useInput } from "../../../assets/hooks/useInput"
import WorkSpaceContainer from "../workspaceContainer"
import config from "../../../config"
import Select from "../../../assets/elements/select/select"
import { useParams } from "react-router"
import useFetchFrom from "../../../assets/hooks/useFetchFrom"
import useAuth from "../../../assets/hooks/useAuth"
import DynamicTable from "../../../assets/elements/custom/dynamicTable/dynamicTable"
import useFormInputBind from "../../../assets/hooks/useFormInputBind"

const NewMember = (props) => {
    const {organizationId} = useParams()
    // we need dynamic field imlementation that would be based on user configuration on first use
    // const [dynamicFieldInputName, setDynamicFieldName] = useState("");
    // const [dynamicFieldInputValue, , dynamicfieldInputBind, dynamicFieldInputAction] = useInput(dynamicFieldInputName)
    const [, , user] = useAuth()

    const [name, , nameBind,] = useInput("name")
    const [, , userIdBind] = useInput("userId", "text", " ")
    const [role, , roleBind, ]= useInput("role")
    const [, , groupIdBind, ] = useInput("groupId", "text", " ");
    const [, , pharmacyBind, ] = useInput("pharmacy", 'text', "please, enter the pharmacy discription")
    const [email, , emailBind] = useInput("email")

    const inputBinds = [nameBind, roleBind, groupIdBind, emailBind, userIdBind];
    const inputValues = useFormInputBind(inputBinds)

    const [requestOptions, setRequestOptions] = useState({})
    const [requestCallback, setRequestCallback] = useState(() => {})
    const DynamicTableRef = useRef()

    const [setRequestUrl] = useFetchFrom(requestOptions, requestCallback, true);



    useEffect(() => {
        // verify user id and load data
        // get id val
        
         // load data from back end with id
         // set parameters
         // options
         if(email) {
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
                    userIdBind.setvalue(user._id)
        
                }
                else {
                    alert("we could not find the user whose id you supplied !");
                }
                setRequestUrl(undefined)
            }
            setRequestCallback(() => handleUserDataFetch);
            setRequestOptions(options);
            setRequestUrl(`${config.backendUrl}${config.backendApiPath}/org/get-user?email=${email}`)
         }
    },[email])

    const loadMembers = () => {
        const page = 1;
        const url = `${config.backendUrl}${config.backendApiPath}/org/get-members?page=${page}&organizationId=${organizationId}`
        const options = {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": `bearer ${user.token}`
            }
        }

        const handleMembersFetch = (statusCode, responseBody) => {
            if(statusCode == 200) {
                // todo: handle reponse body
                if(responseBody.count > 0) {
                    DynamicTableRef.current.updateTableData(responseBody.result)
                }
            }
            else {
                alert("no member records found !")
            }
            setRequestUrl(undefined)
        }

        setRequestOptions(options);
        setRequestCallback(()=> handleMembersFetch);
        setRequestUrl(url);
    }

    const handleFetchCallback = (statusCode, responseBody) => {
        if(statusCode === 200) {
            alert("process was successful");
            console.log(responseBody)
            for(let inputBind of inputBinds) {
                inputBind.setvalue("")
            }
        }
        else {
            alert("process failed")
        }
        setRequestUrl(undefined)
    }

    const submit = (e) => {
        e.preventDefault();
        if(name &&  email && role !== "undefined")  {
            const body = {
                ...inputValues,
                organizationId,
            }
    
            const options = {
                "method": "POST",
                body: JSON.stringify(body),
                "headers": {
                    "Content-Type": "application/json",
                    "Authorization": `bearer ${user.token}`
                }
            }
    
            setRequestCallback(()=> handleFetchCallback);
            setRequestOptions(options);
            setRequestUrl(config.backendUrl + config.backendApiPath + "/org/add-member");
        }
        else {
            alert("please, supply valid input")
        }

    }
    return(    
        <WorkSpaceContainer breadCrumbsList={["/new-member"]}>
               <form onSubmit={submit.bind(this)}>
                    <div className="form-area">
                        {/* <FormGroup className="stacked" > todo: use for the dynamic field based on user cnfiguration on first time use

                        </FormGroup> */}
                        <FormGroup className="stacked">
                            <label>Email</label>
                            <Input {...emailBind}/>
                        </FormGroup>
                        <FormGroup className="stacked">
                            <label>User Id</label>
                            <Input {...userIdBind}/>
                        </FormGroup>
                        <FormGroup className="stacked">
                            <label> name</label>
                            <Input {...nameBind} />
                        </FormGroup>
                        <FormGroup className="stacked">
                            <label>role</label>
                            <Select {...roleBind}>
                                <option value="undefined">please, choose a role for the user you want to add</option>
                                <option value="member">member</option>
                                <option value="admin">admin</option>
                            </Select>
                        </FormGroup>
                        <FormGroup className="stacked" >
                            <label>Pharmacy</label> 
                            <Input {...pharmacyBind} required={false}/>
                        </FormGroup>
                        <FormGroup className="stacked" >
                            <label>Group Id</label>  {/* todo: refactor to become dynamic field*/}
                            <Input {...groupIdBind} required={false}/>
                        </FormGroup>
                        <div>
                            <Button>Save</Button>
                        </div>
                    </div>
                </form>
                <Button onClick={loadMembers.bind(this)}>Load Members</Button>
                <div>
                    <DynamicTable ref={DynamicTableRef}  ignore={["_id"]}/>
                </div>
        </WorkSpaceContainer>
    )

}

export default NewMember