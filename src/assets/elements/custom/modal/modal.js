import { forwardRef, useEffect, useImperativeHandle, useState } from "react"
import useEvent from "../../../hooks/useEvent"
import Button from "../../button/button"
import CloseButton from "../../button/closeButton"
import Card from "../card/card"
import CardFooter from "../card/cardFooter"
import CardHeader from "../card/cardHeader"
import "./modal.css"
const Modal = forwardRef(({useBorders, children, title, leftActionButton, rightActionButton, handleEvent}, ref) => {
        /* states variables */
        const [show, setShow] = useState(false);
        const [modalBody, setModalBody] = useState(null);
        const [modalTitle, setModalTitle] = useState("modal-title");
        const [leftActionBtn, setLeftActionBtn] = useState("");
        const [rightActionBtn, setRightActionBtn] = useState(undefined);
        const [handleModalEvent, setHandleModalEvent] = useState(undefined);

        useImperativeHandle(ref, () => ({
            showModal(val) {
                setShow(val);
            },

            setModalBody(modalBody, title, leftActionButton, rightActionButton, handleEvent) {
                setModalBody(modalBody);
                setModalTitle(title);
                setLeftActionBtn(leftActionButton)
                setRightActionBtn(rightActionButton);
                setHandleModalEvent(() => handleEvent);
            }
        }))

        /* set modal states */
        useEffect(() => {
            setModalTitle(title);
            setLeftActionBtn(leftActionButton)
            setRightActionBtn(rightActionButton);
            setHandleModalEvent(() => handleEvent)
        }, [])

        /* create and publish event for modal events */
        const modalEvent = useEvent("modal-event");

        /* publish source */
        const onModalEvent = (eventInfo={type: "", source: "", payload: {}}) => {
            /* publishes event for distant component */
            modalEvent.publish(eventInfo);

            /* calls event handler for parent component */
            if(handleModalEvent) {
                handleModalEvent(eventInfo);
            }
        }

        return(
            /* modal containser uses a backdrop */
            <>
            {show?
            <div className="modal">
                <div className="modal-container">
                    <Card className="modal-box-margin" >
                        <CardHeader >
                            <span> {modalTitle}</span>
                            <CloseButton onClick={()=> {
                                setShow(false);
                                onModalEvent({type: "click", source: "closeButton"});
                                }}/>
                        </CardHeader>
                    <div className={`modal-body ${useBorders? "modal-body-borders" : ""}`}>
                        {modalBody || children}
                    </div>

                    {leftActionBtn || rightActionBtn ?
                        <CardFooter >
                            <Button onClick={onModalEvent.bind(this, {type: "click", source: "leftActionButton"})}>  {leftActionBtn}</Button>
                            <Button onClick={onModalEvent.bind(this, {type: "click", source: "rightActionButton"})}> {rightActionBtn}</Button>
                        </CardFooter>
                    : <></> }
                </Card>
                </div>
            </div>
            :
            <></>
            }
            </>
        )
})

export default Modal;