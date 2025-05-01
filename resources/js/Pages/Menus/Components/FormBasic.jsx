import React from 'react';
import InputForm from '@/Components/InputForm';
import { router, useForm } from '@inertiajs/react';
import TextTareaForm from '@/Components/TextTareaForm';
import Form from '@/Components/Form';
import Swal from 'sweetalert2';


const FormBasic = ({
    menu, ...props
}) => {

    const { data, put, setData, errors , processing } = useForm({
        id: menu?.id || null,
        nombre: menu?.nombre || '',
        descripcion: menu?.descripcion || '',
        menu_productos: menu?.menu_productos || [],
    });

    // Modifica datos basicos del menu
    const submit = (e) => {
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

    const cancel = () => {
        router.visit(route('menus.index'), {
            method : 'get',
            preserveState: true,
            replace: true
        });
    }

    return (
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Información Básica del Menú
                </h3>
                <Form submit={submit} cancel={cancel} processing={processing}>
                    <div>
                        <InputForm
                            data={data.nombre}
                            errors={errors.nombre}
                            setData={setData}
                            field={'nombre'}
                            inputType='text'
                            title={'Nombre Menu'}
                            placeholder='Nombre del menú'
                        />
                    </div>
                    <div>
                        <TextTareaForm
                            data={data.descripcion}
                            errors={errors.descripcion}
                            setData={setData}
                            field={'descripcion'}
                            title={'Descripción'}
                            rows={3}
                        />
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default FormBasic;