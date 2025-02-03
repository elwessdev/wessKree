import { MdFireplace, MdOutlineYard, MdOutlineKitchen, MdBalcony } from "react-icons/md";
import { GiHomeGarage, GiGasStove } from "react-icons/gi";
import { FaWifi, FaSwimmingPool } from "react-icons/fa";
import { BsPersonWorkspace } from "react-icons/bs";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { TbAirConditioning } from "react-icons/tb";

export const featuresList = [
    { key: "wifi", label: "Internet/WiFi", icon: <FaWifi /> },
    { key: "backyard", label: "Backyard", icon: <MdOutlineYard /> },
    { key: "workspace", label: "Workspace", icon: <BsPersonWorkspace /> },
    { key: "parking", label: "Parking", icon: <AiFillSafetyCertificate /> },
    { key: "garage", label: "Garage", icon: <GiHomeGarage /> },
    { key: "airConditioner", label: "Air Conditioner", icon: <TbAirConditioning /> },
    { key: "swimmingPool", label: "Swimming Pool", icon: <FaSwimmingPool /> },
    { key: "refrigerator", label: "Refrigerator", icon: <MdOutlineKitchen /> },
    { key: "heating", label: "Heating", icon: <MdFireplace /> },
    { key: "stove", label: "Stove", icon: <GiGasStove /> },
    { key: "balcony", label: "Balcony", icon: <MdBalcony /> },
];