import "./navbar.css"
const Navbar = (props) => {

    return(
        <div className="navbar">
            {props.children}
        </div>
    )
}

export default Navbar