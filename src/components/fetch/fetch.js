import { useEffect, useState } from "react";
import useAuth from "../../assets/hooks/useAuth";

const Fetch = ({url, render, requestOptions }) => {
    const [fetchData, setFetchData ] = useState({isLoading: true, statusCode: undefined, data: {}, error: undefined});
    
    const [, , , , removeUser] = useAuth();

    useEffect(() => { 
        const makeRequest =  async() => { 
            try{ 
                const requestResponse = await fetch(url, requestOptions);
                if(requestResponse.status === 401 || fetchData.statusCode === 403) {
                    removeUser()
                }   
                if(requestResponse.ok) {
                    // todo: handle failed response
                    let responseBody = await requestResponse.json()
                    setFetchData(d => ({...d, isLoading: false, statusCode: requestResponse.status, data: responseBody}));
                }
                else {

                setFetchData(d => ({...d, statusCode: requestResponse.status}));
                }
            }
            catch (error) {
                console.log(error)
            }
        }
        makeRequest();   
    }, [url])
    return fetchData.isLoading ? <>Loading ...</> : render(fetchData)
};

export default Fetch;