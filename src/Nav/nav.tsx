import "./nav.scss"
import { TbHomeSearch } from "react-icons/tb";
import { Select } from 'antd';
import Logo from '../assets/logo.jpeg'

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

export default function Nav(){
    return(
        <div id="nav" className="container mx-auto">
            <div className="l-s">
                <div className="logo">
                    <img src={Logo} alt="KreeTN" />
                </div>
            </div>
            <div className="c-s">
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
                                options={options}
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
                                options={options}
                            />
                        </div>
                    </div>
                    <button>
                        <TbHomeSearch />
                    </button>
                </div>
            </div>
            <div className="r-s">
                <div className="btns">
                    <a>Login</a>
                    <a>Sign up</a>
                </div>
            </div>
        </div>
    )
}