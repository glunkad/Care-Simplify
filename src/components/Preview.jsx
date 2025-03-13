import React, { useEffect, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import { useSharedFile } from "../utils/useSharedFile";

const Preview = () => {
    const { sharedFile } = useSharedFile();
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: () => [], // Remove sidebar tabs
    });

    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        if (sharedFile) {
            const url = URL.createObjectURL(sharedFile);
            setPdfUrl(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setPdfUrl(null);
        }
    }, [sharedFile]);

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
            {/* Hide on mobile (sm:hidden) and show only on sm and larger screens */}
            <div className="hidden sm:block w-3/6 h-auto bg-gray-100 flex flex-col items-center overflow-hidden">
                {pdfUrl ? (
                    <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} />
                ) : (
                    <p className="text-center text-gray-600 pt-20">
                        No PDF loaded. Please upload a file.
                    </p>
                )}
            </div>
        </Worker>
    );
};

export default Preview;
