import { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index(props) {

    const [almacenes, setAlmacenes] = useState([
        {
            id: 1,
            nombre: 'Almacén Principal',
            expanded: true,
            pasillos: [
                {
                    id: 101,
                    nombre: 'Pasillo A',
                    expanded: true,
                    estantes: [
                        {
                            id: 1001,
                            nombre: 'Estante 1',
                            expanded: true,
                            niveles: [
                                { id: 10001, nombre: 'Nivel 1' },
                                { id: 10002, nombre: 'Nivel 2' }
                            ]
                        }
                    ]
                }
            ]
        }
    ]);

    const toggleExpand = (id, level) => {
        // Lógica para expandir/colapsar elementos
        // Implementar según sea necesario
    };


    const renderTree = (nodes, level = 0) => {
        return nodes.map((node) => (
            <div key={`${level}-${node.id}`} className="ml-4">
                <div
                    className="flex items-center py-1 hover:bg-gray-100 cursor-pointer"
                    onClick={() => toggleExpand(node.id, level)}
                >
                    {/* Flecha para expandir/colapsar */}
                    {node.pasillos || node.estantes || node.niveles ? (
                        <span className="mr-2">
                            {node.expanded ? '▼' : '►'}
                        </span>
                    ) : (
                        <span className="mr-2 w-4"></span> // Espaciador
                    )}

                    <span className="font-medium">{node.nombre}</span>

                    {/* Botones de acción */}
                    <div className="ml-auto space-x-1">
                        {level < 3 && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Lógica para agregar
                                }}
                                className="text-xs bg-green-500 text-white px-2 py-0.5 rounded"
                            >
                                + {level === 0 ? 'Pasillo' : level === 1 ? 'Estante' : 'Nivel'}
                            </button>
                        )}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                // Lógica para editar
                            }}
                            className="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded"
                        >
                            Editar
                        </button>
                    </div>
                </div>

                {/* Contenido anidado */}
                {(node.expanded && node.pasillos) && renderTree(node.pasillos, level + 1)}
                {(node.expanded && node.estantes) && renderTree(node.estantes, level + 1)}
                {(node.expanded && node.niveles) && renderTree(node.niveles, level + 1)}
            </div>
        ));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Pages
                </h2>
            }
        >
            <Head title="Pages" />
            {/* Contendido */}
            <div className="pt-6">
                <div className="w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">Estructura del Almacén</h2>
                                <button
                                    onClick={() => {
                                        // Lógica para agregar almacén
                                    }}
                                    className="bg-blue-500 text-white px-3 py-1 rounded"
                                >
                                    + Almacén
                                </button>
                            </div>

                            <div className="bg-white p-4 rounded-lg shadow">
                                {renderTree(almacenes)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}