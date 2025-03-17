import React, { useEffect, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useSharedFile } from "../utils/useSharedFile";

const Preview = () => {
    const { sharedFile } = useSharedFile();
    const [pdfUrl, setPdfUrl] = useState(null);
    const defaultLayoutPluginInstance = defaultLayoutPlugin({ sidebarTabs: () => [] });

    useEffect(() => {
        if (sharedFile) {
            const url = URL.createObjectURL(sharedFile);
            setPdfUrl(url);
            return () => URL.revokeObjectURL(url); // Cleanup
        }
        setPdfUrl(null); // Reset if no file
    }, [sharedFile]);

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
            <div className="hidden sm:block w-3/6 h-auto bg-gray-100 overflow-hidden">
                {pdfUrl ? (
                    <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
                ) : (
                    <p className="pt-20 text-center text-gray-600">
                        No PDF loaded. Please upload a file.
                    </p>
                )}
            </div>
        </Worker>
    );
};

export default Preview;