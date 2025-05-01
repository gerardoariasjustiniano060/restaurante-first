import { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CardHeader from '@/Components/CardHeader';
import FormSearch from '@/Components/FormSearch';
import BtnCreate from '@/Components/BtnCreate';
import BtnDetailCircle from '@/Components/BtnDetailCircle';
import BtnEditCircle from '@/Components/BtnEditCircle';
import BtnDeleteCircle from '@/Components/BtnDeleteCircle';
import Table from '@/Components/Table';
import CardBody from '@/Components/CardBody';
import Pagination from '@/Components/Pagination';
import Detail from './Detail';

export default function Index({ menus, filters }) {

    const columns = [
        { key: 1, field: 'id', title: 'ID' },
        { key: 2, field: 'nombre', title: 'Nombre' },
        { key: 3, field: 'descripcion', title: 'Descripción' },
        {
            key: 4, title: 'Acciones', render: (item) => {
                return (
                    <div className='className="flex space-x-2"'>
                        <BtnEditCircle editing={editing} item={item} />
                        <BtnDeleteCircle deleting={handleDelete} item={item}></BtnDeleteCircle>
                        <BtnDetailCircle detail={detail} item={item}></BtnDetailCircle>
                    </div>
                )
            }
        },
    ];

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esto eliminará la categoría',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('menu.destroy', id));
            }
        });
    };

    const editing = (men) => {
        router.get(route('menu.edit', men.id));
    };

    const detail = (men) => {
        router.get(route('menu.detail', men.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Menus
                </h2>
            }
        >
            <Head title="Menus" />

            <CardHeader>
                <FormSearch url={'menus.index'} filter={filters} />
                <BtnCreate url={'menu.create'} />
            </CardHeader>


            <CardBody>
                <Table columns={columns} data={menus.data} />
            </CardBody>
           <Pagination data={menus}></Pagination>
        </AuthenticatedLayout>
    );
}
