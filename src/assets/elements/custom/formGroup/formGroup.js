
import "./formGroup.css"
const FormGroup = (props) => {
    
    const groupStyles = {
        "inline": "form-group-inline",
        "stacked": "form-group-stacked"
    }

    return(
        <div className={groupStyles[`${props.className}`] || props.className || props.inline}>
            {props.children}
        </div>
    )
}

export default FormGroup