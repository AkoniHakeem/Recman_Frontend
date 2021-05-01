import { useLocalStorageState } from "ahooks";
import { useEffect, useReducer} from "react";
import { AppContext } from "./appContext";
import UserReducer from "../reducers/userReducer"

const AppContextProvider = function (props){
    /* Logic for handling users - modify as required */
    const [user, setUser] = useLocalStorageState("userData", {_id: 0, firstname: "", lastname: "", token: ""})
    const [_user, userDispatch] = useReducer(UserReducer, user);

    useEffect(() => {
        setUser(_user)
    }, [_user])

    /*  */
    return(
        <AppContext.Provider
        value={
            {
                userContext: {
                    user: {..._user},
                    userDispatch
                },
                
                eventContext: {}

            }
        }
        >
            {props.children}
        </AppContext.Provider>
    )
}



export default AppContextProvider;