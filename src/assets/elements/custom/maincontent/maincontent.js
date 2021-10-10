import useScreenSize from "../../../hooks/useScreenSize"
import "./maincontent.css"

const MainContent = (props) => {
    const screen = useScreenSize();

    return(
        <div className={`main-content ${!screen === "small" && props.leftGap?  "left-gap" : ""}` }>
            {props.rightSidebar? 
            <div className="with-right-sidebar">
                <div className="left-content">{props.children}</div>
                <div className="right-content">{props.rightSidebar}</div>
            </div>
            : props.children}
        </div>
    )
}

export default MainContent