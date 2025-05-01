import { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CardHeader from '@/Components/CardHeader';
import Table from '@/Components/Table';
import FormSearch from '@/Components/FormSearch';
import BtnCreate from '@/Components/BtnCreate';
import CardBody from '@/Components/CardBody';
import BtnEdit from '@/Components/BtnEditCircle';
import BtnDelete from '@/Components/BtnDeleteCircle';
import Pagination from '@/Components/Pagination';

export default function Index({ productos, filters }) {


    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esto eliminará el producto',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('producto.destroy', id));
            }
        });
    };

    const editing = (prod) => {
        router.get(route('producto.edit', prod.id));
    };

    const columns = [
        { key: 1, field: 'id', title: 'ID' },
        { key: 2, field: 'nombre', title: 'Nombre' },
        {
            key: 3, title: 'Categoria', render: (item) => {
                return (
                    <>
                        {item.categoria.nombre}
                    </>
                )
            }
        },
        {
            key: 4, title: 'Acciones', render: (item) => {
                return (
                    <div className='className="flex space-x-2"'>
                        <BtnEdit editing={editing} item={item} />
                        <BtnDelete deleting={handleDelete} item={item}></BtnDelete>
                    </div>
                )
            }
        },
    ];


    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Productos
                </h2>
            }
        >
            <Head title="Productos" />

            <CardHeader>
                <FormSearch url={'productos.index'} filter={filters} />
                <BtnCreate url={'producto.create'} />
            </CardHeader>

            <CardBody>
                <Table data={productos.data} columns={columns} />
            </CardBody>


            <Pagination data={productos}></Pagination>

        </AuthenticatedLayout>
    );
}





