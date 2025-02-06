import { Select, Slider, Button, Tooltip } from 'antd';
// import { useState } from 'react';
// import { TbHomeSearch } from "react-icons/tb";
import {StateCity} from "../../Data/stateCity.ts";
import { useImperativeHandle, useState } from 'react';

// Icons
import { RiResetRightFill } from "react-icons/ri";

// Type
type stateCityType = { value: string; label: string }[];
type filter = {
    state: string | null,
    city: string | null,
    type: string | null,
    price: number[] | number | null,
    rooms: string | null,
    category:  string | null,
}

// Functions
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export default function Filter({sRef,onClick,onReset}:any){
    //  Filter
    const [filter, setFilter] = useState<filter>({
        state: null,
        city: null,
        type: null,
        price: null,
        rooms: null,
        category: null
    })

    // Price
    const onChangeComplete = (value: number | number[]) => {
        // console.log('Price interval: ', value);
        setFilter({...filter,price:value})
    };

    // State and city
    const [delegations, setDelegations] = useState<stateCityType>([]);
    const stateOptions = StateCity.map(state => ({
        value: capitalize(state.Name),
        label: capitalize(state.Name),
    }));
    const handleStateChange = (value:string|undefined) => {
        if(!value) return;
        const state:any = StateCity.find((s) => capitalize(s.Name) === value);
        setFilter({...filter,state:capitalize(state.Name)});
        setDelegations(state ?state.Delegations.map((d) => ({ value: capitalize(d.Value), label: capitalize(d.Name) })) :[]);
    };

    // Send Filter data to parent
    useImperativeHandle(sRef,()=>({
        filter,
        setFilter
    }));

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
                    value={filter?.state}
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
                    onChange={(value)=>setFilter({...filter,city:value})}
                    options={delegations}
                    value={filter?.city}
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
                    onChange={(value)=>setFilter({...filter,type:value})}
                    value={filter?.type}
                    options={[
                        { value: 'apartment', label: 'Apartment' },
                        { value: 'house', label: 'House' },
                        { value: 'villa', label: 'Villa' },
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
                    onChange={(value)=>setFilter({...filter,rooms:value})}
                    options={[
                        { value: '1', label: 'S+1' },
                        { value: '2', label: 'S+2' },
                        { value: '3', label: 'S+3' }
                    ]}
                    value={filter?.rooms}
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
                    onChange={(value)=>setFilter({...filter,category:value})}
                    options={[
                        { value: 'student', label: 'Student' },
                        { value: 'family', label: 'Family' },
                        { value: 'anyone', label: 'Anyone' },
                    ]}
                    value={filter?.category}
                />
            </div>
            <div className='btns'>
                <Button type="primary" block onClick={onClick}>
                    {/* <TbHomeSearch /> */}
                    Search
                </Button>
                <Tooltip placement="top" title={"Reset filter"} arrow={true}>
                    <Button type="primary" className='reset' block onClick={onReset}><RiResetRightFill /></Button>
                </Tooltip>
            </div>
        </div>
    )
}