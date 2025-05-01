import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Swal from 'sweetalert2';
import CardBody from '@/Components/CardBody';
import Table from '@/Components/Table';
import Badge from '@/Components/Badge';
import CardTable from '@/Components/CardTable';
import FormBasic from './Components/FormBasic';
import CardJustify from '@/Components/CardJustify';
import BtnPlush from '@/Components/BtnPlush';
import TableProductos from '@/Components/TableProductos';
import BtnEditCircle from '@/Components/BtnEditCircle';
import BtnDeleteCircle from '@/Components/BtnDeleteCircle';
import BtnPlushCircle from '@/Components/BtnPlushCircle';
import TableMenuProductos from '@/Components/TableMenuProductos';
import ModalProducto from './Components/ModalProductos';

export default function Save({ menu, productos }) {
    const { data, setData } = useForm({
        id: null,
        menu_productos: [],
    });

    const [menuProductoException, setMenuProductoException] = useState([]);
    const [showModalAditionProducto, setShowModalAditionProducto] = useState(false);
    const [showModalAditionCombo, setShowModalAditionCombo] = useState(false);
    const [selectIndex, setSelectIndex] = useState(null);

    const toggleModalProducto = () => {
        setShowModalAditionProducto(!showModalAditionProducto);
    }

    // Se debe modificar
    const showModalAditionProductoModal = ({ item, index }) => {
        // 1. Primero reseteamos a array vacío
        setMenuProductoException([]);

        // 2. Luego agregamos el nuevo item
        setMenuProductoException(prev => [...prev, item]);

        // 3. Guardamos el índice
        setSelectIndex(index);

        // 4. Abrimos el modal
        toggleModalMenuProducto();
    }
    const toggleModalMenuProducto = () => {
        setShowModalAditionCombo(!showModalAditionCombo);
    }

    const columns = [
        // { key: 1, field: 'id', title: 'ID' },
        {
            key: 1, title: 'Nombre', render: (item) => {
                return (
                    <CardTable color='red'>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {item?.nombre}
                        </div>

                        <div>
                            Precio : <Badge color='green'>{item?.precio}</Badge>
                        </div>
                        {item.combos.length > 0 && <div>
                            Completo : <Badge color='blue'>{item?.precio_combo}</Badge>
                        </div>}
                    </CardTable>
                )
            }
        },
        {
            key: 2, title: 'Combos', render: (item) => {
                return (
                    <div className="text-sm items-center">
                        {item.combos && item.combos.length === 0 && (
                            <div className="rounded-lg dark:border-gray-600">
                                <div className="items-center">
                                    <Badge color='red'>Producto Individual</Badge>
                                </div>
                            </div>
                        )}
                        {item.combos && item.combos.map((combo, index) => (
                            <div key={index} className="mb-3 p-3 border rounded-lg dark:border-gray-600">
                                <div className="flex items-center m-1">
                                    <div className="flex-1 flex items-center justify-between">
                                        <span className="font-medium text-gray-800 dark:text-gray-200">
                                            {combo.producto.nombre}
                                        </span>
                                        <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                            ${combo.producto.precio}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>)
            }
        },
        {
            key: 3, title: 'Acciones', render: (item, index) => {
                return (
                    <div className="flex space-x-2">
                        <BtnEditCircle editing={() => { }} item={item} ></BtnEditCircle>
                        <BtnDeleteCircle deleting={deleting} item={index}></BtnDeleteCircle>
                        <BtnPlushCircle save={showModalAditionProductoModal} item={{ item: item, index: index }}></BtnPlushCircle>
                    </div>)
            }
        }
    ];

    const deleting = (index) => {
        Swal.fire({
            title: 'Confirmar eliminación',
            text: '¿Deseas eliminar este registro permanentemente?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                const updatedProducts = [...data.menu_productos];
                updatedProducts.splice(index, 1);
                setData('menu_productos', updatedProducts);
            }
        });
    };

    const aditionProductoMenu = (producto) => {
        const newMenuProducto = {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            disponible: producto.disponible,
            categoria: { ...producto.categoria },
            combos: []
        };

        setData('menu_productos', [...data.menu_productos, newMenuProducto]);
        setShowModalAditionProducto(false);
    }

    // Se debe modificar
    const aditionComboProductos = (producto) => {
        const newComboProducto = {
            descripcion: "sin descripcion",
            producto_id: producto.id,
            producto: { ...producto },
            cantidad: 1
        }

        const menuProducto = [...data.menu_productos];
        menuProducto[selectIndex].combos.push(newComboProducto);
        setData('menu_productos', menuProducto);
    }
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Adicionar Menú: {menu.nombre}
                </h2>
            }
        >
            <Head title={`Adicionar`} />
            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <FormBasic menu={menu} />
                    <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                        <div className="p-4">
                            <CardJustify>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    Productos del Menú
                                </h3>
                                <BtnPlush onClick={toggleModalProducto}></BtnPlush>
                            </CardJustify>
                            <CardBody>
                                <Table columns={columns} data={data.menu_productos} />
                            </CardBody>
                        </div>
                    </div>
                </div>
            </div>

            <ModalProducto
                title={'Lista de productos'}
                showModal={showModalAditionProducto}
                setShowModal={setShowModalAditionProducto}
            >
                <TableProductos
                    menuProductos={data.menu_productos}
                    submitAction={aditionProductoMenu}
                    productos={productos}
                />
            </ModalProducto>
            {/* Modal de Combos */}
            <ModalProducto
                title={'Lista de menú'}
                showModal={showModalAditionCombo}
                setShowModal={setShowModalAditionCombo}
            >
                <TableMenuProductos
                    menuProductos={menuProductoException}
                    submitAction={aditionComboProductos}
                    productos={data.menu_productos}
                />
            </ModalProducto>
        </AuthenticatedLayout>
    );
}
