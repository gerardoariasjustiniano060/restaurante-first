import { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CardHeader from '@/Components/CardHeader';
import Table from '@/Components/Table';
import FormSearch from '@/Components/FormSearch';
import BtnCreate from '@/Components/BtnCreate';
import CardBody from '@/Components/CardBody';
import BtnEdit from '@/Components/BtnEdit';
import BtnDelete from '@/Components/BtnDelete';
import Pagination from '@/Components/Pagination';

export default function Index({ categorias, filters }) {

    const columns = [
        { key: 1, field: 'id', title: 'ID' },
        { key: 2, field: 'nombre', title: 'Nombre' },
        {
            key: 3, title: 'Acciones', render: (item) => {
                return (
                    <div className='className="flex space-x-2"'>
                        <BtnEdit editing={editing} item={item} />
                        <BtnDelete deleting={handleDelete} item={item}></BtnDelete>
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
                router.delete(route('categoria.destroy', id));
            }
        });
    };

    const editing = (item) => {
        router.get(route('categoria.edit', item.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Categorías
                </h2>
            }
        >
            <Head title="Categorías" />

            <CardHeader>
                <FormSearch url={'categorias.index'} filter={filters} />
                <BtnCreate url={'categoria.create'} />
            </CardHeader>

            <CardBody>
                <Table data={categorias.data} columns={columns} />
            </CardBody>

            <Pagination data={categorias}></Pagination>
        </AuthenticatedLayout>
    );
}
