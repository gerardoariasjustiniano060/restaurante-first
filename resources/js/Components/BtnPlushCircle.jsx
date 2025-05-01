import React from 'react';

const BtnPlushCircle = ({
    item = {

    }, save, ...props
}) => {
    return (
        <button
            onClick={() => save(item)}
            className="p-1.5 mr-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 transition-colors"
            title="Ver detalles"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
        </button>
    );
};

export default BtnPlushCircle;