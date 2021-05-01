import React, { useState } from "react"
import CaretOpened from "../../assets/images/caret-opened.png"
import CaretClosed from "../../assets/images/caret-closed.png"
const CaretlistItem = (props) => {
    const [caretIsOpened, setCaretIsOpened] = useState(false)
    const toggleCaret = () => {
        setCaretIsOpened(!caretIsOpened)
    }
    return(
        <li className="caret-item">
            <div>
            <span>{props.name}</span>
                <div>
                    {caretIsOpened? props.children : <></>}
                </div>
            </div>
            <div onClick={toggleCaret.bind(this)}><img src={caretIsOpened? CaretOpened : CaretClosed} /></div>
        </li>
    )
}

export default CaretlistItem