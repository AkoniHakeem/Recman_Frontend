// to facilitate easy and quick communication between a parent and child component

import { useContext } from "react";
import { AppContext } from "../../components/contexts/appContext"

// allow the parent and child to listen 
// for certain evens from each other
// this way we can let the parent handle the most important tasks
// only pass along what the child simply needs

// this is going to be done using event pattern
const useEvent = function (name) {
    const appContext = useContext(AppContext);
    let eventContext;
    if(appContext.eventContext[name]) {
        eventContext = appContext.eventContext[name]
    }
    else {
        eventContext = {
            _event: ()=>{},
            publish(payload) {
                this._event(payload)
            },
            subscribe(callMe) {
                this._event = callMe
            }
        } 
        appContext.eventContext[name] = eventContext;
    } 

    return eventContext;
}

export default useEvent;