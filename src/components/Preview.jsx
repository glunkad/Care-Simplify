import { useState } from "react";

const Preview = () => {
    const [pdfUrl, setPdfUrl] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            const fileUrl = URL.createObjectURL(selectedFile);
            setPdfUrl(fileUrl);
        } else {
            alert("Please select a valid PDF file.");
        }
    };

    return (
        <div className="w-5/12 p-4 bg-green-300 flex flex-col items-center">
            {/*<input*/}
            {/*    type="file"*/}
            {/*    accept="application/pdf"*/}
            {/*    className="mb-4 border border-gray-400 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"*/}
            {/*    onChange={handleFileChange}*/}
            {/*/>*/}
            <div className="w-full max-w-4xl h-[500px] bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                {pdfUrl ? (
                    <iframe
                        src={pdfUrl}
                        title="PDF Preview"
                        className="w-full h-full rounded-lg border-none"
                    />
                ) : (
                    <p className="text-center text-gray-600 pt-20">
                        No PDF loaded
                    </p>
                )}
            </div>
        </div>
    );
};

export default Preview;
