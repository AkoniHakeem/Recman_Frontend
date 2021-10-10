import { useEffect, useState } from "react";

const useCustomCSSProperty = () => {


    // const [customProperty, setCustomProperty] = useState("");
    const [compStyle, setCompStyle] = useState()
    const [root, setRoot]  = useState()
    useEffect(()=> {
        setRoot(document.documentElement)
        const compStyle = getComputedStyle(document.documentElement)
        setCompStyle(compStyle);
    }, [])

    // useful to get the initial propertyValue before being accessed by javascript;
    const getInitialCustomCSSPropertyValue = (property) => {
        const propVal =  compStyle.getPropertyValue(property)
        return propVal;
    }

    // doesnt return initial property value before being accessed by javascript
    const getCustomProperty = (property) => {
        const propVal =  root.style.getPropertyValue(property)
        return propVal;
    }

    const setCustomCSSProperty = (property, value) => {
       root.style.setProperty(property, value)
    }

    return [setCustomCSSProperty, getCustomProperty, getInitialCustomCSSPropertyValue]
}

export default useCustomCSSProperty;