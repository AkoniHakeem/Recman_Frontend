import { forwardRef } from "react";
import "./input.css"

const Input = forwardRef((props, ref) => {

    return(
        <input ref={ref} {...{className: "input-default", ...props}} />
    )
})

export default Input