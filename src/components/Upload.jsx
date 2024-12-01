import { useState } from "react";
import axios from "axios";

const Upload = () => {
    const [fileName, setFileName] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            if (selectedFile.type === "application/pdf") {
                setFileName(selectedFile.name);
                await uploadFile(selectedFile); // Automatically upload the file
            } else {
                alert("Only PDF files are allowed.");
                event.target.value = ""; // Reset the file input
                setFileName("");
            }
        }
    };

    const uploadFile = async (file) => {
        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                "https://services.techjivaaindia.in/commonutils/get_file",
                formData
            );
            alert("File uploaded successfully!");
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("File upload failed.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="bg-orange-300 w-full p-6 flex justify-center items-center">
            <div className="border-8 p-6 rounded-2xl bg-white border-transparent">
                <div
                    className="px-52 py-16 flex flex-col justify-center items-center cursor-pointer text-center border-2 rounded-xl border-dashed"
                >
                    {/* Hidden file input */}
                    <input
                        type="file"
                        className="hidden"
                        accept="application/pdf"
                        id="fileInput"
                        onChange={handleFileChange}
                    />
                    {/* Clickable area */}
                    <label htmlFor="fileInput">
                        <img
                            src="https://www.chatpdf.com/_next/static/media/UploadFileIcon.d8bf32b8.svg"
                            alt="Upload Icon"
                            className="h-20 w-16 cursor-pointer"
                        />
                    </label>
                    <div>
                        <span>Click to upload, or drag PDF here</span>
                    </div>
                    {/* Upload button */}
                    <div className="my-5">
                        <label htmlFor="fileInput" className="cursor-pointer">
                            <button className="cursor-pointer overflow-hidden items-center bg-sky-400 inline-flex justify-center text-white flex-row h-12 rounded-lg">
                                <span className="flex px-6 items-center">
                                    <img
                                        src="https://www.chatpdf.com/_next/static/media/UploadArrowIcon.d1849693.svg"
                                        alt="Upload Icon"
                                        className="text-transparent"
                                    />
                                    <span className="mx-6">Upload PDF</span>
                                </span>
                            </button>
                        </label>
                    </div>
                    {/* Display selected file name */}
                    {fileName && (
                        <p className="text-green-600 mt-2">Selected file: {fileName}</p>
                    )}
                    {/* Uploading indicator */}
                    {isUploading && (
                        <p className="text-blue-500 mt-2">Uploading file...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Upload;
