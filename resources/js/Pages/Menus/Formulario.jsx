import { useState, useEffect } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Swal from 'sweetalert2';
import ModalMenuProductoFormulario from './Components/ModalMenuProductoFormulario';
import ModalEditProductoPrecioFormulario from './Components/ModalEditProductoPrecioFormulario';

export default function Update({ menu, productos }) {
    const { data, post, put, setData } = useForm({
        id: menu?.id || null,
        nombre: menu?.nombre || '',
        descripcion: menu?.descripcion || '',
        menu_productos: menu?.menu_productos || [],
    });

    const [showProductModal, setShowProductModal] = useState(false);
    const [showEditProductoPrecioModal, setEditProductoPrecioModal] = useState(false);
    const [menuProducto, setMenuProducto] = useState(null);

    const handleDelete = (index) => {
        Swal.fire({
            title: 'Confirmar eliminación',
            text: '¿Deseas eliminar este registro permanentemente?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedProducts = [...data.menu_productos];
                updatedProducts.splice(index, 1);
                setData('menu_productos', updatedProducts);
                const { id } = data.menu_productos[index]

                router.visit(`/menu-producto/${id}`,
                    {
                        onSuccess: () => {
                            Swal.fire('Eliminado', 'El registro fue eliminado', 'success');
                        },
                        onError: () => {
                            Swal.fire('Error', 'No se pudo eliminar', 'error');
                        },
                        method: 'delete',
                        preserveScroll: true
                    });
            }
        });
    };

    const addProducto = (producto) => {
        const productoCombos = {
            completo: 0,
            descripcion: "sin descripción",
            menu: menu.id,
            adicionable: true,
            precio: producto.precio,
            precio_combo: 0,
            producto_id: producto.id,
            producto: { ...producto },
            combos: []
        };

        setData('menu_productos', [...data.menu_productos, productoCombos]);
        setShowProductModal(false);
    };

    const handleEditProduct = (index, menuProducto) => {
        // Implementa la lógica de edición aquí
        console.log("editar menuProducto", menuProducto);
        setMenuProducto({...menuProducto});
        setEditProductoPrecioModal(true);
    };

    const submitMenuUpdate = (e) => {
        e.preventDefault();
        put(route('menu.update', data.id), {
            onSuccess: () => {
                Swal.fire({
                    title: 'Éxito',
                    text: 'Menú actualizado correctamente',
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true
                });
            },
            onError: () => {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al actualizar el menú',
                    icon: 'error',
                    timer: 2000
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Editar Menú: {menu.nombre}
                </h2>
            }
        >
            <Head title={`Editar ${menu.id}`} />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                Información Básica del Menú
                            </h3>
                            <form onSubmit={submitMenuUpdate} className="mt-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        name="nombre"
                                        value={data.nombre}
                                        onChange={(e) => setData('nombre', e.target.value)}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Descripción
                                    </label>
                                    <textarea
                                        name="descripcion"
                                        value={data.descripcion}
                                        onChange={(e) => setData('descripcion', e.target.value)}
                                        rows={3}
                                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white"
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-4 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    Productos del Menú
                                </h3>
                                <button
                                    onClick={() => setShowProductModal(true)}
                                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
                                    aria-label="Agregar nuevo producto"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                    </svg>
                                    Nuevo
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Producto</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Combos</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {data.menu_productos.map((menuProducto, index) => (
                                            <tr key={`product-${menuProducto.id}-${index}`} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                                {/* Celdas de la tabla... */}

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                                {menuProducto?.producto?.nombre}
                                                            </div>
                                                            <div>
                                                                Precio :
                                                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                                                    <>{menuProducto.producto?.precio}</>
                                                                </span>
                                                            </div>
                                                            {menuProducto.combos.length > 0 && <div>
                                                                Completo :
                                                                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                                    <>{menuProducto?.precio_combo}</>
                                                                </span>
                                                            </div>}

                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm ">
                                                        {menuProducto.combos && menuProducto.combos.length === 0 && (
                                                            <div className="mb-3 p-3 border rounded-lg dark:border-gray-600">
                                                                <div className="flex items-center">
                                                                    <button
                                                                        onClick={() => handleEditProduct(index, menuProducto)}
                                                                        className="p-1.5 mr-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 transition-colors"
                                                                        aria-label="Agregar combo"
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

                                                                    <span className="text-xs px-3 py-2 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                                                        Producto Individual
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {menuProducto.combos && menuProducto.combos.map((combo, index) => (
                                                            <div key={index} className="mb-3 p-3 border rounded-lg dark:border-gray-600">
                                                                <div className="flex items-center m-1">
                                                                    <button
                                                                        onClick={() => handleEditProduct(index, menuProducto)}
                                                                        className="p-1.5 mr-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 transition-colors"

                                                                        aria-label="Editar producto"
                                                                    >
                                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                                                        </svg>
                                                                    </button>
                                                                    <div className="flex-1 flex items-center justify-between">
                                                                        <span className="font-medium text-gray-800 dark:text-gray-200">
                                                                            {combo.producto.nombre}
                                                                        </span>
                                                                        <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                                            ${menuProducto.precio}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${menuProducto.completo
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                        }`}>
                                                        {menuProducto.completo ? 'Combinado' : 'Individual'}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleEditProduct(index, menuProducto)}
                                                            className="p-1.5 mr-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 transition-colors"
                                                            aria-label="Editar producto"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(index)}
                                                            className="p-1.5 mr-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 transition-colors"
                                                            aria-label="Eliminar producto"
                                                        >
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalMenuProductoFormulario
                showProductModal={showProductModal}
                setShowProductModal={setShowProductModal}
                productos={productos}
                addProducto={addProducto}
                menu_productos={data.menu_productos}
                menu={menu}
            />

            <ModalEditProductoPrecioFormulario
                showEditProductoPrecioModal={showEditProductoPrecioModal}
                setEditProductoPrecioModal={setEditProductoPrecioModal}
                menuProducto={menuProducto}
            />

        </AuthenticatedLayout>
    );
}