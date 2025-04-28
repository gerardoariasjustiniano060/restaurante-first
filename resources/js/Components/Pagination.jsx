import React from 'react';
import { Head, router, usePage } from '@inertiajs/react';


const Pagination = ({
    data, ...props
}) => {

    // Función para navegar a la página anterior
    const goToPreviousPage = () => {
        if (data.current_page > 1) {
            router.visit(data.prev_page_url, { preserveScroll: true });
        }
    };

    // Función para navegar a la página siguiente
    const goToNextPage = () => {
        if (data.current_page < data.last_page) {
            router.visit(data.next_page_url, { preserveScroll: true });
        }
    };

    return (
        <div className="pt-6">
            <div className="w-full mx-auto sm:px-6 lg:px-8">
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                            Mostrando página <strong>{data.current_page}</strong> de <strong>{data.last_page}</strong>
                        </span>

                        <div className="flex items-center gap-2">
                            {/* Botón Anterior */}
                            <button
                                onClick={goToPreviousPage}
                                disabled={!data.prev_page_url}
                                className={`p-2 rounded-full ${!data.prev_page_url
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50'}
                                transition-colors`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>

                            {/* Números de página */}
                            <div className="flex gap-1">
                                {data.links.slice(1, -1).map((link, i) => (
                                    <button
                                        key={i}
                                        onClick={() => link.url && router.visit(link.url, { preserveScroll: true })}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm
                                        ${link.active
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}
                                        transition-colors`}
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </div>

                            {/* Botón Siguiente */}
                            <button
                                onClick={goToNextPage}
                                disabled={!data.next_page_url}
                                className={`p-2 rounded-full ${!data.next_page_url
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
                                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50'}
                                transition-colors`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default Pagination;