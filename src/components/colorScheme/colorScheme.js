import "./colorScheme.css"

const ColorScheme = (props) => {

    return(
        <div className="color-scheme">
            <div title="primary" className="primary">
                <h2 className="on-Primary">On Primary</h2>
            </div>
            <div title="primary variant" className="primary-2">
                <h2 className="on-primary-2">On Primary 2</h2>
            </div>
            <div title="secondary" className="secondary">
                <h2 className="on-secondary">On Secondary</h2>
            </div >
            <div title="secondary variant" className="secondary-2">
                <h2 className="on-secondary-2">On Secondary 2</h2>
            </div>
        </div>
    )
}

export default ColorScheme