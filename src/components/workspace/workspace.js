import React, { useState } from "react"
import Button from "../../assets/elements/button/button"
import MenuButton from "../../assets/elements/custom/menubutton/menubutton"
import Navbar from "../../assets/elements/custom/navbar/navbar"
import AuthMenu from "../auth/authMenu"
import Login from "../auth/login"
import Sidebar from "../../assets/elements/custom/sidebar/sidebar"
import CaretlistItem from "../uList/caretListItem"
import Page from "../../assets/elements/custom/page/page"
import "./workspace.css"
import MainContent from "../../assets/elements/custom/maincontent/maincontent"
import { Link, Redirect, Route, Switch, useLocation, useRouteMatch } from "react-router-dom"
import useAuth from "../../assets/hooks/useAuth"
import NewOrganization from "./organization/newOrganization"
import NewMember from "./member/newMember"


const WorkSpace = (props) => {
    const location = useLocation();
    const {url, path} = useRouteMatch();
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [isAuthenticated] = useAuth();
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible)
    }

    if(!isAuthenticated) {
        return <Redirect to={{pathname: "/login", state: {from: location}}}/>
    }
    
    return(
        <Page className="container-page-flex"
            navbar={
                <Navbar>
                    <MenuButton onClick={toggleSidebar.bind(this)}/>
                    <h4 className="app-title">RecMan</h4>
                    <AuthMenu style={"auth-nav"} />
                </Navbar>
            }

            sidebar={
                <Sidebar title="RecMan" open={sidebarVisible} sidebarToggler={toggleSidebar}>
                <>
                    <ul>
                        <CaretlistItem name={"Pharmacy Group"}>
                            <ul>
                                <li><Link to={`${url}/new-member`}>Members</Link></li>
                            </ul>
                        </CaretlistItem>
                    </ul>
                </>
                <>
                    <ul>
                        <li>Create New Organization <Link to={`${url}/new-organization`}><Button>+</Button></Link> </li>
                    </ul>
                </>
                </Sidebar>
            }

            maincontent={
                <MainContent leftGap>
                    <Switch>
                        <Route path={`${url}/new-organization`}>
                            <NewOrganization />
                        </Route>
                        <Route path={`${url}/new-member`}>
                            <NewMember />
                        </Route>
                    </Switch>
                </MainContent>
            }
        />
    )
}

export default WorkSpace