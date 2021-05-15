import { useEffect, useRef, useState } from "react";
import "./loading.css"

const Loading = ({loading}) => {

    return(
        <div className="loading">{loading? "Loading ..." : <></>}</div>
    )
}

export default Loading