import { useState } from "react";
import axios from "axios";
import { useSharedFile } from "../utils/useSharedFile";
import {BASEURL} from "../utils/constants";

const Upload = () => {
    const [fileName, setFileName] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const {setSharedFile } = useSharedFile();

    const handleButtonClick = () => {
        const fileInput = document.getElementById("fileInput");
        if (fileInput) fileInput.click();
    };

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            if (selectedFile.type === "application/pdf") {
                setFileName(selectedFile.name);
                setSharedFile(selectedFile);
            } else {
                alert("Only PDF files are allowed.");
                event.target.value = ""; // Reset the file input
                setFileName("");
            }
        }
    };


    return (
        <div className="bg-gray-100 w-full p-0 flex justify-center items-center">
            <div className="border-8 p-6 rounded-2xl bg-white border-transparent shrink-0 shadow-2xl shadow-green-500">
                {/* Clickable container */}
                <label
                    htmlFor="fileInput"
                    className="px-52 py-16 flex flex-col justify-center items-center cursor-pointer text-center border-2 rounded-xl border-dashed border-green-600 hover:bg-green-100"
                >
                    {/* Hidden file input */}
                    <input
                        type="file"
                        className="hidden"
                        accept="application/pdf"
                        id="fileInput"
                        onChange={handleFileChange}
                    />
                    <img
                        src="https://www.chatpdf.com/_next/static/media/UploadFileIcon.d8bf32b8.svg"
                        alt="Upload Icon"
                        className="h-20 w-16"
                    />
                    <div>
                        <span>Click to upload, or drag PDF here</span>
                    </div>
                    {/* Upload button */}
                    <div className="my-5">
                        <button className="cursor-pointer overflow-hidden items-center bg-green-600 inline-flex justify-center text-white flex-row h-12 rounded-lg hover:bg-green-800" onClick={handleButtonClick}>
                            <span className="flex px-6 items-center">
                                <img
                                    src="https://www.chatpdf.com/_next/static/media/UploadArrowIcon.d1849693.svg"
                                    alt="Upload Icon"
                                    className="text-transparent"
                                />
                                <span className="mx-6">Upload PDF</span>
                            </span>
                        </button>
                    </div>
                    {/* Display selected file name */}
                    {/*{fileName && (*/}
                    {/*    <p className="text-green-600 mt-2">Selected file: {fileName}</p>*/}
                    {/*)}*/}
                    {/* Uploading indicator */}
                    {/*{isUploading && (*/}
                    {/*    <p className="text-blue-500 mt-2">Uploading file...</p>*/}
                    {/*)}*/}
                </label>
            </div>
        </div>
    );
};

export default Upload;
