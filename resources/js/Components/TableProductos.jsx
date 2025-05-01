import React, { useState, useEffect, useCallback } from 'react';

const TableProductos = ({
    productos, menuProductos, submitAction
}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9); // Cambiado de 10 a 9
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        const filtered = productos.filter(producto => {
            const isNotInMenu = !menuProductos.some(item => item.id === producto.id);

            if (searchTerm) {
                const searchTermLower = searchTerm.toLowerCase();
                return isNotInMenu && [
                    producto.nombre.toLowerCase(),
                    producto.descripcion?.toLowerCase(),
                    producto.categoria?.nombre.toLowerCase()
                ].some(text => text?.includes(searchTermLower));
            }

            return isNotInMenu;
        });
        setFilteredProducts(filtered);
        setCurrentPage(1);
    }, [searchTerm, productos, menuProductos]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {
        document.getElementById('search-product-input')?.focus();
    }, []);

    return (
        <div className="p-2">
            <div className="m-4">
                <input
                    id="search-product-input"
                    type="text"
                    placeholder="Buscar productos..."
                    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    aria-label="Buscar productos"
                />
            </div>

            <div className="mb-4 max-h-96 overflow-y-auto">
                {currentProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentProducts.map((producto) => (
                            <form
                                key={`product-form-${producto.id}`}
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    submitAction(producto);
                                }}
                                className="contents"
                            >
                                <div
                                    role="button"
                                    tabIndex="0"
                                    aria-label={`Agregar ${producto.nombre}`}
                                    className={`p-4 border rounded-md cursor-pointer transition-colors ${selectedProduct?.id === producto.id
                                        ? 'bg-blue-100 dark:bg-blue-900 border-blue-500'
                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    <input
                                        type="hidden"
                                        name="producto_id"
                                        value={producto.id}
                                    />
                                    <h3 className="font-medium text-gray-900 dark:text-white">
                                        {producto.nombre}
                                    </h3>

                                    <div className="flex justify-between items-center mt-2">
                                        <p>
                                            Precio: <span className="text-xs px-3 py-2 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                                                {producto.precio}
                                            </span>
                                        </p>

                                        <button
                                            type="submit"
                                            className="p-1.5 mr-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 transition-colors"
                                            aria-label={`Confirmar agregar ${producto.nombre}`}
                                        >
                                            <svg
                                                className="w-5 h-5 flex-shrink-0"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                ></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        ))}
                    </div>
                ) : (
                    <p className="text-center py-4 text-gray-500 dark:text-gray-400">
                        No se encontraron productos disponibles
                    </p>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                    <nav className="inline-flex rounded-md shadow" aria-label="Paginación">
                        <button
                            onClick={() => paginate(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-l-md border border-gray-300 bg-white dark:bg-gray-700 disabled:opacity-50"
                            aria-label="Página anterior"
                        >
                            Anterior
                        </button>

                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const pageNum = calculatePageNumber(i, currentPage, totalPages);
                            return (
                                <button
                                    key={`page-${pageNum}`}
                                    onClick={() => paginate(pageNum)}
                                    className={`px-3 py-1 border-t border-b border-gray-300 ${currentPage === pageNum
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-white dark:bg-gray-700'
                                        }`}
                                    aria-label={`Ir a página ${pageNum}`}
                                    aria-current={currentPage === pageNum ? 'page' : undefined}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-r-md border border-gray-300 bg-white dark:bg-gray-700 disabled:opacity-50"
                            aria-label="Página siguiente"
                        >
                            Siguiente
                        </button>
                    </nav>
                </div>
            )}
        </div>
    );
};

function calculatePageNumber(i, currentPage, totalPages) {
    if (totalPages <= 5) return i + 1;
    if (currentPage <= 3) return i + 1;
    if (currentPage >= totalPages - 2) return totalPages - 4 + i;
    return currentPage - 2 + i;
}

export default TableProductos;