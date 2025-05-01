import { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CardHeader from '@/Components/CardHeader';
import FormSearch from '@/Components/FormSearch';
import BtnCreate from '@/Components/BtnCreate';
import BtnEdit from '@/Components/BtnEditCircle';
import BtnDeleteCircle from '@/Components/BtnDeleteCircle';
import CardBody from '@/Components/CardBody';
import Table from '@/Components/Table';
import Pagination from '@/Components/Pagination';

export default function Index({ clientes, filters }) {

    const columns = [
        { key: 1, field: 'id', title: 'ID' },
        { key: 2, field: 'nombre_completo', title: 'Nombre' },
        { key: 3, field: 'telefono', title: 'Telefono' },
        {
            key: 4, title: 'Acciones', render: (item) => {
                return (
                    <div className='className="flex space-x-2"'>
                        <BtnEdit editing={editing} item={item} />
                        <BtnDeleteCircle deleting={handleDelete} item={item}></BtnDeleteCircle>
                    </div>
                )
            }
        },
    ];

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esto eliminará la cliente',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('cliente.destroy', id));
            }
        });
    };

    const editing = (cli) => {
        router.get(route('cliente.edit', cli.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Clientes
                </h2>
            }
        >
            <Head title="Clientes" />

            <CardHeader>
                <FormSearch url={'clientes.index'} filter={filters} />
                <BtnCreate url={'cliente.create'} />
            </CardHeader>

            <CardBody>
                <Table data={clientes.data} columns={columns} />
            </CardBody>

            <Pagination data={clientes}></Pagination>

        </AuthenticatedLayout>
    );
}
