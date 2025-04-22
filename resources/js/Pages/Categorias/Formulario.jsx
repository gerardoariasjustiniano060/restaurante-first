import { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import iziToast from 'izitoast';
import sweetAlert from 'sweetalert2'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Formulario({ categoria = {} , isEdit }) {
    const { data, post, get, processing, reset, errors, setData, setError } = useForm({
        id : categoria?.id || null,
        nombre : categoria?.nombre|| ''
    });

    const cancel = () => {
        get(route('categorias.index'), {  }, { preserveState: true, replace: true });
    }

    const submit = (e) => {
        e.preventDefault();

        const routeName = isEdit ? 'categoria.update' : 'categoria.store';
        const method = isEdit ? put : post;

        method(route(routeName, data.id), {
            onSuccess: () => {
                sweetAlert.fire({
                    title: 'Éxito',
                    text : isEdit ? 'Categoría actualizada' : 'Categoría creada',
                    timer : 2000,
                    showConfirmButton: false, // Esta línea oculta el botón OK
                    timerProgressBar: true // Opcional: muestra una barra de progreso
                });
            },
            onError: (errors) => {
                sweetAlert.fire({
                    title: 'Error',
                    text : 'Por favor corrige los errores',
                    timer : 2000,
                    showConfirmButton : false
                });
            }
        });
    }

    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Categorías
                    </h2>
                }
            >

            <Head title="Categorías" />

                <div className="pt-6">
                    <div className="w-full mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                                    {isEdit ? 'Editar Categoría' : 'Crear Nueva Categoría'}
                                </h2>

                                <form onSubmit={submit} className="space-y-4">
                                    <div>
                                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Nombre de la categoría
                                        </label>
                                        <input
                                            id="nombre"
                                            type="text"
                                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out ${errors.nombre
                                                ? 'border-red-500 dark:border-red-500'
                                                : 'border-gray-300 dark:border-gray-700'
                                                } bg-white dark:bg-gray-800 dark:text-white`}
                                            value={data.nombre}
                                            onChange={(e) => setData('nombre',e.target.value)}
                                            placeholder="Ej. Electrónica, Ropa, etc."
                                        />
                                        {errors.nombre && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.nombre}</p>
                                        )}
                                    </div>

                                    <div className="flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            onClick={cancel}
                                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            disabled={processing}
                                            type="submit"
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
