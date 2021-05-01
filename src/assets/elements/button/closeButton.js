import React from "react"
import Button from "./button"
import "./button.css"

const CloseButton = React.forwardRef((props, ref) => {
   return (
        <Button ref={ref}  {...{className:"btn-close", ...props}}>
            <div className="line close-line-1"></div>
            <div className="line close-line-2"></div>
        </Button>
   )
})

export default CloseButton