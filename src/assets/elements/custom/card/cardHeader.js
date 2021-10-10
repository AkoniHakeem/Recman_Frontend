import "./card.css";
const CardHeader = (props) => {
    return(
        <div className={`card-header ${props.className? props.className : ""}`}>
            {props.children}
        </div>
    )
}

export default CardHeader