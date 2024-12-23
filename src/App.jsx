import Body from "./Body";
import {SharedFileProvider} from "./utils/useSharedFile";

const App = () => {
    return (
        // <h1 className="text-2xl font-bold text-blue-500">Running</h1>
        <SharedFileProvider>
            <Body/>
        </SharedFileProvider>

    );
};

export default App;

