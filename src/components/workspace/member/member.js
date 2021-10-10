import { Route, Switch, useRouteMatch } from "react-router-dom"
import MemberDetail from "./memberDetail"
import MembersList from "./membersList";
import NewMember from "./newMember"

const Member = () => { 
const {url} = useRouteMatch()
    return(
        <Switch>
            <Route exact path={`${url}/new/:organizationId`}>
                <NewMember />
            </Route>
            <Route path={`${url}/:organizationId/:memberId`}>
                <MemberDetail />
            </Route> 
            <Route exact path={`${url}/:organizationId`}>
                <MembersList />
            </Route>
        </Switch>
    )
}

export default Member