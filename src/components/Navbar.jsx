import SidebarLightIcon from "../assets/svgs/sidebar-light.svg";
import {useState} from "react";

const Navbar = () => {

    const [panel, setPanel] = useState(true);

    const handleOnClickSidebar = () => {
        setPanel(prevPanel => !prevPanel);
    };

    return (
        <div className="h-14 w-full bg-emerald-600 flex items-center gap-28 px-4">
            <a href="#" onClick={handleOnClickSidebar}>
                <img src={SidebarLightIcon} alt="sidebar" className="h-8"/>
            </a>
            <a href="#">
                <img
                    src="https://www.chatpdf.com/_next/static/media/SidebarLogo.243d2948.svg"
                    alt="Care Simplify"
                />
            </a>
        </div>
    )
}

export default Navbar;