import { useContext, useEffect, useState} from "react";
import {AppContext} from "../../components/contexts/appContext"
const useFetchFrom = (options, callback, showLoading=true) => {
    const appContext = useContext(AppContext)
    const [requestUrl, setRequestUrl] = useState("");
    const [retry, setRetry] = useState(false);
    useEffect(() => {
        (async()=>  {
            if(requestUrl) {
                let response;
                try{ 
                    appContext.loadingContext.setLoading(showLoading);
                    response = await fetch(requestUrl, options)
                    if(response.ok) {
                        // todo: handle failed response
                        let responseBody = await response.json()
                        callback(response.status, responseBody)
                        appContext.loadingContext.setLoading(false);
                    }
                    else {
                        callback(response.status)
                        appContext.loadingContext.setLoading(false);
                    }
                }
                catch (error) {
                    console.log(error)
                    callback(500);
                    appContext.loadingContext.setLoading(false);
                }
                //#region former implementation
                // fetch(requestUrl, options).then((res) => {
                //     status = res.status;
                //     if(res.ok) {
                //         const responseBody = await res.json()
                //        return res.json()
                //     } 
                // }).then(result=> {
                //     callback(result, status)
                // })
                // .catch(err => console.log(err))
                //#endregion
            }
        })()
    
    }, [requestUrl, retry])

    return [setRequestUrl, setRetry]
}

export default useFetchFrom

