const Sidebar = () => {

    const handleOnClick = () => {
        console.log("New Chat!")
    }

    return (
        <div className="bg-gray-200 w-2/6 h-screen px-3">
            <div className="mb-8"><img src="https://www.svgrepo.com/show/473500/zomato.svg" alt="Care Simplify"/></div>
            <button className="bg-red-300 text-xl px-0 py-3 w-full border rounded-md border-transparent" onClick={handleOnClick}><span className="mr-1">+</span> New Chat</button>
        </div>
    )
}

export default Sidebar;
