// to facilitate easy and quick communication between a parent and child component

import { useContext, useEffect } from "react";
import { AppContext } from "../../components/contexts/appContext"

// allow the parent and child to listen 
// for certain evens from each other
// this way we can let the parent handle the most important tasks
// only pass along what the child simply needs

// this is going to be done using event pattern
// with this method anyone can publish anyone can subscribe
const useEvent = function (name) {
    const eventsContext = useContext(AppContext).eventContext;
    let events = {};
    if(eventsContext.events[name]) {
        events = eventsContext.events
    }
    else {
        events[name] = {
            _eventName: name,
            _event: [],
            publish(payload) {

                this._event.forEach(subscriber => {
                    subscriber(payload);
                })
            },
            subscribe(callMe) {
                this._event.push(callMe)
                this.registerEvents()
            },
            unsubsribe(id) {
                // get the currently registered event
                // this._event[id] && delete this._event[id]
                // todo: unsubscription
            },
            registerEvents() {
                eventsContext.dispatch(events)
            }
        }; 
    }
    
     useEffect(() =>  {
         events[name]?.registerEvents();
     }, [])

    return events[name];
}

export default useEvent;