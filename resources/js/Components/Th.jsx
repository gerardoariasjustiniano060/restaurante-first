import React from "react";

export default function Th({ children, onClick, className, ...props }) {
    return (
        <th {...props}
            className={"px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" + className}>
            {children}
        </th>
    )
}
