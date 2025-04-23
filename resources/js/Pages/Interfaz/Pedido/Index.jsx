import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Swal from 'sweetalert2';

export default function PedidosIndex() {
  // Datos simulados
  const initialPedidos = [
    {
      id: 1,
      fecha: "2023-05-15",
      monto_total: 125.50,
      estado: "pendiente",
      cliente: { id: 1, nombre: "Juan Pérez" },
      caja: { id: 1, nombre: "Caja Principal" },
      usuario: { id: 1, name: "Admin" },
      detalles: [
        {
          id: 1,
          cantidad: 2,
          monto_total: 80.00,
          menu_producto: {
            id: 1,
            precio: 40.00,
            producto: {
              id: 1,
              nombre: "Hamburguesa Especial",
              categoria: { id: 1, nombre: "Comida Rápida" }
            }
          }
        },
        {
          id: 2,
          cantidad: 3,
          monto_total: 45.50,
          menu_producto: {
            id: 2,
            precio: 15.17,
            producto: {
              id: 2,
              nombre: "Refresco Grande",
              categoria: { id: 2, nombre: "Bebidas" }
            }
          }
        }
      ]
    },
    {
      id: 2,
      fecha: "2023-05-16",
      monto_total: 75.25,
      estado: "entregado",
      cliente: { id: 2, nombre: "María García" },
      caja: { id: 1, nombre: "Caja Principal" },
      usuario: { id: 2, name: "Vendedor 1" },
      detalles: [
        {
          id: 3,
          cantidad: 1,
          monto_total: 75.25,
          menu_producto: {
            id: 3,
            precio: 75.25,
            producto: {
              id: 3,
              nombre: "Pizza Familiar",
              categoria: { id: 1, nombre: "Comida Rápida" }
            }
          }
        }
      ]
    }
  ];

  const productosDisponibles = [
    {
      id: 1,
      nombre: "Hamburguesa Especial",
      precio: 40.00,
      disponible: true,
      categoria: { id: 1, nombre: "Comida Rápida" }
    },
    {
      id: 2,
      nombre: "Refresco Grande",
      precio: 15.17,
      disponible: true,
      categoria: { id: 2, nombre: "Bebidas" }
    },
    {
      id: 3,
      nombre: "Pizza Familiar",
      precio: 75.25,
      disponible: true,
      categoria: { id: 1, nombre: "Comida Rápida" }
    },
    {
      id: 4,
      nombre: "Ensalada César",
      precio: 28.50,
      disponible: true,
      categoria: { id: 3, nombre: "Ensaladas" }
    }
  ];

  const estadosPosibles = ["pendiente", "solicitado", "entregado", "cancelado", "pagado"];
  const clientes = [
    { id: 1, nombre: "Juan Pérez" },
    { id: 2, nombre: "María García" },
    { id: 3, nombre: "Carlos López" }
  ];
  const cajas = [
    { id: 1, nombre: "Caja Principal" },
    { id: 2, nombre: "Caja Secundaria" }
  ];

  // Estados del componente
  const [pedidos, setPedidos] = useState(initialPedidos);
  const [showModal, setShowModal] = useState(false);
  const [currentPedido, setCurrentPedido] = useState(null);
  const [action, setAction] = useState('create');
  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split('T')[0],
    monto_total: 0,
    estado: 'pendiente',
    cliente_id: '',
    caja_id: '',
    detalles: []
  });

  // Generar un ID único para nuevos elementos
  const generateId = () => Math.max(...pedidos.map(p => p.id), 0) + 1;

  // Manejar eliminación de pedido
  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar pedido?',
      text: "¡No podrás revertir esta acción!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setPedidos(pedidos.filter(p => p.id !== id));
        Swal.fire('Eliminado!', 'El pedido ha sido eliminado.', 'success');
      }
    });
  };

  // Manejar edición de pedido
  const handleEdit = (pedido) => {
    setCurrentPedido(pedido);
    setAction('edit');
    setFormData({
      ...pedido,
      cliente_id: pedido.cliente.id,
      caja_id: pedido.caja.id
    });
    setShowModal(true);
  };

  // Manejar visualización de detalles
  const handleShow = (pedido) => {
    setCurrentPedido(pedido);
    setAction('show');
    setFormData({
      ...pedido,
      cliente_id: pedido.cliente.id,
      caja_id: pedido.caja.id
    });
    setShowModal(true);
  };

  // Agregar nuevo detalle al pedido
  const handleAddDetail = () => {
    setFormData(prev => ({
      ...prev,
      detalles: [...prev.detalles, {
        id: Math.max(...prev.detalles.map(d => d.id), 0) + 1,
        menu_producto_id: '',
        cantidad: 1,
        monto_total: 0
      }]
    }));
  };

  // Eliminar detalle del pedido
  const handleRemoveDetail = (index) => {
    setFormData(prev => {
      const newDetalles = [...prev.detalles];
      newDetalles.splice(index, 1);

      // Recalcular monto total
      const monto_total = newDetalles.reduce((sum, det) => sum + (det.monto_total || 0), 0);

      return { ...prev, detalles: newDetalles, monto_total };
    });
  };

  // Manejar cambios en los detalles
  const handleDetailChange = (index, field, value) => {
    setFormData(prev => {
      const newDetalles = [...prev.detalles];
      newDetalles[index] = { ...newDetalles[index], [field]: value };

      // Si cambió el producto o la cantidad, recalcular monto
      if (field === 'menu_producto_id' || field === 'cantidad') {
        const producto = productosDisponibles.find(p => p.id == newDetalles[index].menu_producto_id);
        if (producto) {
          newDetalles[index].monto_total = newDetalles[index].cantidad * producto.precio;
        } else {
          newDetalles[index].monto_total = 0;
        }
      }

      // Recalcular monto total del pedido
      const monto_total = newDetalles.reduce((sum, det) => sum + (det.monto_total || 0), 0);

      return { ...prev, detalles: newDetalles, monto_total };
    });
  };

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (action === 'create') {
      // Crear nuevo pedido
      const nuevoPedido = {
        id: generateId(),
        fecha: formData.fecha,
        monto_total: formData.monto_total,
        estado: formData.estado,
        cliente: clientes.find(c => c.id == formData.cliente_id),
        caja: cajas.find(c => c.id == formData.caja_id),
        usuario: { id: 1, name: "Usuario Actual" }, // Simular usuario logueado
        detalles: formData.detalles.map(det => ({
          ...det,
          menu_producto: productosDisponibles.find(p => p.id == det.menu_producto_id)
        }))
      };

      setPedidos([...pedidos, nuevoPedido]);
      Swal.fire('Éxito', 'Pedido creado correctamente', 'success');
    } else if (action === 'edit') {
      // Actualizar pedido existente
      const pedidosActualizados = pedidos.map(p =>
        p.id === currentPedido.id ? {
          ...p,
          fecha: formData.fecha,
          monto_total: formData.monto_total,
          estado: formData.estado,
          cliente: clientes.find(c => c.id == formData.cliente_id),
          caja: cajas.find(c => c.id == formData.caja_id),
          detalles: formData.detalles.map(det => ({
            ...det,
            menu_producto: productosDisponibles.find(p => p.id == det.menu_producto_id)
          }))
        } : p
      );

      setPedidos(pedidosActualizados);
      Swal.fire('Éxito', 'Pedido actualizado correctamente', 'success');
    }

    setShowModal(false);
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Gestión de Pedidos
        </h2>
      }
    >
      <Head title="Pedidos" />

      <div className="pt-6">
        <div className="w-full mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Listado de Pedidos</h3>
                <button
                  onClick={() => {
                    setCurrentPedido(null);
                    setAction('create');
                    setFormData({
                      fecha: new Date().toISOString().split('T')[0],
                      monto_total: 0,
                      estado: 'pendiente',
                      cliente_id: '',
                      caja_id: '',
                      detalles: []
                    });
                    setShowModal(true);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
                >
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Nuevo Pedido
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fecha</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Cliente</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Estado</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {pedidos.map((pedido) => (
                      <tr key={pedido.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{pedido.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{pedido.fecha}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{pedido.cliente.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${pedido.monto_total.toFixed(2)}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            pedido.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                            pedido.estado === 'solicitado' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                            pedido.estado === 'entregado' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                            pedido.estado === 'cancelado' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                            'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
                          }`}>
                            {pedido.estado}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleShow(pedido)}
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 p-1 rounded-full bg-blue-50 dark:bg-blue-900/30"
                              title="Ver detalles"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleEdit(pedido)}
                              className="text-yellow-600 hover:text-yellow-900 dark:text-yellow-400 p-1 rounded-full bg-yellow-50 dark:bg-yellow-900/30"
                              title="Editar"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleDelete(pedido.id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 p-1 rounded-full bg-red-50 dark:bg-red-900/30"
                              title="Eliminar"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para crear/editar/ver pedidos */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">
                  {action === 'create' ? 'Nuevo Pedido' : action === 'edit' ? 'Editar Pedido' : 'Detalles del Pedido'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha</label>
                    <input
                      type="date"
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white"
                      value={formData.fecha}
                      onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                      required
                      disabled={action === 'show'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Estado</label>
                    <select
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white"
                      value={formData.estado}
                      onChange={(e) => setFormData({...formData, estado: e.target.value})}
                      required
                      disabled={action === 'show'}
                    >
                      {estadosPosibles.map(estado => (
                        <option key={estado} value={estado}>{estado}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cliente</label>
                    <select
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white"
                      value={formData.cliente_id}
                      onChange={(e) => setFormData({...formData, cliente_id: e.target.value})}
                      required
                      disabled={action === 'show'}
                    >
                      <option value="">Seleccionar cliente</option>
                      {clientes.map(cliente => (
                        <option key={cliente.id} value={cliente.id}>{cliente.nombre}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Caja</label>
                    <select
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white"
                      value={formData.caja_id}
                      onChange={(e) => setFormData({...formData, caja_id: e.target.value})}
                      required
                      disabled={action === 'show'}
                    >
                      <option value="">Seleccionar caja</option>
                      {cajas.map(caja => (
                        <option key={caja.id} value={caja.id}>{caja.nombre}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Detalles del Pedido</label>
                    {action !== 'show' && (
                      <button
                        type="button"
                        onClick={handleAddDetail}
                        className="text-sm bg-green-500 text-white px-2 py-1 rounded flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Agregar Producto
                      </button>
                    )}
                  </div>

                  <div className="space-y-3">
                    {formData.detalles.map((detalle, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 border rounded-lg dark:border-gray-600">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                          <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Producto</label>
                            <select
                              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white text-sm"
                              value={detalle.menu_producto_id}
                              onChange={(e) => handleDetailChange(index, 'menu_producto_id', e.target.value)}
                              required
                              disabled={action === 'show'}
                            >
                              <option value="">Seleccionar producto</option>
                              {productosDisponibles.map(producto => (
                                <option key={producto.id} value={producto.id}>
                                  {producto.nombre} (${producto.precio.toFixed(2)})
                                </option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Cantidad</label>
                            <input
                              type="number"
                              min="1"
                              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white text-sm"
                              value={detalle.cantidad}
                              onChange={(e) => handleDetailChange(index, 'cantidad', parseInt(e.target.value))}
                              required
                              disabled={action === 'show'}
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Subtotal</label>
                            <input
                              type="text"
                              className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:text-white text-sm bg-gray-100 dark:bg-gray-700"
                              value={`$${(detalle.monto_total || 0).toFixed(2)}`}
                              readOnly
                            />
                          </div>
                        </div>
                        {action !== 'show' && (
                          <button
                            type="button"
                            onClick={() => handleRemoveDetail(index)}
                            className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center border-t pt-4">
                  <div className="text-lg font-semibold">
                    Total: <span className="text-blue-600 dark:text-blue-400">${formData.monto_total.toFixed(2)}</span>
                  </div>
                  {action !== 'show' && (
                    <div className="space-x-2">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 rounded-md text-gray-800 dark:text-white"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-md text-white"
                      >
                        {action === 'create' ? 'Crear Pedido' : 'Guardar Cambios'}
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AuthenticatedLayout>
  );
}