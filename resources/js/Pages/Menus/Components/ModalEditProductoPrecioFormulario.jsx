import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { router, useForm } from '@inertiajs/react';

export default function ModalEditProductoPrecioFormulario({
    showEditProductoPrecioModal,
    setEditProductoPrecioModal,
    menuProducto
}) {
    const { data, setData, put, processing, errors } = useForm({
        id: menuProducto?.id || '',
        precio: menuProducto?.precio || '',
        precio_combo: menuProducto?.precio_combo || '',
        combos: menuProducto?.combos || [],
        producto: menuProducto?.producto || {}
    });

    useEffect(() => {
        if (menuProducto) {
            setData({
                id: menuProducto.id,
                precio: menuProducto.precio,
                precio_combo: menuProducto.precio_combo,
                combos: menuProducto.combos,
                producto: menuProducto.producto
            });
        }
    }, [menuProducto]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = '/menu-producto/' + data.id;
        router.visit(url, {
            method: 'post',
            preserveScroll: true,
            data: data, onSuccess: () => {
                Swal.fire({
                    title: 'Éxito',
                    text: 'Producto agregado correctamente',
                    timer: 2000,
                    showConfirmButton: false,
                    timerProgressBar: true
                });
            }
        });
    };

    // const formatCombos = () => {
    //     if (!data.combos || data.combos.length === 0) {
    //         return <p className="text-gray-500">No hay combos asociados</p>;
    //     }

    //     return data.combos.map((combo, index) => (
    //         <div key={index} className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
    //             <div className="flex items-center mt-1">
    //                 <span className="text-sm">
    //                     {combo.producto?.nombre || 'Producto sin nombre'}
    //                 </span>
    //             </div>
    //             <div className="mt-1 text-xs text-gray-600">
    //                 <p>Precio: S/ {combo.producto.precio || '0.00'}</p>
    //             </div>
    //         </div>
    //     ));
    // };

    if (!showEditProductoPrecioModal) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-3">
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl">
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">
                        Producto {data.producto.nombre}
                    </h2>
                    <button
                        onClick={() => setEditProductoPrecioModal(false)}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Cerrar modal"
                    >
                        ✕
                    </button>
                </div>
                <div className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Precio Individual
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.precio}
                                onChange={(e) => setData('precio', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                            {errors.precio && <p className="mt-1 text-xs text-red-600">{errors.precio}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Precio en Combo
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.precio_combo}
                                onChange={(e) => setData('precio_combo', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                            {errors.precio_combo && <p className="mt-1 text-xs text-red-600">{errors.precio_combo}</p>}
                        </div>
                        {/* <div>
                            <h3 className="font-medium text-gray-800 p-2">Combos</h3>
                            {formatCombos()}
                        </div> */}
                        <div>
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50"
                            >
                                {processing ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}