import Sidebar from "./components/Sidebar";
import Upload from "./components/Upload";
import Chat from "./components/Chat";
import Preview from "./components/Preview";

const Body = () => {
    return (
        <div className="flex h-screen w-full">
            <Sidebar />
            <Upload />
            {/*<Preview />*/}
            {/*<Chat />*/}

        </div>
    )
}

export default Body;