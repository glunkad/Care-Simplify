import SidebarIcon from "../assets/svgs/sidebar.svg";

const Sidebar = () => {

    const handleOnClick = () => {
        const fileInput = document.getElementById("fileInput");
        if (fileInput) fileInput.click();
    };

    return (
        <aside className="bg-neutral-800 w-64 shrink-0 p-3 ">
            <div className="flex items-center justify-between">
                <img src="https://www.chatpdf.com/_next/static/media/SidebarLogo.243d2948.svg" alt="Care Simplify"/>
                <img src={SidebarIcon} alt="sidebar" className="h-8"/>
            </div>
            <button
                className="bg-green-600 text-white text-base py-2 border rounded-md border-transparent w-full hover:bg-green-800 my-7"
                onClick={handleOnClick}>
                <span className="mr-1">+</span>
                New Chat
            </button>
        </aside>
    )
}

export default Sidebar;
