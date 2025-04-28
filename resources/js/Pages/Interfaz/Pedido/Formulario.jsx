import { useState, useEffect, useContext } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { productos } from '@/Database/productos';
import { pedidos } from '@/Database/pedidos';
import { clientes } from '@/Database/clientes';
import ModalBuscarCliente from '../Pedido/ModalBuscarCliente ';

// import { Table } from "@chakra-ui/react"
import Table from 'react-bootstrap/Table';



// import { FaUser, FaUserTie } from 'react-icons/fa';

// const ClienteIcon = () => (
//     <FaUserTie className="h-5 w-5 text-gray-700 dark:text-gray-300" />
// );
// // Datos inventados para cajas y usuarios
// const cajas = [
//     { id: 1, monto_inicial: '100.00', descripcion: 'Caja principal' },
//     { id: 2, monto_inicial: '50.00', descripcion: 'Caja secundaria' }
// ];

// const usuarios = [
//     { id: 1, name: 'Lidia Sarely' }
// ];


// // Nuevo componente ModalSeleccionarProducto
// const ModalSeleccionarProducto = ({
//     isOpen,
//     onClose,
//     onSelectProducto,
//     onAgregarProducto,
//     productoSeleccionado,
//     cantidad,
//     precio,
//     completo,
//     descripcion,
//     onProductoChange
// }) => {
//     const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');
//     const [busquedaProducto, setBusquedaProducto] = useState('');

//     // Obtener categorías únicas
//     const categorias = [...new Set(productos.map(producto => producto.categoria.nombre))];

//     // Filtrar productos
//     const productosFiltrados = productos.filter(producto => {
//         const coincideCategoria = categoriaFiltro === 'Todas' || producto.categoria.nombre === categoriaFiltro;
//         const coincideBusqueda = producto.nombre.toLowerCase().includes(busquedaProducto.toLowerCase());
//         return coincideCategoria && coincideBusqueda;
//     });

//     // Agrupar por categoría
//     const productosPorCategoria = productosFiltrados.reduce((acc, producto) => {
//         const categoria = producto.categoria.nombre;
//         if (!acc[categoria]) {
//             acc[categoria] = [];
//         }
//         acc[categoria].push(producto);
//         return acc;
//     }, {});

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//             <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//                 <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//                     <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
//                 </div>

//                 <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
//                     <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
//                         <div className="sm:flex sm:items-start">
//                             <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
//                                 <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100 mb-4">
//                                     Seleccionar Producto
//                                 </h3>

//                                 {/* Filtros de productos */}
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                             Categoría
//                                         </label>
//                                         <select
//                                             value={categoriaFiltro}
//                                             onChange={(e) => setCategoriaFiltro(e.target.value)}
//                                             className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
//                                         >
//                                             <option value="Todas">Todas las categorías</option>
//                                             {categorias.map(categoria => (
//                                                 <option key={categoria} value={categoria}>
//                                                     {categoria}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
//                                             Buscar producto
//                                         </label>
//                                         <div className="relative">
//                                             <input
//                                                 type="text"
//                                                 placeholder="Nombre del producto..."
//                                                 value={busquedaProducto}
//                                                 onChange={(e) => setBusquedaProducto(e.target.value)}
//                                                 className="w-full pl-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
//                                             />
//                                             <div className="absolute left-3 top-2.5">
//                                                 <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                                                 </svg>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Cards de productos por categoría */}
//                                 <div className="max-h-[60vh] overflow-y-auto">
//                                     {Object.entries(productosPorCategoria).map(([categoria, productos]) => (
//                                         <div key={categoria} className="mb-8">
//                                             <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4 border-b pb-2">
//                                                 {categoria}
//                                             </h4>
//                                             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                                                 {productos.map(producto => (
//                                                     <div
//                                                         key={producto.id}
//                                                         onClick={() => onSelectProducto(producto)}
//                                                         className={`cursor-pointer border rounded-lg p-4 transition-all ${productoSeleccionado?.id == producto.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900' : 'border-gray-200 dark:border-gray-600 hover:border-indigo-300'}`}
//                                                     >
//                                                         <h5 className="font-medium text-gray-900 dark:text-white">
//                                                             {producto.nombre}
//                                                         </h5>
//                                                         <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//                                                             ${producto.precio || '0.00'}
//                                                         </p>
//                                                         {productoSeleccionado?.id == producto.id && (
//                                                             <div className="mt-2 flex items-center text-xs text-indigo-600 dark:text-indigo-300">
//                                                                 <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                                                                 </svg>
//                                                                 Seleccionado
//                                                             </div>
//                                                         )}
//                                                     </div>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>

//                                 {/* Formulario para agregar el producto seleccionado */}
//                                 {productoSeleccionado && (
//                                     <div className="mt-6 bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
//                                         <div className="flex justify-between items-center mb-4">
//                                             <h4 className="text-md font-medium text-blue-800 dark:text-blue-200">
//                                                 Producto seleccionado: {productoSeleccionado.nombre}
//                                             </h4>
//                                             <button
//                                                 type="button"
//                                                 onClick={() => onSelectProducto(null)}
//                                                 className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200"
//                                             >
//                                                 <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                                 </svg>
//                                             </button>
//                                         </div>

//                                         <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                                             <div>
//                                                 <label className="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
//                                                     Cantidad
//                                                 </label>
//                                                 <input
//                                                     type="number"
//                                                     name="cantidad"
//                                                     min="1"
//                                                     value={cantidad}
//                                                     onChange={onProductoChange}
//                                                     className="w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-blue-800 dark:border-blue-700 dark:text-white"
//                                                 />
//                                             </div>

//                                             <div>
//                                                 <label className="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
//                                                     Precio unitario
//                                                 </label>
//                                                 <input
//                                                     type="text"
//                                                     name="precio"
//                                                     value={precio}
//                                                     onChange={onProductoChange}
//                                                     className="w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-blue-800 dark:border-blue-700 dark:text-white"
//                                                 />
//                                             </div>

//                                             <div className="flex items-end">
//                                                 <label className="flex items-center">
//                                                     <input
//                                                         type="checkbox"
//                                                         name="completo"
//                                                         checked={completo}
//                                                         onChange={onProductoChange}
//                                                         className="rounded border-blue-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-blue-800 dark:border-blue-700"
//                                                     />
//                                                     <span className="ml-2 text-sm text-blue-700 dark:text-blue-300">Completo</span>
//                                                 </label>
//                                             </div>

//                                             <div className="flex items-end">
//                                                 <button
//                                                     type="button"
//                                                     onClick={onAgregarProducto}
//                                                     className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                                                 >
//                                                     Agregar al pedido
//                                                 </button>
//                                             </div>
//                                         </div>

//                                         <div className="mt-4">
//                                             <label className="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
//                                                 Descripción adicional
//                                             </label>
//                                             <input
//                                                 type="text"
//                                                 name="descripcion"
//                                                 value={descripcion}
//                                                 onChange={onProductoChange}
//                                                 className="w-full rounded-md border-blue-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-blue-800 dark:border-blue-700 dark:text-white"
//                                                 placeholder="Especificaciones del producto"
//                                             />
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                     <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
//                         <button
//                             type="button"
//                             className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-gray-600 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
//                             onClick={onClose}
//                         >
//                             Cerrar
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


// // Componente principal simplificado
// export default function Formulario(props) {
//     const [formData, setFormData] = useState({
//         cliente: '',
//         estado: 'pendiente',
//         caja: '',
//         productos: [],
//         nuevoProducto: {
//             productoId: '',
//             cantidad: 1,
//             precio: '',
//             completo: false,
//             descripcion: ''
//         }
//     });

//     const [montoTotal, setMontoTotal] = useState(0);
//     const [showClienteModal, setShowClienteModal] = useState(false);
//     const [showProductoModal, setShowProductoModal] = useState(false);

//     const handleSelectCliente = (cliente) => {
//         setFormData(prev => ({
//             ...prev,
//             cliente: cliente.id
//         }));
//     };

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const handleProductoChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             nuevoProducto: {
//                 ...prev.nuevoProducto,
//                 [name]: type === 'checkbox' ? checked : value
//             }
//         }));
//     };

//     const seleccionarProducto = (producto) => {
//         setFormData(prev => ({
//             ...prev,
//             nuevoProducto: {
//                 ...prev.nuevoProducto,
//                 productoId: producto?.id || '',
//                 precio: producto?.precio || '0.00'
//             }
//         }));
//     };

//     const agregarProducto = () => {
//         if (!formData.nuevoProducto.productoId) {
//             Swal.fire('Error', 'Selecciona un producto', 'error');
//             return;
//         }

//         const productoSeleccionado = productos.find(p => p.id === parseInt(formData.nuevoProducto.productoId));

//         const nuevoItem = {
//             id: Date.now(),
//             cantidad: parseInt(formData.nuevoProducto.cantidad),
//             monto_total: (parseFloat(formData.nuevoProducto.precio) * parseInt(formData.nuevoProducto.cantidad)).toFixed(2),
//             menu_producto: {
//                 producto: productoSeleccionado,
//                 precio: formData.nuevoProducto.precio,
//                 precio_combo: (parseFloat(formData.nuevoProducto.precio) * 1.15).toFixed(2),
//                 descripcion: formData.nuevoProducto.descripcion || 'Sin descripción',
//                 completo: formData.nuevoProducto.completo,
//                 menu: {
//                     id: 1,
//                     nombre: 'Menú del día',
//                     fecha: new Date().toISOString().split('T')[0],
//                     actual: true
//                 },
//                 combos: formData.nuevoProducto.completo ? [
//                     {
//                         id: 1,
//                         descripcion: 'Combo incluido',
//                         cantidad: 1,
//                         producto: {
//                             id: 7,
//                             nombre: 'Sopa de maní',
//                             categoria: { id: 1, nombre: 'Plato secundario' },
//                             precio: '6.00'
//                         }
//                     }
//                 ] : []
//             }
//         };

//         setFormData(prev => ({
//             ...prev,
//             productos: [...prev.productos, nuevoItem],
//             nuevoProducto: {
//                 productoId: '',
//                 cantidad: 1,
//                 precio: '',
//                 completo: false,
//                 descripcion: ''
//             }
//         }));

//         const nuevoTotal = parseFloat(montoTotal) + parseFloat(nuevoItem.monto_total);
//         setMontoTotal(nuevoTotal.toFixed(2));

//         // Cerrar el modal después de agregar
//         setShowProductoModal(false);
//     };

//     const eliminarProducto = (id) => {
//         const productoAEliminar = formData.productos.find(p => p.id === id);
//         const nuevoTotal = parseFloat(montoTotal) - parseFloat(productoAEliminar.monto_total);

//         setFormData(prev => ({
//             ...prev,
//             productos: prev.productos.filter(p => p.id !== id)
//         }));

//         setMontoTotal(nuevoTotal.toFixed(2));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         if (!formData.cliente) {
//             Swal.fire('Error', 'Selecciona un cliente', 'error');
//             return;
//         }

//         if (formData.productos.length === 0) {
//             Swal.fire('Error', 'Agrega al menos un producto', 'error');
//             return;
//         }

//         const clienteSeleccionado = clientes.find(c => c.id === formData.cliente);
//         const usuarioActual = usuarios[0];
//         const cajaSeleccionada = cajas.find(c => c.id === parseInt(formData.caja));

//         const nuevoPedido = {
//             id: pedidos.length + 1,
//             estado: formData.estado,
//             monto_total: montoTotal,
//             cliente: {
//                 id: clienteSeleccionado.id,
//                 nombre: clienteSeleccionado.id,
//                 telefono: clienteSeleccionado.telefono
//             },
//             usuario: usuarioActual,
//             caja: {
//                 ...cajaSeleccionada,
//                 monto_total: (parseFloat(cajaSeleccionada.monto_inicial) + parseFloat(montoTotal)).toFixed(2),
//                 fecha: new Date().toISOString().split('T')[0],
//                 usuario: usuarioActual
//             },
//             menu_pedidos: formData.productos
//         };

//         console.log('Nuevo pedido:', nuevoPedido);

//         Swal.fire(
//             '¡Pedido creado!',
//             `Pedido #${nuevoPedido.id} ha sido registrado con éxito`,
//             'success'
//         );

//         setFormData({
//             cliente: '',
//             estado: 'pendiente',
//             caja: '',
//             productos: [],
//             nuevoProducto: {
//                 productoId: '',
//                 cantidad: 1,
//                 precio: '',
//                 completo: false,
//                 descripcion: ''
//             }
//         });
//         setMontoTotal(0);
//     };

//     // Icono de lupa con Tailwind
//     const MagnifyingGlassIcon = () => (
//         <svg className="h-5 w-5 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//         </svg>
//     );

//     return (
//         <AuthenticatedLayout
//             header={
//                 <h2 className="text-xl font-semibold leading-tight text-gray-800">
//                     Nuevo Pedido
//                 </h2>
//             }
//         >
//             <Head title="Nuevo Pedido" />

//             <ModalBuscarCliente
//                 isOpen={showClienteModal}
//                 onClose={() => setShowClienteModal(false)}
//                 onSelectCliente={handleSelectCliente}
//             />

//             <ModalSeleccionarProducto
//                 isOpen={showProductoModal}
//                 onClose={() => setShowProductoModal(false)}
//                 onSelectProducto={seleccionarProducto}
//                 onAgregarProducto={agregarProducto}
//                 productoSeleccionado={productos.find(p => p.id === parseInt(formData.nuevoProducto.productoId))}
//                 cantidad={formData.nuevoProducto.cantidad}
//                 precio={formData.nuevoProducto.precio}
//                 completo={formData.nuevoProducto.completo}
//                 descripcion={formData.nuevoProducto.descripcion}
//                 onProductoChange={handleProductoChange}
//             />

//             <div className="pt-6">
//                 <div className="w-full mx-auto sm:px-6 lg:px-8">
//                     <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
//                         <div className="p-6">
//                             <form onSubmit={handleSubmit}>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                                     {/* Información del cliente */}
//                                     <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">

//                                     </div>

//                                     {/* Información del pedido */}
//                                     <div className="bg-white-50 dark:bg-white-700 border p-2 rounded-lg">

//                                         <div className="bg-green-50 dark:bg-blue-700 border mb-2 p-4 rounded-lg">
//                                             <div className="flex gap-2">
//                                                 <select
//                                                     name="cliente"
//                                                     value={formData.cliente}
//                                                     onChange={handleChange}
//                                                     className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
//                                                     required
//                                                 >
//                                                     <option value="">Seleccionar cliente</option>
//                                                     {clientes.map(cliente => (
//                                                         <option key={cliente.id} value={cliente.id}>
//                                                             {cliente.id} - {cliente.telefono}
//                                                         </option>
//                                                     ))}
//                                                 </select>

//                                                 <button
//                                                     type="button"
//                                                     onClick={() => setShowProductoModal(true)}
//                                                     className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:hover:bg-gray-500"
//                                                 >
//                                                     <ClienteIcon />
//                                                 </button>
//                                             </div>
//                                         </div>


//                                         <div className="bg-green-50 dark:bg-blue-700 border mb-2 p-4 rounded-lg">
//                                             <div className="flex gap-2">
//                                                 <select
//                                                     name="cliente"
//                                                     value={formData.cliente}
//                                                     onChange={handleChange}
//                                                     className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
//                                                     required
//                                                 >
//                                                     <option value="">Seleccionar cliente</option>
//                                                     {clientes.map(cliente => (
//                                                         <option key={cliente.id} value={cliente.id}>
//                                                             {cliente.id} - {cliente.telefono}
//                                                         </option>
//                                                     ))}
//                                                 </select>

//                                                 <button
//                                                     type="button"
//                                                     onClick={() => setShowProductoModal(true)}

//                                                     className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:hover:bg-gray-500"
//                                                 >
//                                                     <MagnifyingGlassIcon />
//                                                 </button>
//                                             </div>
//                                         </div>



//                                         {/* <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Información del Cliente</h3> */}


//                                         <div className="bg-blue-50 dark:bg-blue-900 p-3 rounded-md border">
//                                             <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
//                                                 Total: {montoTotal}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Botón para abrir modal de productos */}


//                                 {/* Lista de productos agregados */}
//                                 {formData.productos.length > 0 && (
//                                     <div className="mb-6">
//                                         <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Productos del Pedido</h3>

//                                         <div className="overflow-x-auto">
//                                             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
//                                                 <thead className="bg-gray-50 dark:bg-gray-700">
//                                                     <tr>
//                                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Producto</th>
//                                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cantidad</th>
//                                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Precio Unitario</th>
//                                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total</th>
//                                                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
//                                                     </tr>
//                                                 </thead>
//                                                 <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
//                                                     {formData.productos.map((item) => (
//                                                         <tr key={item.id}>
//                                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
//                                                                 {item.menu_producto.producto.nombre}
//                                                                 {item.menu_producto.completo && (
//                                                                     <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
//                                                                         Completo
//                                                                     </span>
//                                                                 )}
//                                                                 <p className="text-xs text-gray-500 dark:text-gray-400">
//                                                                     {item.menu_producto.descripcion}
//                                                                 </p>
//                                                             </td>
//                                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
//                                                                 {item.cantidad}
//                                                             </td>
//                                                             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
//                                                                 ${item.menu_producto.precio}
//                                                             </td>
//                                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
//                                                                 ${item.monto_total}
//                                                             </td>
//                                                             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                                                                 <button
//                                                                     type="button"
//                                                                     onClick={() => eliminarProducto(item.id)}
//                                                                     className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
//                                                                 >
//                                                                     Eliminar
//                                                                 </button>
//                                                             </td>
//                                                         </tr>
//                                                     ))}
//                                                 </tbody>
//                                             </table>
//                                         </div>
//                                     </div>
//                                 )}

//                                 {/* Botones de acción */}
//                                 <div className="flex justify-end space-x-4">
//                                     <button
//                                         type="button"
//                                         onClick={() => {
//                                             setFormData({
//                                                 cliente: '',
//                                                 estado: 'pendiente',
//                                                 caja: '',
//                                                 productos: [],
//                                                 nuevoProducto: {
//                                                     productoId: '',
//                                                     cantidad: 1,
//                                                     precio: '',
//                                                     completo: false,
//                                                     descripcion: ''
//                                                 }
//                                             });
//                                             setMontoTotal(0);
//                                         }}
//                                         className="px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-600 dark:text-white dark:border-gray-500 dark:hover:bg-gray-500"
//                                     >
//                                         Cancelar
//                                     </button>
//                                     <button
//                                         type="submit"
//                                         className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                                     >
//                                         Guardar Pedido
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }





const items = [
    { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
    { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
    { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
    { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
    { id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
]


// import { useState } from 'react';
// import { router, usePage } from '@inertiajs/react';
// import Swal from 'sweetalert2';
// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';



export default function Index(props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Pages
                </h2>
            }
        >
            <Head title="Pages" />

            <div className="pt-6">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Contendido */}


                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td colSpan={2}>Larry the Bird</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </Table>

                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}