import { useContext } from "react"
import { AppContext } from "../../components/contexts/appContext"

const useLoading = () => {

    const {loading: isLoading, setLoading} =  useContext(AppContext).loadingContext;

    const setIsLoading = (loadingState = true) => {
        setLoading(loadingState);
    }

    return [isLoading, setIsLoading]
}

export default useLoading;