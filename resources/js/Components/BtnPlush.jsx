import React from 'react';

const BtnPlush = ({
    onClick,...props
}) => {
    return (
        <button
            onClick={() => onClick()}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
            aria-label="Agregar"
        >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Nuevo
        </button>
    );
};

export default BtnPlush;