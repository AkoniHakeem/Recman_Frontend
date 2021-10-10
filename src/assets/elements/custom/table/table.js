import "./table.css"
const Table = ({head, body, footer}) => { 

    return(
        <>
        <table>
            <thead>
                {head}
            </thead>
            <tbody>
                {body}
            </tbody>
        </table>

        {
            footer ? <div className="table-footer">{footer}</div> : ""
        }
        </>
    )
}

export default Table;