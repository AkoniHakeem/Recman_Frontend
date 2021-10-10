import React, { useEffect, useRef, useState } from "react"
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
import NewPaymentRecord from "./payment/newPayment"
import PaymentRecord from "./payment/PaymentRecord"
import useFetchFrom from "../../assets/hooks/useFetchFrom"
import config from "../../config"
import useEvent from "../../assets/hooks/useEvent"
import DropDown from "../../assets/elements/custom/dropdown/dropdown"
import { useClickAway, useLocalStorageState } from "ahooks"
import ExpectedPayments from "./payment/expectedPayments"
import Modal from "../../assets/elements/custom/modal/modal"
import ExpectedPaymentForm from "./payment/expectedPaymentForm"
import Member from "./member/member"


const WorkSpace = () => {
    /* navigation  parameters*/
    const location = useLocation();
    const {url} = useRouteMatch();

    /*  authenticated user */
    const [isAuthenticated, , user] = useAuth();

    /* states */
    const [responseCallback, setResponseCallback] = useState(() => {})
    const [organizationsData, setOrganizationDatas] = useState([])
    const [fetchParams, setFetchParams] = useState("orgsParams");
    const [currentlyFocusedOrganizationId, setCurrentlyFocusedOrganizationId] = useState("");
    const [paymentRecords, setPaymentRecords] = useState({[currentlyFocusedOrganizationId]: []}); /* paymentRecord is of the form {[organizationId]: []} */
    const [currenPaymentRecordPageDetails, setCurrenPaymentRecordPageDetails] = useState({});
    const [menuClicked, setMenuClicked] = useState(false);
    const [requestOptions, setRequestOptions] = useState({});

    /* saving state for right menu content */
    const [menuContentState, setMenuContentState] = useLocalStorageState("right-menu-content-state", {});

    // setter for custom css property
    // const [ setCustomCSSProperty] = useCustomCSSProperty();
    // sidebar visible state
    const [sidebarVisible, setSidebarVisible] = useState(true);

    /* refs */
    const modalRef = useRef(null);

    /*  click away ref */
    const clickAwayRef = useRef(null);
    useClickAway(() => {
        setMenuClicked(false)
    }, clickAwayRef)

     /* custom events */ 
    const caretOpenEvent = useEvent("caret-open");
    const paymentRecordPageEvent = useEvent("payment-record-page");
    const pageReadyEvent = useEvent("page-ready");

    /* static variable */
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
                caretOpenEvent.subscribe((payload) => {
                // checking to know  we are responding to event from the right source
                if(payload.name === dynamicRecordType) {
                    setCurrentlyFocusedOrganizationId(payload.id)
                    // this pattern is useful when you need to automatically load from the the available fetch params
                    setFetchParams("paymentParams")
                }
            })

            pageReadyEvent.publish(true);
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
            fetchUrl: `${config.backendUrl}${config.backendApiPath}/org?userId=${user._id}`,
            options: {...options}
        },
        paymentParams: {
            responseCallback: handlePaymentRecordsFetch,
            fetchUrl: `${config.backendUrl}${config.backendApiPath}/org/get-payment-records?organizationId=${currentlyFocusedOrganizationId}`,
            options: {...options}
        },
        generateExpectedPayments: {
            responseCallback: (statusCode, reponseBody) => {
                if(statusCode===200) {
                    alert("process successful")
                }
                else {
                    alert("process failed")
                }
                setRequestUrl(undefined)
            },
            fetchUrl: `${config.backendUrl}${config.backendApiPath}/org/generate-expected-payments`,
            options: {...options, method: "POST"}
        }
    }

    const [setRequestUrl, ] = useFetchFrom(requestOptions, responseCallback, false)

    useEffect(() => {
         if(fetchParams !== undefined) {
            setRequestOptions(backendFectchParams[fetchParams]["options"]);
            setResponseCallback(()=> backendFectchParams[fetchParams]["responseCallback"]);
            console.log(backendFectchParams[fetchParams]["fetchUrl"]);
            setRequestUrl(backendFectchParams[fetchParams]["fetchUrl"]);
         }
    }, [fetchParams])
    useEffect(() => {
        paymentRecordPageEvent.subscribe(({paymentRecordName, organizationId}) => {
            setCurrenPaymentRecordPageDetails({paymentRecordName, organizationId})
            setMenuContentState(menuState => ({...menuState, paymentRecordName, organizationId}));

        })
        // todo: unsubscription
    }, [])
    

    const showModal = (val) => {
        modalRef.current.showModal(val);
    }

    const setModalBody = (modalBody, title=undefined, leftActionButton=undefined, rightActionButton=undefined, handleModalEvents=undefined) => {
        modalRef.current.setModalBody(modalBody, title, leftActionButton, rightActionButton, handleModalEvents);
    }

    /* generate expected payments */
    const generateExpectedPayments = (paymentRecordName, organizationId)=> {
        setRequestOptions({...backendFectchParams["generateExpectedPayments"]["options"], "body": JSON.stringify({paymentRecordName, organizationId})})
        setResponseCallback(()=> backendFectchParams["generateExpectedPayments"]["responseCallback"]);
        setRequestUrl(backendFectchParams["generateExpectedPayments"]["fetchUrl"])
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
                        {organizationsData? organizationsData.map( (currentValue, index) => (
                            <CaretlistItem id={`${index}_${currentValue.name}`} name={currentValue.name}>
                                <ul> {/* todo: implement properly  */}
                                    <li>&nbsp;&nbsp;&nbsp;<Link to={`${url}/member/${currentValue["_id"]}`}>Members</Link></li>
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
                        <li> <Link to={`${url}/new-organization`}>Create New Organization &nbsp;<Button>+</Button></Link> </li>
                    </ul>
                </>
                </Sidebar>
            }

            maincontent={
                <MainContent leftGap rightSidebar={
                    <div >
                        <div ref={clickAwayRef}  onClick={() => {setMenuClicked(true)}} className="meat-ball">
                            <span>.</span>
                            <span>.</span>
                            <span>.</span>
                        </div>
                        {menuClicked? 
                            <div className="menu-container">
                                <DropDown useCaret style="menu">
                                    <li><Link to={`${url}/expected_payments/${currenPaymentRecordPageDetails.paymentRecordName || menuContentState.paymentRecordName}/${currenPaymentRecordPageDetails.organizationId || menuContentState.organizationId}`}>Show Expected Payments for {currenPaymentRecordPageDetails.paymentRecordName || menuContentState.paymentRecordName}</Link></li>
                                    <li 
                                    onClick={ () => {
                                        showModal(true);
                                        /*  generateExpectedPayments.bind(this, currenPaymentRecordPageDetails.paymentRecordName 
                                        || menuContentState.paymentRecordName, currenPaymentRecordPageDetails.organizationId || menuContentState.organizationId) */
                                        setModalBody(
                                            /* add generate expected payment form */
                                            <ExpectedPaymentForm paymentRecordName={currenPaymentRecordPageDetails.paymentRecordName || menuContentState.paymentRecordName}
                                                organizationId={ currenPaymentRecordPageDetails.organizationId || menuContentState.organizationId}/>,
                                            `Generate Expected Payment for ${currenPaymentRecordPageDetails.paymentRecordName || menuContentState.paymentRecordName}`,
                                            
                                        )
                                    }
                                        }>Generate Expected Payments</li>
                                </DropDown>
                            </div> 
                            :
                            <></>
                        }

                    </div>
                }>
                    <>
                    <Switch>
                        <Route path={`${url}/new-organization`}>
                            <NewOrganization />
                        </Route>
                        <Route path={`${url}/member`}>
                            <Member />
                        </Route>
                        <Route path={`${url}/new-payment-record/:organizationId`}>
                            <NewPaymentRecord />
                        </Route>
                        <Route path={`${url}/expected_payments/:paymentRecordName/:organizationId`}>
                            <ExpectedPayments/> 
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
                    <Modal ref={modalRef}></Modal>
                    </>
                </MainContent>
            }
        />
    )
}

export default WorkSpace