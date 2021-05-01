import { useState } from "react"

export const useInputOnchange = function(placeholder) {
    let [value, setValue] = useState("");
    let [error, setError] = useState(undefined);

    let clearInput = ()=>{
        setValue("");
    }

    let bindform = {
        onChange: function(e) {
            setValue(e.target.value);
        },
        value,
        placeholder,
        type: "text"
    }
    return  [value, error, bindform, clearInput]
}

export const useInput = function (name="name", type="text", placeholder=`Please, supply the ${name || "value"}`) {
    let [value, setvalue] = useState("");
    let [error, seterror] = useState("");

    let clearinput = ()=>{
        setvalue("");
    }

    let bindform = {
        onChange: function(e) {
            setvalue(e.target.value);
        },

        onInput: function(e, callback) {
            callback && callback(e);
        },
        name,
        value,
        placeholder,
        type,
        required: true,
        error,
        seterror,
        clearinput,
        setvalue,
    }
    return  [value, error, bindform, {setvalue, clearinput, seterror}]
}

export default useInputOnchange