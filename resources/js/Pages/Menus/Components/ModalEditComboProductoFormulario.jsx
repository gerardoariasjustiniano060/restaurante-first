import React, { useState, useEffect, Fragment } from 'react';
import Swal from 'sweetalert2';
import { router, useForm } from '@inertiajs/react';
import ModalAdicionComboProductoFormulario from './ModalAdicionComboProductoFormulario';
import ModalEditMenuProductoPrecioFormulario from './ModalEditMenuProductoPrecioFormulario';

export default function ModalEditComboProductoFormulario({
    updatePrecioMenuProducto,
    showEditComboProductoModal,
    setEditComboProductoModal,
    addComboProducto,
    menuProductos,
    menuProducto,
    productos,
    menu,
}) {
    const { data, setData } = useForm({
        id: menuProducto?.id || '',
        precio: menuProducto?.precio || '',
        precio_combo: menuProducto?.precio_combo || '',
        combos: (menuProducto?.combos || []).map(combo => ({
            ...combo,
            id: combo.id || `temp-${Math.random().toString(36).substr(2, 9)}`
        })),
        producto: menuProducto?.producto || {},
    });

    const [showMenuProductoComboModal, setMenuProductoComboModal] = useState(false);

    const addProductoCombo = (producto, menuProducto) => {
        const newCombo = {
            id: `temp-${Date.now()}`,
            cantidad: 1,
            descripcion: "sin descripcion",
            menu_producto: menuProducto.id,
            producto_id: producto.id,
            producto: { ...producto },
        };
        setData('combos', [...data.combos, newCombo]);
        addComboProducto(producto, menuProducto);
    };

    const [showModalPrecioPlatoPrincipal, setModalPrecioPlatoPrincipal] = useState(false);
    const [conditionPrecio, setConditionPrecio] = useState(null);
    const [objectoSeleccionado, setObjectoSeleccionado] = useState({});

    const removeCombo = (comboId) => {
        setData('combos', data.combos.filter(combo => combo.id !== comboId));
    };

    const showEditingPrecio = (condition, objecto) => {
        setConditionPrecio(condition);
        setObjectoSeleccionado(objecto);
        setModalPrecioPlatoPrincipal(true);
    }

    // Para el frontend
    const updatePrecioMenu = (objecto) => {
        const { conditionPrecio, id, menu_producto, precio, producto } = objecto;

        updatePrecioMenuProducto(objecto);

        if (conditionPrecio === 'precio_producto_principal') {
            setData('precio', precio);
        }
        //     updatePrecioMenuProducto({
        //         menu_producto: menu_producto,
        //         precio: precio,
        //         id: id,
        //         conditionPrecio: conditionPrecio,
        //     }); // para el backend
        // }
        if (conditionPrecio === 'precio_producto_combo') {
            setData('combos', data.combos.map(item =>
                item.id === id
                    ? {
                        ...item,
                        producto: {
                            ...item.producto,
                            precio: precio
                        }
                    }
                    : item
            ));

            //     updatePrecioMenuProducto({
            //         menu_producto: menu_producto,
            //         precio: precio,
            //         id: id,
            //         conditionPrecio: conditionPrecio,
            //     }); // para el backend

        }

        if (conditionPrecio === 'precio_producto_total') {
            setData('precio_combo', precio);

            //     updatePrecioMenuProducto({
            //         menu_producto: menu_producto,
            //         precio: precio,
            //         id: id,
            //         conditionPrecio: conditionPrecio,
            //     }); // para el backend
        }
    }

    useEffect(() => {
        if (menuProducto) {
            setData({
                id: menuProducto.id,
                precio: menuProducto.precio,
                precio_combo: menuProducto.precio_combo,
                combos: (menuProducto.combos || []).map(combo => ({
                    ...combo,
                    id: combo.id || `temp-${Math.random().toString(36).substr(2, 9)}`
                })),
                producto: menuProducto.producto
            });
        }
    }, [menuProducto]);

    if (!showEditComboProductoModal) return null;

    return (
        <Fragment>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-3">
                <div className="relative bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                    {/* Encabezado del modal */}
                    <div className="sticky top-0 bg-white z-10 flex justify-between items-center p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Lista de productos combinados
                        </h2>
                        <button
                            onClick={() => setEditComboProductoModal(false)}
                            className="text-gray-500 hover:text-gray-700 text-xl"
                            aria-label="Cerrar modal"
                        >
                            &times;
                        </button>
                    </div>

                    {/* Contenido principal */}
                    <div className="p-6 space-y-6">
                        {/* Plato principal */}
                        <div key={`main-${data.id}`} className="border border-gray-200 rounded-lg shadow-sm">
                            <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4">
                                    <div className="mb-3 sm:mb-0">
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            Plato Principal : {data.producto.nombre}</h3>
                                        <p className="text-sm text-gray-600">Precio:
                                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                                {data.precio}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => showEditingPrecio('precio_producto_principal', {
                                                id: data.id,
                                                precio: data.precio,
                                                title: "Plato " + data.producto.nombre
                                            })}
                                            className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => setMenuProductoComboModal(true)}
                                            className="p-1.5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors flex items-center justify-center w-8 h-8"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lista de combos */}
                        {data.combos.map((combo) => (
                            <div key={`combo-${combo.id}`} className="border border-gray-200 rounded-lg shadow-sm">
                                <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4">
                                        <div className="mb-3 sm:mb-0">
                                            <h3 className="text-lg font-semibold text-gray-800">{combo.producto.nombre}</h3>
                                            <p className="text-sm text-gray-600">Precio:
                                                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                                                    {combo.producto?.precio}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => showEditingPrecio('precio_producto_combo', {
                                                    id: combo.id,
                                                    title: "" + combo.producto.nombre,
                                                    precio: combo.producto?.precio
                                                })}
                                                className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => removeCombo(combo.id)}
                                                className="p-1.5 rounded-full bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Precio total */}
                        {menuProducto.combos.length > 0 &&
                            <div key={`total-${data.id}`} className="border items-center border-gray-200 rounded-lg shadow-sm">
                                <div className="w-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3">
                                        <div className="mb-1 sm:mb-0">
                                            {/* <h3 className="text-lg font-semibold text-gray-800">Precio Total del Combo</h3> */}
                                            <p className="text-sm text-gray-600">Precio  Total:
                                                <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                                                    {data.precio_combo}
                                                </span>
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => showEditingPrecio('precio_producto_total', {
                                                    id: data.id,
                                                    title: "Precio principal del combo",
                                                    precio: data.precio_combo,
                                                })}
                                                className="p-1.5 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>


                    <div className="sticky top-0 bg-white z-10 flex justify-between items-center border p-4 border-b border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-800">
                            {/* Lista de productos combinados */}
                        </h2>
                        <div>

                            {/* <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"

                            >
                                Guardar
                            </button> */}
                            &nbsp;
                            <button
                                onClick={() => setEditComboProductoModal(false)}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"

                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <ModalEditMenuProductoPrecioFormulario
                showModalPrecioPlatoPrincipal={showModalPrecioPlatoPrincipal}
                setModalPrecioPlatoPrincipal={setModalPrecioPlatoPrincipal}
                menuProducto={menuProducto}
                seleccionadoProducto={objectoSeleccionado}
                conditionPrecio={conditionPrecio}
                updatePrecioMenu={updatePrecioMenu}
            />

            {/* Modal para añadir combos */}
            <ModalAdicionComboProductoFormulario
                productos={productos}
                showMenuProductoComboModal={showMenuProductoComboModal}
                setMenuProductoComboModal={setMenuProductoComboModal}
                menuProducto={menuProducto}
                addProductoCombo={addProductoCombo}
                menuProductos={menuProductos}
                menu={menu}
            />
        </Fragment>
    );
}