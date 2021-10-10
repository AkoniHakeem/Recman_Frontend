import { useEffect, useState} from "react";
import useAuth from "./useAuth";
import useLoading from "./useLoading";
const useFetchFrom = (options, callback, showLoading=true) => {
    const [ , setIsLoading] = useLoading()
    const [requestUrl, setRequestUrl] = useState("");
    const [retry, setRetry] = useState(false);
    const [, , , , removeUser] = useAuth()
    useEffect(() => {
        (async()=>  {
            if(requestUrl) {
                let response;
                try{ 
                    setIsLoading(showLoading);
                    response = await fetch(requestUrl, options)
                    if(response.status === 401 || response.status === 403) {
                        removeUser()
                    }   
                    if(response.ok) {
                        // todo: handle failed response
                        let responseBody = await response.json()
                        callback(response.status, responseBody)
                        setIsLoading(false);
                    }
                    else {
                        callback(response.status)
                        setIsLoading(false);
                    }
                }
                catch (error) {
                    console.log(error)
                    callback(500);
                    setIsLoading(false);
                }
            }
        })()
    
    }, [requestUrl, retry])

    return [setRequestUrl, setRetry]
}

export default useFetchFrom

