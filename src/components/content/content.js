import { Route, Switch } from "react-router"
import Login from "../auth/login"
import Home from "../home/home"
import TestPage from "../testPage/testPage"
import WorkSpace from "../workspace/workspace"

const Content = (props) => {
    return(
        <Switch>
            <Route exact path="/test">
                this is the test page
                <TestPage />
            </Route>
            <Route exact path="/login"> 
                    <Login />
            </Route>
            <Route path="/workspace">
                    <WorkSpace />
            </Route>
            <Route exact path="/"> {/* todo: make test page available only in development */}
                    <Home />
            </Route>
        </Switch>
    )
}

export default Content