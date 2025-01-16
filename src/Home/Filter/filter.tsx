import { Select, Slider, Button } from 'antd';
// import { useState } from 'react';
// import { TbHomeSearch } from "react-icons/tb";

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

export default function Filter(){
    // const [priceValue, setPriceValue] = useState<number>(1);
    // const handlePrice = (newAvarage: number) => {
    //     setPriceValue(newAvarage as number);
    //     console.log(newAvarage);
    // }
    return(
        <div id="properties_filter">
            <div className="p_s">
                <span className="subTitle">State</span>
                <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Search..."
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={options}
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
                    options={options}
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
                    options={options}
                />
            </div>
            <div className="p_s price">
                <span className="subTitle">Price</span>
                <Slider
                    range={{ draggableTrack: false }}
                    defaultValue={[0, 100]}
                    // onChange={handlePrice}
                    // value={typeof priceValue === 'number' ? priceValue : 0}
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
                    options={options}
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
                    options={options}
                />
            </div>
            <Button type="primary" block>
                {/* <TbHomeSearch /> */}
                Search
            </Button>
        </div>
    )
}