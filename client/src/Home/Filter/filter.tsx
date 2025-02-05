import { Select, Slider, Button } from 'antd';
// import { useState } from 'react';
// import { TbHomeSearch } from "react-icons/tb";
import {StateCity} from "../../Data/stateCity.ts";
import { useState } from 'react';

const options = [
    {
        value: '1',
        label: 'Not Identified',
    },
    {
        value: '2',
        label: 'Closed',
    },
    {
        value: '3',
        label: 'Communicated',
    },
    {
        value: '4',
        label: 'Identified',
    },
    {
        value: '5',
        label: 'Resolved',
    },
    {
        value: '6',
        label: 'Cancelled',
    },
    {
        value: '6',
        label: 'Cancelled',
    },
]

type stateCityType = { value: string; label: string }[];

// Functions
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export default function Filter(){
    const [priveInterval, setPriceInterval]=useState<number | number[]>([]);
    const onChangeComplete = (value: number | number[]) => {
        console.log('Price interval: ', value);
        setPriceInterval(value);
    };

    const [delegations, setDelegations] = useState<stateCityType>([]);
    const stateOptions = StateCity.map(state => ({
        value: capitalize(state.Name),
        label: capitalize(state.Name),
    }));
    const handleStateChange = (value:string|undefined) => {
        if(!value) return;
        const state = StateCity.find((s) => capitalize(s.Name) === value);
        setDelegations(state ?state.Delegations.map((d) => ({ value: capitalize(d.Value), label: capitalize(d.Name) })) :[]);
    };
    return(
        <div id="properties_filter">
            <div className="p_s">
                <span className="subTitle">State</span>
                <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Search..."
                    optionFilterProp="label"
                    onChange={handleStateChange}
                    filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={stateOptions}
                />
            </div>
            <div className="p_s">
                <span className="subTitle">City</span>
                <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Search..."
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={delegations}
                />
            </div>
            <div className="p_s">
                <span className="subTitle">Property Type</span>
                <Select
                    style={{ width: "100%" }}
                    placeholder="Select..."
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                        { value: 'Apartment', label: 'Apartment' },
                        { value: 'House', label: 'House' },
                        { value: 'Villa', label: 'Villa' },
                    ]}
                />
            </div>
            <div className="p_s price">
                <span className="subTitle">Price</span>
                <Slider
                    range={{ draggableTrack: false }}
                    defaultValue={[0, 10000]}
                    // onChange={onChange}
                    onChangeComplete={onChangeComplete}
                />
            </div>
            <div className="p_s">
                <span className="subTitle">Rooms</span>
                <Select
                    style={{ width: "100%" }}
                    placeholder="Select..."
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                        { value: '1', label: 'S+1' },
                        { value: '2', label: 'S+2' },
                        { value: '3', label: 'S+3' }
                    ]}
                />
            </div>
            <div className="p_s last">
                <span className="subTitle">Category</span>
                <Select
                    style={{ width: "100%" }}
                    placeholder="Select..."
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={[
                        { value: 'student', label: 'Student' },
                        { value: 'Family', label: 'Family' },
                        { value: 'anyone', label: 'Anyone' },
                    ]}
                />
            </div>
            <Button type="primary" block>
                {/* <TbHomeSearch /> */}
                Search
            </Button>
        </div>
    )
}