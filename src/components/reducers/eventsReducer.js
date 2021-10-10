function EventsReducer(events, action) {
    const events_reducer = {
        update() {
            const _events = action.payload
            return {...events, ..._events}
        }
    }

    return events_reducer[action.type]()
}

export default EventsReducer;