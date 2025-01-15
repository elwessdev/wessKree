
import Filter from "./filter"
import Property from "./property"
import "./properties.scss"

export default function Properties(){
    return (
        <div id="properties">
            <Filter />
            <div className="items">
                {new Array(12).fill(0).map(()=>(<Property />))}
            </div>
        </div>
    )
}