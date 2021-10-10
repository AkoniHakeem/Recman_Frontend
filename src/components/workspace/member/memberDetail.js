import { useParams } from "react-router-dom";
import {Link} from 'react-router-dom'
import WorkSpaceContainer from "../workspaceContainer";
import Button from "../../../assets/elements/button/button";
import  "../workspace.css"
import Table from "../../../assets/elements/custom/table/table";
import Fetch from "../../fetch/fetch";
import config from "../../../config"
import useAuth from "../../../assets/hooks/useAuth";

const MemberDetail = () => { 
    const {memberId, organizationId} = useParams();
    const [, , user] = useAuth();
    const  options = { 
        method: "GET",
        "headers": {"Content-Type": "application/json", "Authorization": `bearer ${user.token}`}
    }

return(
    <WorkSpaceContainer breadCrumbsList={["/member"]}>
        <div>
        <h1>Member Details</h1>
        <div className="member-detail-container">
            <div className="member-detail-top">
                <Fetch 
                url={`${config.backendUrl}${config.backendApiPath}/org/member?memberId=${memberId}`} 
                requestOptions= {{
                    ...options
                }}
                render={({isLoading, data, statusCode}) => { 
                    if(!isLoading) {
                        if(statusCode === 200) { 
                            return (
                                <>
                                    <div className="member-detail-profile-image">
                                            profile imagem
                                    </div>
                                    <div className="member-detail-profile-info">
                                        <p><span>Name: {data['name']}</span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<span>{data['role']}</span></p>
                                        <p><span>Email: {data['emailPhone']}</span></p>
                                        <p><span>Phone: {data['email']}</span></p>
                                        <p><span>Group: {data['groupId']}</span></p>
                                    </div>
                                </>
                            )
                        }
                        else {
                            return <>No data found for this member</>
                        }

                    }
                    return <></>
                 }}
                />
            </div>
            <div className="member-detail-action">
                <div className="new-member-btn">
                    <Link to={`/workspace/member/new/${organizationId}`}><Button>New Member</Button></Link>
                </div>
            </div>
            <div className="member-detail-body">
                <div className="table-1">
                <Table head={
                    <tr>
                        <td>Amount</td>
                        <td>Date</td>
                        <td>Mode</td>
                        <td>Payment Record</td>
                    </tr>
                }
                body={
                    <Fetch 
                url={`${config.backendUrl}${config.backendApiPath}/org/member/payments?memberId=${memberId}&organizationId=${organizationId}`} 
                requestOptions= {{
                    ...options
                }}

                render = {({isLoading, statusCode, data}) => {
                    if(!isLoading) {
                        if(statusCode === 200) {
                            return (
                                <>
                                {data.map((rowData, index) => 
                                <tr key={index}> 
                                    <td>{rowData['amount']}</td>
                                    <td>{(new Date(rowData['date'])).toString()}</td>
                                    <td>{rowData['mode']}</td> 
                                    <td>{rowData['paymentRecord']}</td>
                                </tr>
                                )}
                            </>
                            )
                        }
                        else {
                           return <>No record found</>
                        }
                    }
                    else {
                        return <></>
                    }
                }}

                />

                }
                />
                </div>
                <div className="table-2">
                <Table head={
                    <tr>
                        <td>Amount Owing</td>
                        <td>Amount Last Paid</td>
                        <td>Date of Last Payment</td>
                        {/* <td>Settled</td>
                        <td>Date</td> */}
                        <td>Payment Record</td>
                    </tr>
                }
                body={
                   <Fetch
                   url={
                    `${config.backendUrl}${config.backendApiPath}/org/member/expected-payments?memberId=${memberId}&organizationId=${organizationId}`
                   } 
                   requestOptions={{
                       ...options
                   }}
                    render={({isLoading, statusCode, data}) => {
                        if(!isLoading) {
                            if(statusCode === 200) {
                                console.log(data)
                                return (
                                    <>
                                        {data.map((rowData, index) => 
                                            <tr key={index}>
                                                <td>{rowData.amountOwing}</td>
                                                <td>{rowData.amountLastPaid}</td>
                                                <td>{rowData.dateOfLastPayment? (new Date(rowData.dateOfLastPayment)).toString() : ""}</td>
                                                {/* <td>{`${rowData.settled}`}</td>
                                                <td>{rowData['dateSettled']? (new Date(rowData['dateSettled'])).toString() : "Not recorded"}</td> */}
                                                <td>{rowData.paymentRecord}</td>
                                            </tr>
                                        )}
                                    </>
                                )
                            }
                            else {
                                return<>No data found!</>
                            }
                        }
                        else {
                            return <></>
                        }
                    }}
                   />
                }
                />
                </div>
            </div>
        </div>
    
        </div>
   </WorkSpaceContainer>
)
}

export default MemberDetail;