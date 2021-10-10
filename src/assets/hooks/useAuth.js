import { useContext } from "react"
import { AppContext } from "../../components/contexts/appContext"

export function useAuth () {
    const userContext = useContext(AppContext).userContext;
    const user = userContext.user
    const isAuthenticated = !user || !user._id || user._id === 0 ? false : true;
    
    const setUser = (_user, token) => {
        userContext.userDispatch({type: "setUser", payload: {user: _user, token: token}})
    }

    const removeUser = () => {
        userContext.userDispatch({type: "removeUser"})
    }
        // implement later on
    const isAuthorized = true;
    const auth = [isAuthenticated, isAuthorized, user, setUser, removeUser]
    return  auth;
}

export default useAuth;