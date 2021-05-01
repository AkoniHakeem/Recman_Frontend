import React from "react"
import "./button.css"

const Button = React.forwardRef((props, ref) => {
   return (
   <button ref={ref}  {...{className: "btn-primary", ...props}}>
        {
            props.children
        }
    </button>)
})

export default Button