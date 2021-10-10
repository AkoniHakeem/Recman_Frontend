const WorkSpaceContainer = (props) => {

    return(
        <div className="workspace-container">
            <div className="bread-crumbs">{props.breadCrumbsList.reduce((preVal, curVal) => <><span>{preVal}</span><>/</><span>{curVal}</span></> )}</div>
            {props.children}
        </div>
    )
}

export default WorkSpaceContainer