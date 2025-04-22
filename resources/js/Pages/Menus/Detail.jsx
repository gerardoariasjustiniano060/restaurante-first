import { useState } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Detail({ menu = {}, productos }) {
    const { menu_productos  } = menu;

    const cancel = () => {
        router.get(route('menus.index'), {}, { preserveState: true, replace: true });
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Menú: {menu.nombre}
                </h2>
            }
        >
            <Head title={`Menú ${menu.nombre}`} />

            <div className="pt-6">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Descripción: {menu.descripcion}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Fecha: {menu.fecha}
                                </p>
                            </div>

                            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">
                                Productos del Menú
                            </h3>

                            <div className="space-y-4">
                                {menu_productos?.map((menuProducto) => (
                                    <div key={menuProducto.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                                                    {menuProducto.producto?.nombre}
                                                </h4>
                                                <p className="text-gray-600 dark:text-gray-300 mt-1">
                                                    {menuProducto.descripcion || 'Sin descripción'}
                                                </p>
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
                                                    Categoría: {menuProducto.producto?.categoria.nombre}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Sección de Combos */}
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
                                                                            Producto del combo: {combo.producto.nombre}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                                                    ${combo.precio ? parseFloat(combo.precio).toFixed(3) : '0.000'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end mt-6">
                                <button
                                    type="button"
                                    onClick={cancel}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                                >
                                    Volver al listado
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
