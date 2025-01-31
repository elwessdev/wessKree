import Filter from "../Filter/filter"
import PropertyItem from "./property-item"
import "./properties.scss"

export default function Properties(){
    return (
        <div id="properties">
            <Filter />
            <div className="items">
                {new Array(8).fill(0).map((_,idx)=>(<PropertyItem key={idx} />))}
            </div>
        </div>
    )
}