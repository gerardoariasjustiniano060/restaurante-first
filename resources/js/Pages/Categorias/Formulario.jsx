import { useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import sweetAlert from 'sweetalert2'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from '@/Components/Form';
import InputForm from '@/Components/InputForm';

export default function Formulario({ categoria = {}, isEdit }) {
    const { data, post, processing, errors, setData } = useForm({
        id: categoria?.id || null,
        nombre: categoria?.nombre || ''
    });

    const submit = (e) => {
        e.preventDefault();
        const routeName = isEdit ? 'categoria.update' : 'categoria.store';
        const method = isEdit ? put : post;

        method(route(routeName, data.id), {
            onSuccess: () => {
                sweetAlert.fire({
                    title: 'Éxito',
                    text: isEdit ? 'Categoría actualizada' : 'Categoría creada',
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

    const cancel = () => {
        router.visit(route('categorias.index'), {
            preserveState: true,
            replace: true
        })
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

                                <Form submit={submit} cancel={cancel} processing={processing} >
                                    <div>
                                        <InputForm
                                            title={'Nombre de la categoría'}
                                            errors={errors.nombre}
                                            data={data.nombre}
                                            setData={setData}
                                            key={'nombre'}
                                            placeholder='Categoria...'
                                        />
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
}
