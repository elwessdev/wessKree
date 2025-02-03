import { memo } from 'react';
import { featuresList } from "../../Data/features";

// Icons
import { IoIosCheckmarkCircle } from "react-icons/io";

// Type
type props = {
    features: string[]
}

const Features = ({features}:props) => {
    return (
        <div className="feature">
            <h3>Rental features</h3>
            <div className="items">
                {featuresList.filter(feature=>features.includes(feature.key)).map((feature,idx)=>(
                    <div key={idx} className="f">
                        <div className="icon">{feature.icon}</div>
                        <p>{feature.label}</p>
                        <div className="ok">
                            <IoIosCheckmarkCircle />
                        </div>
                    </div>
                ))}
                
            </div>
        </div>
    )
}
export default memo(Features);