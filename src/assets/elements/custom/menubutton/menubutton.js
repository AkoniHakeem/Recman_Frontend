import React from "react";
import "./menubutton.css"

const MenuButton = React.forwardRef((props, ref) => {

    return(
        <>
            <button ref={ref} {...props} className="menubutton">
                <div className="menubar"></div>
                <div className="menubar"></div>
                <div className="menubar"></div>
            </button>
        </>
    )
})

export default MenuButton