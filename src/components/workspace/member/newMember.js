import { useEffect, useState } from "react"
import Button from "../../../assets/elements/button/button"
import FormGroup from "../../../assets/elements/custom/formGroup/formGroup"
import Input from "../../../assets/elements/input/input"
import { useInput } from "../../../assets/hooks/useInput"
import WorkSpaceContainer from "../workspaceContainer"
import config from "../../../config"

const NewMember = (props) => {

    // we need dynamic field imlementation that would be based on user configuration on first use
    const [dynamicFieldInputName, setDynamicFieldName] = useState("");
    const [firstname, , firstnameBind, firstnameActions] = useInput("firstname")
    const [lastname, , lastnameBind, lastnameActions] = useInput("lastname")
    const [gender, , genderBind, genderActions] = useInput("gender")
    const [dynamicFieldInputValue, , dynamicfieldInputBind, dynamicFieldInputAction] = useInput(dynamicFieldInputName)
    const [backendUrl, setBackendurl] = useState(undefined);
    const inputValList = [firstname, lastname, gender]

    useEffect(() => {
        if(backendUrl) {
            const requestUrl = backendUrl + "/auth/signup"
            const body = {
                firstname, lastname, gender,
                password: "defaultpassword",
                phone: "222-2222-222",
                email: "someone@defaultmail.com",
                ps1: "chamzo"

            }
            const options = {
                "method": "POST",
                body: JSON.stringify(body),
                "headers": {"Content-Type": "application/json"}
            }
            fetch(requestUrl, options).then((res) => {
                console.log("request sent")
                if(res.ok) {
                    console.log("user saved!")
                    return res.json()
                }
            }).then(body => {
                console.log(body)
                setBackendurl(undefined)
            }).catch(err => {
                console.log(err);
                setBackendurl(undefined)
            })
        }
    },[backendUrl])

    const submit = (e) => {
        e.preventDefault()
        setBackendurl(config.backendUrl + config.backendApiPath);
    }
    return(    
        <WorkSpaceContainer breadCrumbsList={["/new-member"]}>
               <form onSubmit={submit.bind(this)}>
                    <div className="form-area">
                        {/* <FormGroup className="stacked" > todo: use for the dynamic field based on user cnfiguration on first time use

                        </FormGroup> */}
                        <FormGroup className="stacked">
                            <label>first name</label>
                            <Input {...firstnameBind} />
                        </FormGroup>
                        <FormGroup className="stacked" >
                            <label>last name</label>
                            <Input {...lastnameBind}/>
                        </FormGroup>
                        <FormGroup className="stacked" >
                            <label>gender</label>
                            <Input {...genderBind}/>
                        </FormGroup>
                        <FormGroup className="stacked" >
                            <label>Entity</label>  {/* todo: make entity field changeable ie. dynamic*/}
                            <Input {...dynamicfieldInputBind} required={false}/>
                        </FormGroup>
                        <div>
                            <Button>Save</Button>
                        </div>
                    </div>
                </form>
        </WorkSpaceContainer>
    )

}

export default NewMember