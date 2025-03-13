import SidebarLightIcon from "../assets/svgs/sidebar-light.svg";
import SidebarDarkIcon from "../assets/svgs/sidebar-dark.svg";

const Sidebar = ({ isOpen, toggleSidebar }) => (
    isOpen ? (
        <aside className="w-full bg-neutral-800 shrink-0 p-3 sm:w-64">
            <div className="flex items-center justify-between">
                <a href="#">
                    <img src="https://www.chatpdf.com/_next/static/media/SidebarLogo.243d2948.svg" alt="Care Simplify" />
                </a>
                <button onClick={toggleSidebar}>
                    <img src={SidebarLightIcon} alt="sidebar" className="h-8"/>
                </button>
            </div>
            <button
                className="bg-green-600 text-white text-base py-2 border rounded-md border-transparent w-full hover:bg-green-800 my-7"
                onClick={() => document.getElementById("fileInput")?.click()}
            >
                <span className="mr-1">+</span> New Chat
            </button>
        </aside>
    ) : (
        <div className="fixed top-4 left-4 w-12 md:none">
            <button onClick={toggleSidebar}>
                <img src={SidebarDarkIcon} alt="sidebar" className="h-8" />
            </button>
        </div>
    )
);

export default Sidebar;
