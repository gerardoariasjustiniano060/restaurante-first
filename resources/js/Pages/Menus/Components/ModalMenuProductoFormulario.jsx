import { useState, useEffect } from 'react';
import Modal from '@/Components/Modal';
import Swal from 'sweetalert2';

export default function ModalMenuProductoFormulario({ productos,addProducto ,showProductModal, setShowProductModal, menu_productos }) {
    // Estados para paginación y búsqueda
    console.log('productos',productos);
    console.log('menu_productos',menu_productos)
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Productos por página
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const filtered = productos.filter(producto => {
            // Verificar si el producto NO está en menu_productos
            const isNotInMenu = !menu_productos.some(item => item.producto_id === producto.id);

            // Si hay término de búsqueda, aplicar ambos filtros
            if (searchTerm) {
                const searchTermLower = searchTerm.toLowerCase();
                return isNotInMenu && [
                    producto.nombre.toLowerCase(),
                    producto.descripcion?.toLowerCase(),
                    producto.categoria?.nombre.toLowerCase()
                ].some(text => text?.includes(searchTermLower));
            }

            // Si no hay término de búsqueda, solo filtrar por no estar en menu
            return isNotInMenu;
        });

        setFilteredProducts(filtered);
        setCurrentPage(1); // Resetear a la primera página al buscar
    }, [searchTerm, productos, menu_productos]); // Añadir menu_productos a las dependencias

    // Calcular productos para la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // Cambiar página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Seleccionar producto
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <Modal show={showProductModal} onClose={() => setShowProductModal(false)} maxWidth="5xl">
            <div className="p-6">
                <div className="flex justify-between w-full items-center mb-4">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                        Lista de productos
                    </h2>
                </div>

                {/* Barra de búsqueda */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Lista de productos */}
                <div className="mb-4 max-h-96 overflow-y-auto">
                    {currentProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {currentProducts.map((producto) => (
                                <div
                                    key={producto.id}
                                    onClick={() => addProducto(producto)}
                                    className={`p-4 border rounded-md cursor-pointer transition-colors ${
                                        selectedProduct?.id === producto.id
                                            ? 'bg-blue-100 dark:bg-blue-900 border-blue-500'
                                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    <h3 className="font-medium text-gray-900 dark:text-white">
                                        {producto.nombre}
                                    </h3>
                                    {/* <p className="text-sm text-gray-600 dark:text-gray-300">
                                        {producto.descripcion || 'Sin descripción'}
                                    </p> */}
                                    <p className="text-sm font-semibold mt-2">
                                        Precio: {producto.precio}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center py-4 text-gray-500 dark:text-gray-400">
                            No se encontraron productos
                        </p>
                    )}
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-4">
                        <nav className="inline-flex rounded-md shadow">
                            <button
                                onClick={() => paginate(Math.max(1, currentPage - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-1 rounded-l-md border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50"
                            >
                                Anterior
                            </button>

                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (currentPage >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = currentPage - 2 + i;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => paginate(pageNum)}
                                        className={`px-3 py-1 border-t border-b border-gray-300 ${
                                            currentPage === pageNum
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 rounded-r-md border border-gray-300 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white disabled:opacity-50"
                            >
                                Siguiente
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </Modal>
    );
}
