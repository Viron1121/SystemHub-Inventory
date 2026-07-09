import React from "react";

export default function ChartCard({ title, children }) {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                {title}
            </h3>

            {children}
        </div>
    );
}