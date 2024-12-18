import Sidebar from "./components/Sidebar";
import Upload from "./components/Upload";
import Chat from "./components/Chat";
import Preview from "./components/Preview";
import useSharedFile from "./utils/useSharedFile";

const Body = () => {
    const sharedFileHook = useSharedFile();
    const { sharedFile } = sharedFileHook;

    return (
        <div className="flex h-screen w-full">
            <Sidebar />
            {/*<Upload {...sharedFileHook} />*/}
            {sharedFile ? (
                <>
                    <Preview {...sharedFileHook} />
                    <Chat />
                </>
            ) : (
                <Upload {...sharedFileHook}/>
            )}
        </div>
    );
};

export default Body;
