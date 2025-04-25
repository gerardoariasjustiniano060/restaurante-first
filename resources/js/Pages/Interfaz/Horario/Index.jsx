import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const HorarioSemanal = () => {
    // Obtener el día actual (0: Domingo, 1: Lunes, ..., 6: Sábado)
    const diaActual = new Date().getDay();

    // Días de la semana
    const diasSemana = [
        { id: 1, nombre: 'LUNES' },
        { id: 2, nombre: 'MARTES' },
        { id: 3, nombre: 'MIÉRCOLES' },
        { id: 4, nombre: 'JUEVES' },
        { id: 5, nombre: 'VIERNES' },
        { id: 6, nombre: 'SÁBADO' },
        { id: 0, nombre: 'DOMINGO' }
    ];

    // Estado para almacenar los menús
    const [menus, setMenus] = useState({});
    const [menuEditando, setMenuEditando] = useState(null);

    const handleMenuChange = (diaId, value) => {
        setMenus(prev => ({
            ...prev,
            [diaId]: value
        }));
    };

    const guardarMenu = (diaId) => {
        setMenuEditando(null);
        console.log(`Menú guardado para ${diasSemana.find(d => d.id === diaId).nombre}:`, menus[diaId]);
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Horario de Menús</h2>}
        >
            <Head title="Horario de Menús" />

            <div className="py-6">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Horario Semanal</h2>

                                <div className="space-y-4">
                                    {diasSemana.map((dia) => (
                                        <div
                                            key={dia.id}
                                            className={`p-4 rounded-lg border ${
                                                dia.id === diaActual
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200'
                                            }`}
                                        >
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                                <div className="flex items-center">
                                                    <span className={`font-semibold ${
                                                        dia.id === diaActual
                                                            ? 'text-blue-600'
                                                            : 'text-gray-700'
                                                    }`}>
                                                        {dia.nombre}
                                                    </span>
                                                    {dia.id === diaActual && (
                                                        <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                                            HOY
                                                        </span>
                                                    )}
                                                </div>

                                                {menuEditando === dia.id ? (
                                                    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                                        <input
                                                            type="text"
                                                            value={menus[dia.id] || ''}
                                                            onChange={(e) => handleMenuChange(dia.id, e.target.value)}
                                                            placeholder="Ej: Menú vegetariano"
                                                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                                                        />
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => guardarMenu(dia.id)}
                                                                className="px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex-1"
                                                            >
                                                                Guardar
                                                            </button>
                                                            <button
                                                                onClick={() => setMenuEditando(null)}
                                                                className="px-3 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 flex-1"
                                                            >
                                                                Cancelar
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-gray-600">
                                                            {menus[dia.id] || 'Sin menú asignado'}
                                                        </span>
                                                        <button
                                                            onClick={() => setMenuEditando(dia.id)}
                                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm whitespace-nowrap"
                                                        >
                                                            {menus[dia.id] ? 'Editar' : 'Agregar'}
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default HorarioSemanal;