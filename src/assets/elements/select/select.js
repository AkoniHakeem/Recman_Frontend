import React from "react"
import "./select.css"
const Select = React.forwardRef((props, ref) => {

    return(
        <select ref={ref} {...{className: "select-default", ...props}}>
            {props.children}
        </select>
    )
})

export default Select