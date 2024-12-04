import {useState} from "react";

const useSharedFile = () => {
    const [sharedFile, setSharedFile] = useState(null)

    const setFile = (file) => {
        setSharedFile(file)
    }

    return {sharedFile, setFile}
}

export default useSharedFile;