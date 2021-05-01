import useScreenSize from "../../../hooks/useScreenSize"
import "./maincontent.css"

const MainContent = (props) => {
    const screen = useScreenSize()

    return(
        <div className={`main-content ${!screen === "small" && props.leftGap?  "left-gap" : ""}` }>
            {props.children}
        </div>
    )
}

export default MainContent