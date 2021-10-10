import Table from "../../../assets/elements/custom/table/table";
import useAuth from "../../../assets/hooks/useAuth";
import Fetch from "../../fetch/fetch";
import config from "../../../config"
import { useParams, useHistory } from "react-router-dom";
import "../workspace.css"

const MembersList = () => { 
    /*  authenticated user */
    const {organizationId} = useParams();
    const [, , user] = useAuth();
    const pageNumberToFectch = 1;
    const history = useHistory()
    const options = {
        method: "GET",
        "headers": {"Content-Type": "application/json", "Authorization": `bearer ${user.token}`}
    }

    const getMemberDetail = (memberId) => { 
         history.push(`/workspace/member/${organizationId}/${memberId}`);
    }

    return(
        <div className="member-list-container">
            <h1 style={{ textAlign: 'center' }}>Members List</h1>
                    <Table
        head={
            <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Group</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Date Joined</th>
            </tr>
        }
        body={ 
            <Fetch url={`${config.backendUrl}${config.backendApiPath}/org/get-members?page=${pageNumberToFectch}&organizationId=${organizationId}`} requestOptions= {{
                ...options
            }}
            
            render={({isLoading, statusCode, data }) => {
                if(!isLoading) {
                    if( [200, 201, 204].includes(statusCode)) {
                        const tableData = data?.result;
                        return (
                            <>
                                { tableData ? tableData.map((rowData, i) => 
                                (
                                <tr key={i + "_" + rowData['email']} onClick={getMemberDetail.bind(this, rowData['_id'])}>
                                    <td>{rowData['name']}</td>
                                    <td>{rowData['role']}</td>
                                    <td>{rowData['groupId']}</td>
                                    <td>{rowData['email']}</td>
                                    <td>{rowData['phone']}</td>
                                    <td>{(new Date(rowData['createdAt']).toString())}</td>
                                </tr>
                                
                                )) : <>No records found</>}
                                
                            </>
                        )
                    }
                    else { 
                        console.log(statusCode, data)
                        alert("data fetching failed ... ");
                         return (<tr></tr>)
                    }
                }
                else { return (<></>)}
            }}
            />
        }
        />
        </div>
    )
}

export default MembersList;