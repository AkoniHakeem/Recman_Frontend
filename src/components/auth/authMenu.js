
import { useClickAway } from "ahooks";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import DropDown from "../../assets/elements/custom/dropdown/dropdown";
import useAuth from "../../assets/hooks/useAuth";
import "./authMenu.css"
import userBadge from "../../assets/images/user-badge-outline.png"

const AuthMenu = (props) => {
    const userName = "mayowa";
    // const [isAuthenticated, setIsAuthenticated] = useState(true)
    const [showMenu, setShowMenu] = useState(false);
    const clickAwayListener = useRef(HTMLButtonElement)
    const [isAuthenticated, , , , removeUser] = useAuth();
    useClickAway((e) => {
        if(showMenu) {
            setShowMenu(false)
        }
    }, clickAwayListener)

    const openMenu = (e) => {
        if(!showMenu) {
            setShowMenu(true)
        }
    }

    const logout = () => {
        
        removeUser()
    }

    return(
        <div className="auth-nav">
            <button ref={clickAwayListener} className="auth-menu-button" onClick={openMenu.bind(this)}>
                { isAuthenticated? userName.toUpperCase().substr(0, 1) : <img className="user-badge" src={userBadge}/>}
                {showMenu?                
                <DropDown useCaret style="auth-menu" >
                    {isAuthenticated? 
                        <li onClick={logout.bind(this)}>Logout</li>
                    :
                    <>
                        <li><Link to="/signup">Signup</Link></li>
                        <li><Link to="/login">Login</Link></li>
                    </>
                    }
                </DropDown> : ""}

            </button>
        </div>

    )
}

export default AuthMenu