import React, { useState } from "react"
import CaretOpened from "../../assets/images/caret-opened.png"
import CaretClosed from "../../assets/images/caret-closed.png"
import { Link } from "react-router-dom"
import useEvent from "../../assets/hooks/useEvent"
const CaretlistItem = (props) => {
    const [caretIsOpened, setCaretIsOpened] = useState(false)
    const _event = useEvent("caret-open");
    const toggleCaret = () => {
        if(! caretIsOpened) {
            const payload = {id: props.sourceId, name: props.name}
            _event.publish(props.sourceId, payload);
        }
        setCaretIsOpened(!caretIsOpened)
    }
    return(
        <li key={props.id} className="caret-item">
            <div>
            <span>{props.linkTo? <Link to={props.linkTo}>{props.name}</Link> : props.name }</span>
                <div>
                    {caretIsOpened? props.children : <></>}
                </div>
            </div>
            <div onClick={toggleCaret.bind(this)}><img src={caretIsOpened? CaretOpened : CaretClosed} /></div>
        </li>
    )
}

export default CaretlistItem