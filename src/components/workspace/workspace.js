import React, { useEffect, useState } from "react"
import Button from "../../assets/elements/button/button"
import MenuButton from "../../assets/elements/custom/menubutton/menubutton"
import Navbar from "../../assets/elements/custom/navbar/navbar"
import AuthMenu from "../auth/authMenu"
import Sidebar from "../../assets/elements/custom/sidebar/sidebar"
import CaretlistItem from "../uList/caretListItem"
import Page from "../../assets/elements/custom/page/page"
import "./workspace.css"
import MainContent from "../../assets/elements/custom/maincontent/maincontent"
import { Link, Redirect, Route, Switch, useLocation, useRouteMatch } from "react-router-dom"
import useAuth from "../../assets/hooks/useAuth"
import NewOrganization from "./organization/newOrganization"
import NewMember from "./member/newMember"
import NewPaymentRecord from "./payment/newPayment"
import PaymentRecord from "./payment/PaymentRecord"
import useFetchFrom from "../../assets/hooks/useFetchFrom"
import config from "../../config"
import useEvent from "../../assets/hooks/useEvent"


const WorkSpace = (props) => {
    const location = useLocation();
    const {url, path} = useRouteMatch();
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [responseCallback, setResponseCallback] = useState(() => {})
    const [organizationsData, setOrganizationDatas] = useState([])
    const [fetchParams, setFetchParams] = useState("orgsParams");
    const [currentlyFocusedOrganizationId, setCurrentlyFocusedOrganizationId] = useState("")
     /* paymentRecord is of the form {[organizationId]: []} */
     const [paymentRecords, setPaymentRecords] = useState({[currentlyFocusedOrganizationId]: []});

    const [isAuthenticated, , user] = useAuth();
    const eventContext = useEvent("caret-open");

    const dynamicRecordType = "Payment"

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible)
    }

    const options = {
        method: "GET",
        "headers": {"Content-Type": "application/json", "Authorization": `bearer ${user.token}`}
    }

    const handleOrgsFetch = (statusCode, responseBody) => {
        if(statusCode === 200) {
            setOrganizationDatas(responseBody)
            // create an early subscription
            responseBody.forEach(orgData => {
                // subscribe to caret-open event
                eventContext.subscribe(orgData._id, (payload) => {
                // checking to know  we are responding to event from the right source
                if(payload.name === dynamicRecordType) {
                    setCurrentlyFocusedOrganizationId(payload.id)
                    setFetchParams("paymentParams")
                }
            })
            })
 
        }
        else {
            // todo: handle failure - use status code results
        }
    }

    const handlePaymentRecordsFetch = (statusCode, responseBody) => {
        if(statusCode === 200 ) {
            console.log(responseBody)
            // dynamically setting the response based on the currently focused organization or currently cliked caret organizations
            setPaymentRecords(rec => ({...rec, [currentlyFocusedOrganizationId]: responseBody}))
            // setting to  undefined so we can continue to use the use effect updates
            setFetchParams(undefined)
        }
        else {
            // todo: handle failure - use status code results
        }
    }

    const backendFectchParams = {
        orgsParams: {
            responseCallback: handleOrgsFetch,
            fetchUrl: `${config.backendUrl}${config.backendApiPath}/org?userId=${user._id}`
        },
        paymentParams: {
            responseCallback: handlePaymentRecordsFetch,
            fetchUrl: `${config.backendUrl}${config.backendApiPath}/org/get-payment-records?organizationId=${currentlyFocusedOrganizationId}`
        }
    }

    const [setRequestUrl, ] = useFetchFrom(options, responseCallback, false)

    useEffect(() => {
         if(fetchParams !== undefined) {
            setResponseCallback(()=> backendFectchParams[fetchParams]["responseCallback"])
            console.log(backendFectchParams[fetchParams]["fetchUrl"])
            setRequestUrl(backendFectchParams[fetchParams]["fetchUrl"])
         }

    }, [fetchParams])

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
                        {organizationsData? organizationsData.map( (currentValue, index) => (
                            <CaretlistItem id={`${index}_${currentValue.name}`} name={currentValue.name}>
                                <ul> {/* todo: implement properly  */}
                                    <li>&nbsp;&nbsp;&nbsp;<Link to={`${url}/new-member/${currentValue["_id"]}`}>Members</Link></li>
                                </ul>
                                <ul>
                                    {/* using the currently interacted-with organization's id as the source id */}
                                    <CaretlistItem sourceId={currentValue["_id"]} name={dynamicRecordType} linkTo={`${url}/new-payment-record/${currentValue["_id"]}`}>
                                        {paymentRecords[currentValue["_id"]] && paymentRecords[currentValue["_id"]].map( (currentPaymentRecordVal, _index) =>
                                            <ul key={`${_index}_${currentPaymentRecordVal["recordName"]}`}><li><Link to={`${url}/${currentPaymentRecordVal["recordName"]}/${currentValue["_id"]}`}>{currentPaymentRecordVal["recordName"]}</Link></li></ul>
                                        )}
                                    </CaretlistItem>
                                </ul>
                            </CaretlistItem>
                        )): <></>}

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
                        <Route path={`${url}/new-member/:organizationId`}>
                            <NewMember />
                        </Route>
                        <Route path={`${url}/new-payment-record/:organizationId`}>
                            <NewPaymentRecord />
                        </Route>
                        <Route path={`${url}/:paymentRecordName/:organizationId`}>
                            <PaymentRecord />
                        </Route>
                        <Route path={`${url}`} >
                            <div className="recman-welcome">
                                <h4>Welcome to RecMan version 0.1</h4>
                            </div>
                        </Route>
                    </Switch>
                </MainContent>
            }
        />
    )
}

export default WorkSpace