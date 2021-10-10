import "./card.css";
const CardFooter = (props) => {
    return(
        <div className={`card-footer ${props.className? props.className : ""}`}>
            {props.children}
        </div>
    )
}

export default CardFooter