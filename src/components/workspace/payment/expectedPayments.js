import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams} from "react-router";
import DynamicTable from "../../../assets/elements/custom/table/simpleTable";
import WorkSpaceContainer from "../workspaceContainer";
import config from "../../../config";
import useFetchFrom from "../../../assets/hooks/useFetchFrom";
import useAuth from "../../../assets/hooks/useAuth";

const ExpectedPayments = (props) => {

    /* route params */
    const {paymentRecordName, organizationId} = useParams();

    /* authenticated user */
    const [, , user] = useAuth()

    /* handle to DynamicTable methods */
    const tableRef = useRef();

    /* non-states */
    const options = {
        method: "GET",
        "headers": {"Content-Type": "application/json", "Authorization": `bearer ${user.token}`}
    }
    /* states */
    const [expectedPayments, setExpectedPayments] = useState([]);
    const [responseCallback, setResponseCallback] = useState();
    const [requestOptions, setRequestOptions] = useState();

    /* fetch params */
    const backendFetchParams = {
        getExpectedParams: {
            fetchUrl: config.backendUrl + config.backendApiPath + `/org/get-expected-payments/${paymentRecordName}/${organizationId}`,
            responseCallback: (statusCode, responseBody) => {
                if(statusCode===200){
                    setExpectedPayments(responseBody);
                }
            },
            options: {...options}
        }
    }
    
    /* load expectedPayments */
    const [setRequestUrl] =  useFetchFrom(requestOptions, responseCallback)
    
    /* set fetch params */
    useEffect(() => {
        const params = backendFetchParams["getExpectedParams"];
        setRequestOptions(params["options"]);
        setResponseCallback(()=> params["responseCallback"]);
        setRequestUrl(params["fetchUrl"]);
    }, [])
    
    /* handle table data update */
    useLayoutEffect(()=> {
        tableRef.current.updateTableData(expectedPayments);
    }, [expectedPayments])
    return(
        <WorkSpaceContainer breadCrumbsList={[paymentRecordName]}>

            <DynamicTable ref={tableRef} ignore={["_id"]}></DynamicTable>
        </WorkSpaceContainer>
    )
}

export default ExpectedPayments;