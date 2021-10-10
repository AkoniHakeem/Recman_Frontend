
const DropDown = (props) => {

    return(
        <div>
            <span className={props.useCaret? "caret": ""}></span>
            <ul className={props.style}>
                {props.children}
            </ul>
        </div>
    )
}

export default DropDown