import { useState } from "react";
import axios from "axios";

const Upload = () => {
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            if (selectedFile.type === "application/pdf") {
                setFile(selectedFile);
                setFileName(selectedFile.name);
            } else {
                alert("Only PDF files are allowed.");
                event.target.value = ""; // Reset the file input
                setFile(null);
                setFileName("");
            }
        }
    };


    const uploadFile = async(obj) => {
        const res = await axios.post("https://services.techjivaaindia.in/commonutils/get_file",obj);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!file) {
            alert("Please select a PDF file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        fetch("/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    alert("File uploaded successfully!");
                } else {
                    alert("File upload failed.");
                }
            })
            .catch((error) => {
                console.error("Error uploading file:", error);
                alert("Error uploading file.");
            });
    };

    return (
        <div className="bg-orange-300 w-screen p-6 flex justify-center items-center">
            <form onSubmit={handleSubmit} className="space-y-4 border-4 rounded-xl border-dashed px-52 py-36">
                {/*<p className="text-lg font-bold">Upload</p>*/}
                <input
                    type="file"
                    className="block border border-gray-400 rounded"
                    accept="application/pdf"
                    onChange={handleFileChange}
                />
                {fileName && <p className="text-green-600">Selected file: {fileName}</p>}
                {/*<button*/}
                {/*    type="submit"*/}
                {/*    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"*/}
                {/*>*/}
                {/*    Upload*/}
                {/*</button>*/}
            </form>
        </div>
    );
};

export default Upload;
