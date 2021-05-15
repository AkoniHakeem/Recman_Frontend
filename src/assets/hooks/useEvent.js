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
            _event: {},
            publish(subscriptionId, payload) {
                // todo: handle case when it is important to publish  to all subscriptions
                /* 
                    if(! subscriptionId) {
                        Object.keys(this._event).forEach(k => {
                            if(this._event.hasOwnProperty(k)) {
                                this._event[k](payload)
                            }
                        })
                        return;
                    }
                */ // implement something similar to remove all subscriptions

                // get the currently registered event
                this._event[subscriptionId] && this._event[subscriptionId](payload) 
            },
            subscribe(id, callMe) {
                this._event[id] = callMe
                this.registerEvents()
            },
            unsubsribe(id) {
                // get the currently registered event
                this._event[id] && delete this._event[id]
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