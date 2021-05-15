const useFormInputBind = (inputBinds=[]) => {
    const inputValues = {}

    if(inputBinds && inputBinds.length > 0) {
        for( let inputBind of inputBinds) {
            const inputName = inputBind["name"]
            const inputValue = inputBind["value"];
            inputValues[inputName] = inputValue;
        }
    }

    return inputValues;

}

export default useFormInputBind