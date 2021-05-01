import React, { Fragment } from 'react'
import CloseButton from '../../button/closeButton'
import './sidebar.css'
const Sidebar = (props) => {
      
    const closeSideBar = (sidebarToggler) => {
        sidebarToggler()
    }
    return (
        <div className={`sidebar ${props.open || "hidden"}`}>
            <div className="header">
                <h2>{props.title}</h2>
                <CloseButton onClick={closeSideBar.bind(this, props.sidebarToggler)}/>
            </div>
            <div className="main">
                {
                    props.children.map((child, i, A) => {
                        return (
                            <Fragment key={i}>
                                {child}
                                {console.log("child: ", i)}
                                {i !== props.children.length - 1 ? 
                                    <div className="divider"></div> : <></>
                                }
                            </Fragment>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Sidebar