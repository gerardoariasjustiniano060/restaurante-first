import { useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import sweetAlert from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Form from '@/Components/Form';
import InputForm from '@/Components/InputForm';

export default function Formulario({ cliente = {}, isEdit }) {
    const { data, post, processing, errors, setData } = useForm({
        id: cliente?.id || null,
        nombre_completo: cliente?.nombre_completo || '',
        telefono: cliente?.telefono || ''
    });

    const cancel = () => {
        router.visit(route('clientes.index'), {
            preserveState: true,
            replace: true
        })
    }

    const submit = (e) => {
        e.preventDefault();
        const routeName = isEdit ? 'cliente.update' : 'cliente.store';
        const method = isEdit ? put : post;

        method(route(routeName, data.id), {
            onSuccess: () => {
                sweetAlert.fire({
                    title: 'Éxito',
                    text: isEdit ? 'Cliente actualizada' : 'Cliente creada',
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
                        Clientes
                    </h2>
                }
            >

                <Head title="Clientes" />

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
                                            title={'Nombre de Cliente'}
                                            errors={errors.nombre_completo}
                                            data={data.nombre_completo}
                                            setData={setData}
                                            key={'nombre_completo'}
                                            placeholder='Cliente...'
                                        />
                                    </div>

                                    <div>
                                        <InputForm
                                            title={'Teléfono'}
                                            errors={errors.telefono}
                                            data={data.telefono}
                                            setData={setData}
                                            key={'telefono'}
                                            placeholder='Telefono...'
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
