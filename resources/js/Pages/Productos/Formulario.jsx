import { useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import iziToast from 'izitoast';
import sweetAlert from 'sweetalert2'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from '@/Components/Form';
import InputForm from '@/Components/InputForm';
import Select from '@/Components/Select';

export default function Formulario({ producto = {}, isEdit, categorias }) {
    const { data, post, processing, errors, setData } = useForm({
        id: producto?.id || null,
        nombre: producto?.nombre || '',
        precio: producto?.precio || '',
        categoria_id: producto?.categoria_id || ''
    });

    const cancel = () => {
        router.visit(route('productos.index'), {
            preserveState: true,
            replace: true
        })
    }

    const submit = (e) => {
        e.preventDefault();

        const routeName = isEdit ? 'producto.update' : 'producto.store';
        const method = isEdit ? put : post;

        method(route(routeName, data.id), {
            onSuccess: () => {
                sweetAlert.fire({
                    title: 'Éxito',
                    text: isEdit ? 'Producto actualizado' : 'Producto creado',
                    timer: 2000,
                    showConfirmButton: false, // Esta línea oculta el botón OK
                    timerProgressBar: true // Opcional: muestra una barra de progreso
                });
            },
            onError: (errors) => {
                sweetAlert.fire({
                    title: 'Error',
                    text: 'Por favor corrige los errores',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        });
    }

    return (
        <>
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Productos
                    </h2>
                }
            >

                <Head title="Productos" />

                <div className="pt-6">
                    <div className="w-full mx-auto sm:px-6 lg:px-8">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6">
                                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                                    {isEdit ? 'Editar Categoría' : 'Crear Nueva Categoría'}
                                </h2>

                                <Form submit={submit} cancel={cancel} processing={processing}>
                                    <div>
                                        <InputForm
                                            title={'Nombre del Producto'}
                                            errors={errors.nombre}
                                            data={data.nombre}
                                            setData={setData}
                                            key={'nombre'}
                                            placeholder='Producto...'
                                        />
                                    </div>

                                    <div>
                                        <InputForm
                                            title={'Precio del Producto'}
                                            inputType='number'
                                            errors={errors.precio}
                                            data={data.precio}
                                            setData={setData}
                                            key={'precio'}
                                        />
                                    </div>


                                    <div>
                                        <Select
                                            data={categorias}
                                            setData={setData}
                                            errors={errors.categoria_id}
                                            field='categoria_id'
                                            option={{value : 'categoria_id', text : 'nombre'}}
                                            subTitle='Lista de categorias'
                                            title='Categoria'
                                        >

                                    </Select>
                                    {/* <label htmlFor="categoriaId"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Categoría:</label>
                                        <select
                                            onChange={(e) => setData('categoria_id', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white">
                                            <option value="">Seleccione una categoría</option>
                                            {categorias.map((cat) => {
                                                return (
                                                    <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                                )
                                            })}

                                        </select>
                                        {errors.categoria_id && (
                                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.categoria_id}</p>
                                        )} */}
                            </div>


                        </Form>
                    </div>
                </div>
            </div>
        </div >
            </AuthenticatedLayout >
        </>
    );
}
