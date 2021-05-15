import { useLocalStorageState } from "ahooks";
import { useEffect, useReducer, useState} from "react";
import { AppContext } from "./appContext";
import UserReducer from "../reducers/userReducer"
import EventsReducer from "../reducers/eventsReducer";

const AppContextProvider = function (props){
    /* Logic for handling users - modify as required */
    const [user, setUser] = useLocalStorageState("userData", {_id: 0, firstname: "", lastname: "", token: ""})
    const [_user, userDispatch] = useReducer(UserReducer, user);
    const [events, eventsDispatch] = useReducer(EventsReducer, {})
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setUser(_user)
    }, [_user])

    useEffect(() => {

    },)

    /*  */
    return(
        <AppContext.Provider
        value={
            {
                userContext: {
                    user: {..._user},
                    userDispatch
                },
                loadingContext: {
                    setLoading,
                    loading
                },
                
                eventContext: {
                    dispatch: (events) => {
                        eventsDispatch({"type": "update", payload: events})
                    },
                    events: {...events},
                }

            }
        }
        >
            {props.children}
        </AppContext.Provider>
    )
}



export default AppContextProvider;