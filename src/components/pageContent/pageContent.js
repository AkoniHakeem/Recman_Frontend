import Content from "../content/content"
import Loading from "../loading/loading"
import {AppContext} from "../contexts/appContext"
import { useContext } from "react"

const PageContent = (props) => {
    const loadingContext = useContext(AppContext).loadingContext;
    return(        
        <div>
            <Loading loading={loadingContext.loading}/>
            <Content />
        </div>
    )
}

export default PageContent