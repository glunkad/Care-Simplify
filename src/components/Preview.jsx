import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import useSharedFile from "../utils/useSharedFile";

const Preview = () => {
    const { sharedFile } = useSharedFile(); // Access the shared file
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const getPdfUrl = () => {
        if (sharedFile) {
            return URL.createObjectURL(sharedFile); // Convert the file to a blob URL
        }
        return null;
    };

    const pdfUrl = getPdfUrl();

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
            <div className="w-full p-4 bg-gray-100 flex flex-col items-center">
                <div className="w-full max-w-4xl h-[500px] bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                    {pdfUrl ? (
                        <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
                    ) : (
                        <p className="text-center text-gray-600 pt-20">
                            No PDF loaded. Please upload a file.
                        </p>
                    )}
                </div>
            </div>
        </Worker>
    );
};

export default Preview;
