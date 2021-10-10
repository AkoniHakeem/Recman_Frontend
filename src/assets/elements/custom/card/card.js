import "./card.css"
const Card = (props) => {

    return(
        <div className={`card ${props.className? props.className : ""}`}>
            {props.children}
        </div>
    )
}

export default Card