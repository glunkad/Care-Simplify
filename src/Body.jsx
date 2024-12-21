import Sidebar from "./components/Sidebar";
import Upload from "./components/Upload";
import Chat from "./components/Chat";
import Preview from "./components/Preview";
import useSharedFile from "./utils/useSharedFile";

const Body = () => {
    const { sharedFile } = useSharedFile();

    return (
        <div className="flex h-screen w-full">
            <Sidebar />
            {!sharedFile ? (
                <>
                    <Preview />
                    <Chat />
                </>
            ) : (
                <Upload />
            )}
        </div>
    );
};

export default Body;
