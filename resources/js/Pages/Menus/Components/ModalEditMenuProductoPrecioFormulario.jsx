import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { router, useForm } from '@inertiajs/react';

export default function ModalEditMenuProductoPrecioFormulario({
    showModalPrecioPlatoPrincipal,
    setModalPrecioPlatoPrincipal,
    menuProducto,
    seleccionadoProducto,
    conditionPrecio,
    updatePrecioMenu
}) {
    // Inicializamos con valores por defecto más robustos
    const { data, setData, processing, errors } = useForm({
        id: '',
        precio: '0.00',
        menu_producto : '',
        title : '',
        conditionPrecio : '',
    });
    // Efecto para cargar datos cuando cambia menuProducto o se abre el modal
    useEffect(() => {
        if (showModalPrecioPlatoPrincipal && menuProducto) {
            setData({
                id: seleccionadoProducto.id || '',
                precio: seleccionadoProducto.precio || '0.00',
                title: seleccionadoProducto.title || '',
                conditionPrecio:  conditionPrecio,
                menu_producto: {...menuProducto} ,
            });
            console.log("Datos cargados:", menuProducto);
        }
    }, [showModalPrecioPlatoPrincipal, menuProducto]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.id) {
            Swal.fire({
                title: 'Error',
                text: 'ID de producto no válido',
                icon: 'error',
                timer: 2000
            });
            return;
        }

        updatePrecioMenu({
            id : data.id,
            precio : data.precio,
            menu_producto : data.menu_producto,
            conditionPrecio : data.conditionPrecio,
            producto : data.menu_producto.producto,
            combos : data.menu_producto.combos,
        });

        setModalPrecioPlatoPrincipal(false);

        router.post(`/menu-producto/${data.id}`, {
            id : data.id,
            precio : data.precio,
            menu_producto : data.menu_producto,
            conditionPrecio : data.conditionPrecio,
            producto : data.menu_producto.producto,
            combos : data.menu_producto.combos,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                Swal.fire({
                    title: 'Éxito',
                    text: 'Precio actualizado correctamente',
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false
                });
                setModalPrecioPlatoPrincipal(false);
            },
            onError: () => {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al actualizar el precio',
                    icon: 'error',
                    timer: 2000
                });
            }
        });
    };

    if (!showModalPrecioPlatoPrincipal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-3">
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">
                        {seleccionadoProducto.title || 'Producto'}
                    </h2>
                    <button
                        onClick={() => setModalPrecioPlatoPrincipal(false)}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Cerrar modal"
                    >
                        ✕
                    </button>
                </div>
                <form onSubmit={handleSubmit} >
                    <div className="p-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Precio producto
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.precio}
                                onChange={(e) => setData('precio', e.target.value)}
                                className="w-full px-3zxx py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                required
                            />
                            {errors.precio && <p className="mt-1 text-xs text-red-600">{errors.precio}</p>}
                        </div>
                    </div>
                    <div className="sticky top-0 bg-white z-10 flex justify-between items-center border p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">
                            {/* Lista de productos combinados */}
                        </h2>
                        <div>
                            <button
                                onClick={() => setModalPrecioPlatoPrincipal(false)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"

                            >
                                Cerrar
                            </button>
                            &nbsp;

                            <button
                                disabled={processing}
                                type='submit'
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    );
}