import { configResponsive, useResponsive } from "ahooks"
import { useEffect, useState } from "react"

const _screen = {
    small: 0,
    medium: 640,
    large: 1280
}
configResponsive(_screen);
const useScreenSize = function() {
    const [screenSize, setScreenSize] = useState("small") // indicates mobile first
    let screen = useResponsive();
    useEffect(() => {
        if(screen["small"]) setScreenSize("small");
        if(screen["medium"]) setScreenSize("medium");
        if(screen["large"]) setScreenSize("large");
    }, [screen])

    return screenSize;
}

export default useScreenSize