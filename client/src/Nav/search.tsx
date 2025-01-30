import { useState } from "react";
import { Select } from 'antd';
import {StateCity} from "../Data/state-municipality.ts";

// Icons
import { TbHomeSearch } from "react-icons/tb";

// Type
type selectValues = {state: string | null, city: string | null};
type stateCityType = { value: string; label: string }[];

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export default function SearchNav(){
    const [selectValues, setSelectValues] = useState<selectValues>({
        state: null,
        city: null
    });
    const [delegations, setDelegations] = useState<stateCityType>([]);
    const stateOptions = StateCity.map(state => ({
        value: capitalize(state.Name),
        label: capitalize(state.Name),
    }));

    const handleStateChange = (value: string) => {
        const state = StateCity.find((s) => capitalize(s.Name) === value);
        setSelectValues({
            state: capitalize(value),
            city: null
        });
        setDelegations(state ?state.Delegations.map((d) => ({ value: d.Value, label: capitalize(d.Name) })) :[]);
    };
    const handleCityChange = (value: string) => {
        setSelectValues({
            ...selectValues,
            city: capitalize(value)
        });
    }

    return (
        <div className="search-bar">
            <div className="slc">
                <div className="sl">
                    <span className="subTitle">State</span>
                    <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Search..."
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={stateOptions}
                        onChange={handleStateChange}
                        value={selectValues.state}
                    />
                </div>
                <div className="sl">
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
                        onChange={handleCityChange}
                        value={selectValues.city}
                    />
                </div>
            </div>
            <button>
                <TbHomeSearch />
            </button>
        </div>
    )
}