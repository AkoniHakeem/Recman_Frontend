import WorkSpaceContainer from "../workspaceContainer"
import {useInput} from "../../../assets/hooks/useInput"
import Button from "../../../assets/elements/button/button";
import Input from "../../../assets/elements/input/input";
import FormGroup from "../../../assets/elements/custom/formGroup/formGroup";

const NewOrganization = (props) => {
    const [name, nameError, nameBind, nameActions] = useInput("name");

    return(
        <WorkSpaceContainer breadCrumbsList={["new-organization"]}>
            <div>
                <form>
                    <div className="form-area">
                        <FormGroup className="stacked">
                            <label title="name of organization">Name</label>
                            <Input {...nameBind} />
                        </FormGroup>
                        <div>
                            <Button>Submit</Button>
                        </div>
                    </div>
                    
                </form>
            </div>
        </WorkSpaceContainer>
    )
}

export default NewOrganization