import { useEffect} from "react";

const useFetch = (requestUrl, options, callback, watchs = []) => {
    useEffect(() => {
        if(requestUrl) {
            let status = 0;
            fetch(requestUrl, options).then((res) => {
                status = res.status;
                if(res.ok) {
                   return res.json()
                } 
            }).then(result=> {
                callback(result, status)
            })
            .catch(err => console.log(err))
        }
    
    }, [...watchs])
}

export default useFetch

