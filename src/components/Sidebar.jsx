const Sidebar = () => {

    const handleOnClick = () => {
        console.log("New Chat!")
    }

    return (
        <aside className="bg-gray-200 w-64 shrink-0 p-3">
            <div className=""><img src="https://www.chatpdf.com/_next/static/media/SidebarLogo.243d2948.svg" alt="Care Simplify"/></div>
            <button className="bg-red-300 text-xl  py-1.5 border rounded-md border-transparent w-full" onClick={handleOnClick}><span className="mr-1">+</span> New Chat</button>
        </aside>
    )
}

export default Sidebar;
