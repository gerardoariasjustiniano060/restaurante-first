import React, { useState, useEffect, Fragment } from 'react';

export default function ModalProducto({
    showModal,
    setShowModal,
    title, ...props
}) {

    if (!showModal) return null;

    return (
        <Fragment>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-3">
                <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    {/* Encabezado del modal */}
                    <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">
                            {title}
                        </h2>
                        <button
                            onClick={() => setShowModal(false)}
                            className="text-gray-500 hover:text-gray-700 text-xl"
                            aria-label="Cerrar modal"
                        >
                            &times;
                        </button>
                    </div>

                    {/* Contenido principal */}
                    <div className="p-6 space-y-6">
                        {props.children}
                    </div>
                    <div className="sticky top-0 bg-white z-10 flex justify-between items-center border p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">
                            {/* Lista de productos combinados */}
                        </h2>
                        <div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"

                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );
}
