import { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { data_menu } from '@/Database/menu_producto';

export default function ModalProductos  ({ isOpen, onClose, menu }) {
    if (!isOpen || !menu) return null;

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
                                    Productos del menú: {menu.nombre}
                                </h3>

                                <div className="space-y-4">
                                    {menu.menu_productos?.map((menuProducto) => (
                                        <div key={menuProducto.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                                                        {menuProducto.producto?.nombre}
                                                    </h4>
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                                            menuProducto.completo
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                        }`}>
                                                            {menuProducto.completo ? 'Completo' : 'Individual'}
                                                        </span>
                                                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                                            ID: {menuProducto.producto_id}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                                                        ${parseFloat(menuProducto.precio).toFixed(3)}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        Precio Combo: ${parseFloat(menuProducto.precio_combo).toFixed(3)}
                                                    </p>
                                                </div>
                                            </div>

                                            {menuProducto.combos?.length > 0 && (
                                                <div className="mt-4 pl-4 border-l-2 border-gray-200 dark:border-gray-600">
                                                    <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                        Combos incluidos:
                                                    </h5>
                                                    <div className="space-y-3">
                                                        {menuProducto.combos.map((combo) => (
                                                            <div key={combo.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
                                                                <div className="flex justify-between">
                                                                    <div>
                                                                        {combo.producto && (
                                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                                {combo.producto.nombre} (${combo.producto.precio})
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
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