import Sidebar from "./components/Sidebar";
import Upload from "./components/Upload";
import Chat from "./components/Chat";
import Preview from "./components/Preview";
import useSharedFile from "./utils/useSharedFile";

const Body = () => {

    const sharedFileHook = useSharedFile();

    return (
        <div className="flex h-screen w-full">
            <Sidebar />
            <Upload {...sharedFileHook} />
            <Preview {...sharedFileHook} />
            <Chat />

        </div>
    )
}

export default Body;