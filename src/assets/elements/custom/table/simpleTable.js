import { forwardRef, useImperativeHandle, useState } from "react"
import "./table.css"
const SimpleTable  = forwardRef(({ignore=[]}, ref) => {
    const [tableData, setTableData] = useState([]);
    useImperativeHandle(ref,  ()=> ({
        updateTableData: (data) => {
            setTableData(data)
        }
    }))
return (
<table>
    <thead>
    <tr>
        {
            tableData[0]? Object.keys(tableData[0]).map((d, i) => {
            return (
                (
                    <>
                    {! ignore.includes(d)? <th key={`${i}_td`}>{d}</th>: <></>}
                    </>
                )
            )
            }) : <></>
        }
    </tr>
    </thead>
    <tbody>
    {
        tableData? tableData.map((d, i, A) => {
           return <tr key = {i}>
                { 
                Object.keys(d).map((_d, _i, _A) => {
                 return (
                 <>
                 {! ignore.includes(_d)? <td key={`${i}_td`}>{d[_d]}</td>: <></>}
                 </>)
            })}
            </tr>
        }) : <></>
    }
    </tbody> 
</table>
)
}) 

export default SimpleTable