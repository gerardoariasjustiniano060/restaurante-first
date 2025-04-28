import { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { pedidos } from '@/Database/pedidos';
import Badge from '@/Components/Badge';

const ModalPedido = ({ isOpen, onClose, pedido }) => {
    if (!isOpen || !pedido) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
                </div>

                <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
                    <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 mb-4">
                                    Detalles del Pedido #{pedido.id}
                                </h3>

                                <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Información del Cliente</h4>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-semibold">Nombre:</span> {pedido.cliente.nombre}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-semibold">Teléfono:</span> {pedido.cliente.telefono}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Información del Pedido</h4>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-semibold">Estado:</span>
                                            <span className={`ml-2 px-2 py-1 text-xs rounded-full ${pedido.estado === 'completado'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : pedido.estado === 'pendiente'
                                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                }`}>
                                                {pedido.estado}
                                            </span>
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-semibold">Total:</span> ${pedido.monto_total}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-semibold">Atendido por:</span> {pedido.usuario.name}
                                        </p>
                                    </div>

                                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Información de Caja</h4>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-semibold">Monto inicial:</span> ${pedido.caja.monto_inicial}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-semibold">Monto total:</span> ${pedido.caja.monto_total}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-semibold">Fecha:</span> {pedido.caja.fecha}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-semibold">Descripción:</span> {pedido.caja.descripcion}
                                        </p>
                                    </div>
                                </div>

                                <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-4">Productos del Pedido ({pedido.menu_pedidos.length})</h4>

                                <div className="space-y-4">
                                    {pedido.menu_pedidos?.map((item) => (
                                        <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                                            <div className="flex justify-between items-start">
                                                <div className="w-2/3">
                                                    <h5 className="font-semibold text-gray-800 dark:text-white">
                                                        {item.menu_producto?.producto?.nombre || 'Producto no disponible'}
                                                        <span className="ml-2 text-sm font-normal text-gray-600 dark:text-gray-300">
                                                            (x{item.cantidad}) - ${parseFloat(item.monto_total).toFixed(2)}
                                                        </span>
                                                    </h5>

                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                        <span className="font-semibold">Descripción:</span> {item.menu_producto?.descripcion || 'Sin descripción'}
                                                    </p>

                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        <span className="font-semibold">Precio unitario:</span> ${item.menu_producto?.precio || '0.00'}
                                                    </p>

                                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                                        <span className="font-semibold">Precio combo:</span> ${item.menu_producto?.precio_combo || '0.00'}
                                                    </p>

                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        <span className={`px-2 py-1 text-xs rounded-full ${item.menu_producto?.completo
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                            }`}>
                                                            {item.menu_producto?.completo ? 'Completo' : 'Individual'}
                                                        </span>

                                                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                                            {item.menu_producto?.producto?.categoria?.nombre || 'Sin categoría'}
                                                        </span>

                                                        <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                                                            {item.menu_producto?.producto?.disponible ? 'Disponible' : 'No disponible'}
                                                        </span>
                                                    </div>

                                                    {/* Sección de combos */}
                                                    {item.menu_producto?.combos?.length > 0 && (
                                                        <div className="mt-3 border-t pt-2 border-gray-200 dark:border-gray-700">
                                                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Incluye:</p>
                                                            <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
                                                                {item.menu_producto.combos.map((combo, index) => (
                                                                    <li key={index}>
                                                                        {combo.cantidad}x {combo.producto?.nombre}
                                                                        <span className="text-xs ml-2">(${combo.producto?.precio})</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="w-1/3 text-right">
                                                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                        ${parseFloat(item.monto_total).toFixed(2)}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        ${parseFloat(item.menu_producto?.precio || 0).toFixed(2)} c/u
                                                    </p>

                                                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                                                        <p>Del menú: {item.menu_producto?.menu?.nombre || 'N/A'}</p>
                                                        <p>Fecha menú: {item.menu_producto?.menu?.fecha || 'N/A'}</p>
                                                        <p>{item.menu_producto?.menu?.actual ? 'Menú actual' : 'Menú anterior'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-gray-600 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                            onClick={onClose}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default function PedidosIndex() {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('todos');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [filteredPedidos, setFilteredPedidos] = useState([]);
    const [selectedPedido, setSelectedPedido] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        console.log(pedidos)
        setFilteredPedidos(pedidos);
    }, []);

    const openModal = (pedido) => {
        setSelectedPedido(pedido);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPedido(null);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        setCurrentPage(1);
    };

    useEffect(() => {
        const filtered = pedidos.filter(pedido => {
            const searchLower = searchTerm.toLowerCase();
            const matchesSearch = (
                pedido.cliente.nombre.toLowerCase().includes(searchLower) ||
                pedido.id.toString().includes(searchTerm) ||
                pedido.cliente.telefono.includes(searchTerm)
            );

            const matchesStatus = statusFilter === 'todos' || pedido.estado === statusFilter;

            return matchesSearch && matchesStatus;
        });
        setFilteredPedidos(filtered);
    }, [searchTerm, statusFilter]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPedidos = filteredPedidos.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredPedidos.length / itemsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const EyeIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
        </svg>
    );

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Gestión de Pedidos
                </h2>
            }
        >
            <Head title="Pedidos" />

            <div className="pt-6">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Buscar por cliente, ID o teléfono..."
                                        value={searchTerm}
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />
                                </div>

                                <div className="relative">
                                    <select
                                        className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        value={statusFilter}
                                        onChange={(e) => handleStatusFilter(e.target.value)}
                                    >
                                        <option value="todos">Todos los estados</option>
                                        <option value="pendiente">Pendientes</option>
                                        <option value="completado">Completados</option>
                                        <option value="cancelado">Cancelados</option>
                                    </select>
                                </div>

                                <div className="flex items-center justify-end">
                                    <button className=''>Adicionar</button>
                                    {/* <span className="text-sm text-gray-700 dark:text-gray-300">
                                        {filteredPedidos.length} pedidos encontrados
                                    </span> */}
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                {currentPedidos.length > 0 ? (
                                    <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                        <thead>
                                            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-left text-sm uppercase">
                                                <th className="px-6 py-4"># Pedido</th>
                                                <th className="px-6 py-4">Estado</th>
                                                <th className="px-6 py-4">Cliente</th>
                                                <th className="px-6 py-4">Monto Total</th>
                                                {/* <th className="px-6 py-4">Atendido por</th> */}
                                                <th className="px-6 py-4">Productos</th>
                                                <th className="px-6 py-4 text-center">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentPedidos.map((pedido) => (
                                                <tr key={pedido.id} className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                        #{pedido.id}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <Badge color={`${pedido.estado === 'completado' ? 'blue' : pedido.estado === 'pendiente' ? 'yellow' : 'red'}`}>
                                                            {pedido.estado}
                                                        </Badge>
                                                        {/* <span className={`px-2 py-1 text-xs rounded-full ${pedido.estado === 'completado'
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                : pedido.estado === 'pendiente'
                                                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                            }`}>

                                                        </span> */}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                        {pedido.cliente.nombre} ({pedido.cliente.telefono})
                                                    </td>
                                                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">
                                                        ${pedido.monto_total}
                                                    </td>
                                                    {/* <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                        {pedido.usuario.name}
                                                    </td> */}
                                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                                        {pedido.menu_pedidos.length}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <button
                                                            onClick={() => openModal(pedido)}
                                                            className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                                                            title="Ver detalles"
                                                        >
                                                            <EyeIcon />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="col-span-full py-10 text-center">
                                        <p className="text-gray-500 dark:text-gray-400">
                                            No se encontraron pedidos que coincidan con los filtros
                                        </p>
                                    </div>
                                )}
                            </div>


                            {filteredPedidos.length > itemsPerPage && (
                                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between">
                                    <div className="mb-4 sm:mb-0 text-sm text-gray-700 dark:text-gray-300">
                                        Mostrando {indexOfFirstItem + 1} a {Math.min(indexOfLastItem, filteredPedidos.length)} de {filteredPedidos.length} pedidos
                                    </div>
                                    <nav className="flex space-x-2">
                                        <button
                                            onClick={() => paginate(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-200 dark:bg-gray-600 cursor-not-allowed' : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'}`}
                                        >
                                            Anterior
                                        </button>

                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                                            <button
                                                key={number}
                                                onClick={() => paginate(number)}
                                                className={`px-4 py-2 rounded-md ${currentPage === number ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'}`}
                                            >
                                                {number}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => paginate(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-200 dark:bg-gray-600 cursor-not-allowed' : 'bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500'}`}
                                        >
                                            Siguiente
                                        </button>
                                    </nav>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ModalPedido
                isOpen={isModalOpen}
                onClose={closeModal}
                pedido={selectedPedido}
            />
        </AuthenticatedLayout>
    );
}