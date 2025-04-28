export const pedidos = [
    {
        'id': 1,
        'estado': 'pendiente',
        'monto_total': '300.00',
        'cliente': { 'id': 1, 'nombre': 'Ana Maria Soliz', 'telefono': '76509122' },
        'usuario': { 'id': 1, 'name': 'Lidia Sarely' },
        'caja': {
            'monto_inicial': '50.00',
            'monto_total': '00.00',
            'fecha': '2025-04-27',
            'descripcion': 'ninguna',
            'usuario': { 'id': 1, 'name': 'Lidia Sarely' },
        },
        'menu_pedidos': [
            {
                'id': 1,
                'monto_total': '20.00',
                'cantidad': 1,
                'pedido_id': 1,
                'menu_producto': {
                    'id': 1,
                    'precio': "20",
                    'precio_combo': "23",
                    'descripcion': "ninguno",
                    'completo': true,
                    'producto': {
                        'id': 1,
                        'disponible': true,
                        'nombre': 'Milanesa napolitana',
                        'categoria': { 'id': 1, 'nombre': 'Plato principal' },
                        'precio': '20.00',
                    },
                    'menu': {
                        'id': 1,
                        'nombre': 'menu 1',
                        'descripcion': 'descripcion actual',
                        'fecha': '2025-04-27',
                        'actual': true
                    },
                    'combos': [
                        {
                            'id': 1,
                            'descripcion': 'sin descripciones',
                            'cantidad': 1,
                            'menu_producto_id': 1,
                            'producto': {
                                'id': 7,
                                'disponible': true,
                                'nombre': 'Sopa de maní',
                                'categoria': { 'id': 1, 'nombre': 'Plato secundario' },
                                'precio': '6.00',
                            },
                        }
                    ]
                },
            },
            {
                'id': 2,
                'monto_total': '20.00',
                'cantidad': 1,
                'pedido_id': 1,
                'menu_producto': {
                    'precio': "20",
                    'precio_combo': "23",
                    'descripcion': "ninguno",
                    'completo': true,
                    'producto': {
                        'id': 2,
                        'disponible': true,
                        'nombre': 'Milanesa de pollo',
                        'categoria': { 'id': 1, 'nombre': 'Plato principal' },
                        'precio': '20.00',
                    },
                    'menu': {
                        'id': 1,
                        'nombre': 'menu 1',
                        'descripcion': 'descripcion actual',
                        'fecha': '2025-04-27',
                        'actual': true
                    },
                    'combos': [
                        {
                            'id': 1,
                            'descripcion': 'sin descripciones',
                            'cantidad': 1,
                            'menu_producto_id': 1,
                            'producto': {
                                'id': 7,
                                'disponible': true,
                                'nombre': 'Sopa de maní',
                                'categoria': { 'id': 1, 'nombre': 'Plato secundario' },
                                'precio': '6.00',
                            },
                        }
                    ]
                },
            }
        ]
    },
    {
        'id': 2,
        'estado': 'completado',
        'monto_total': '85.50',
        'cliente': { 'id': 2, 'nombre': 'Carlos Mendoza', 'telefono': '71234567' },
        'usuario': { 'id': 1, 'name': 'Lidia Sarely' },
        'caja': {
            'monto_inicial': '100.00',
            'monto_total': '185.50',
            'fecha': '2025-04-27',
            'descripcion': 'venta almuerzo',
            'usuario': { 'id': 1, 'name': 'Lidia Sarely' },
        },
        'menu_pedidos': [
            {
                'id': 3,
                'monto_total': '25.50',
                'cantidad': 1,
                'pedido_id': 2,
                'menu_producto': {
                    'id': 3,
                    'precio': "25.50",
                    'precio_combo': "28.00",
                    'descripcion': "con papas fritas",
                    'completo': true,
                    'producto': {
                        'id': 3,
                        'disponible': true,
                        'nombre': 'Bife de chorizo',
                        'categoria': { 'id': 1, 'nombre': 'Plato principal' },
                        'precio': '25.50',
                    },
                    'menu': {
                        'id': 1,
                        'nombre': 'menu 1',
                        'descripcion': 'descripcion actual',
                        'fecha': '2025-04-27',
                        'actual': true
                    },
                    'combos': [
                        {
                            'id': 1,
                            'descripcion': 'sin descripciones',
                            'cantidad': 1,
                            'menu_producto_id': 1,
                            'producto': {
                                'id': 7,
                                'disponible': true,
                                'nombre': 'Sopa de maní',
                                'categoria': { 'id': 1, 'nombre': 'Plato secundario' },
                                'precio': '6.00',
                            },
                        }
                    ]
                },
            },
            {
                'id': 4,
                'monto_total': '15.00',
                'cantidad': 2,
                'pedido_id': 2,
                'menu_producto': {
                    'id': 4,
                    'precio': "15.00",
                    'precio_combo': "17.50",
                    'descripcion': "refresco",
                    'completo': false,
                    'producto': {
                        'id': 4,
                        'disponible': true,
                        'nombre': 'Limonada natural',
                        'categoria': { 'id': 2, 'nombre': 'Bebidas' },
                        'precio': '15.00',
                    },
                    'menu': {
                        'id': 1,
                        'nombre': 'menu 1',
                        'descripcion': 'descripcion actual',
                        'fecha': '2025-04-27',
                        'actual': true
                    },
                    'combos': []
                },
            }
        ]
    },
    {
        'id': 3,
        'estado': 'pendiente',
        'monto_total': '120.75',
        'cliente': { 'id': 3, 'nombre': 'María Lopez', 'telefono': '69875432' },
        'usuario': { 'id': 1, 'name': 'Lidia Sarely' },
        'caja': {
            'monto_inicial': '50.00',
            'monto_total': '00.00',
            'fecha': '2025-04-27',
            'descripcion': 'ninguna',
            'usuario': { 'id': 1, 'name': 'Lidia Sarely' },
        },
        'menu_pedidos': [
            {
                'id': 5,
                'monto_total': '45.25',
                'cantidad': 1,
                'pedido_id': 3,
                'menu_producto': {
                    'id': 5,
                    'precio': "45.25",
                    'precio_combo': "50.00",
                    'descripcion': "con guarnición",
                    'completo': true,
                    'producto': {
                        'id': 5,
                        'disponible': true,
                        'nombre': 'Lomo a la pimienta',
                        'categoria': { 'id': 1, 'nombre': 'Plato principal' },
                        'precio': '45.25',
                    },
                    'menu': {
                        'id': 1,
                        'nombre': 'menu 1',
                        'descripcion': 'descripcion actual',
                        'fecha': '2025-04-27',
                        'actual': true
                    },
                    'combos': [
                        {
                            'id': 1,
                            'descripcion': 'sin descripciones',
                            'cantidad': 1,
                            'menu_producto_id': 1,
                            'producto': {
                                'id': 7,
                                'disponible': true,
                                'nombre': 'Sopa de maní',
                                'categoria': { 'id': 1, 'nombre': 'Plato secundario' },
                                'precio': '6.00',
                            },
                        }
                    ]
                },
            },
            {
                'id': 6,
                'monto_total': '25.50',
                'cantidad': 2,
                'pedido_id': 3,
                'menu_producto': {
                    'id': 6,
                    'precio': "25.50",
                    'precio_combo': "28.00",
                    'descripcion': "postre",
                    'completo': false,
                    'producto': {
                        'id': 6,
                        'disponible': true,
                        'nombre': 'Flan casero',
                        'categoria': { 'id': 3, 'nombre': 'Postres' },
                        'precio': '25.50',
                    },
                    'menu': {
                        'id': 1,
                        'nombre': 'menu 1',
                        'descripcion': 'descripcion actual',
                        'fecha': '2025-04-27',
                        'actual': true
                    },
                    'combos': []
                },
            }
        ]
    },
    {
        'id': 4,
        'estado': 'cancelado',
        'monto_total': '65.00',
        'cliente': { 'id': 4, 'nombre': 'Roberto Jimenez', 'telefono': '72345678' },
        'usuario': { 'id': 1, 'name': 'Lidia Sarely' },
        'caja': {
            'monto_inicial': '80.00',
            'monto_total': '80.00',
            'fecha': '2025-04-27',
            'descripcion': 'pedido cancelado',
            'usuario': { 'id': 1, 'name': 'Lidia Sarely' },
        },
        'menu_pedidos': [
            {
                'id': 7,
                'monto_total': '65.00',
                'cantidad': 1,
                'pedido_id': 4,
                'menu_producto': {
                    'id': 7,
                    'precio': "65.00",
                    'precio_combo': "70.00",
                    'descripcion': "plato especial",
                    'completo': true,
                    'producto': {
                        'id': 7,
                        'disponible': true,
                        'nombre': 'Parrillada para uno',
                        'categoria': { 'id': 1, 'nombre': 'Plato principal' },
                        'precio': '65.00',
                    },
                    'menu': {
                        'id': 1,
                        'nombre': 'menu 1',
                        'descripcion': 'descripcion actual',
                        'fecha': '2025-04-27',
                        'actual': true
                    },
                    'combos': [
                        {
                            'id': 1,
                            'descripcion': 'sin descripciones',
                            'cantidad': 1,
                            'menu_producto_id': 1,
                            'producto': {
                                'id': 7,
                                'disponible': true,
                                'nombre': 'Sopa de maní',
                                'categoria': { 'id': 1, 'nombre': 'Plato secundario' },
                                'precio': '6.00',
                            },
                        }
                    ]
                },
            }
        ]
    },
    {
        'id': 5,
        'estado': 'completado',
        'monto_total': '92.40',
        'cliente': { 'id': 5, 'nombre': 'Lucía Fernandez', 'telefono': '68765432' },
        'usuario': { 'id': 1, 'name': 'Lidia Sarely' },
        'caja': {
            'monto_inicial': '100.00',
            'monto_total': '192.40',
            'fecha': '2025-04-27',
            'descripcion': 'venta cena',
            'usuario': { 'id': 1, 'name': 'Lidia Sarely' },
        },
        'menu_pedidos': [
            {
                'id': 8,
                'monto_total': '32.40',
                'cantidad': 1,
                'pedido_id': 5,
                'menu_producto': {
                    'id': 8,
                    'precio': "32.40",
                    'precio_combo': "35.00",
                    'descripcion': "con ensalada",
                    'completo': true,
                    'producto': {
                        'id': 8,
                        'disponible': true,
                        'nombre': 'Pechuga grillé',
                        'categoria': { 'id': 1, 'nombre': 'Plato principal' },
                        'precio': '32.40',
                    },
                    'menu': {
                        'id': 1,
                        'nombre': 'menu 1',
                        'descripcion': 'descripcion actual',
                        'fecha': '2025-04-27',
                        'actual': true
                    },
                    'combos': [
                        {
                            'id': 1,
                            'descripcion': 'sin descripciones',
                            'cantidad': 1,
                            'menu_producto_id': 1,
                            'producto': {
                                'id': 7,
                                'disponible': true,
                                'nombre': 'Sopa de maní',
                                'categoria': { 'id': 1, 'nombre': 'Plato secundario' },
                                'precio': '6.00',
                            },
                        }
                    ]
                },
            },
            {
                'id': 9,
                'monto_total': '30.00',
                'cantidad': 2,
                'pedido_id': 5,
                'menu_producto': {
                    'id': 9,
                    'precio': "30.00",
                    'precio_combo': "32.00",
                    'descripcion': "bebida",
                    'completo': false,
                    'producto': {
                        'id': 9,
                        'disponible': true,
                        'nombre': 'Jugo natural',
                        'categoria': { 'id': 2, 'nombre': 'Bebidas' },
                        'precio': '30.00',
                    },
                    'menu': {
                        'id': 1,
                        'nombre': 'menu 1',
                        'descripcion': 'descripcion actual',
                        'fecha': '2025-04-27',
                        'actual': true
                    },
                    'combos': [
                        {
                            'id': 1,
                            'descripcion': 'sin descripciones',
                            'cantidad': 1,
                            'menu_producto_id': 1,
                            'producto': {
                                'id': 7,
                                'disponible': true,
                                'nombre': 'Sopa de maní',
                                'categoria': { 'id': 1, 'nombre': 'Plato secundario' },
                                'precio': '6.00',
                            },
                        }
                    ]
                },
            }
        ]
    },
    {
        'id': 6,
        'estado': 'pendiente',
        'monto_total': '55.80',
        'cliente': { 'id': 6, 'nombre': 'Pedro Vargas', 'telefono': '71239876' },
        'usuario': { 'id': 1, 'name': 'Lidia Sarely' },
        'caja': {
            'monto_inicial': '50.00',
            'monto_total': '00.00',
            'fecha': '2025-04-27',
            'descripcion': 'ninguna',
            'usuario': { 'id': 1, 'name': 'Lidia Sarely' },
        },
        'menu_pedidos': [
            {
                'id': 10,
                'monto_total': '25.80',
                'cantidad': 1,
                'pedido_id': 6,
                'menu_producto': {
                    'id': 10,
                    'precio': "25.80",
                    'precio_combo': "28.00",
                    'descripcion': "sopa del día",
                    'completo': true,
                    'producto': {
                        'id': 10,
                        'disponible': true,
                        'nombre': 'Sopa de maní',
                        'categoria': { 'id': 4, 'nombre': 'Entradas' },
                        'precio': '6.80',
                    },
                    'menu': {
                        'id': 1,
                        'nombre': 'menu 1',
                        'descripcion': 'descripcion actual',
                        'fecha': '2025-04-27',
                        'actual': true
                    },
                    'combos': [
                        {
                            'id': 1,
                            'descripcion': 'sin descripciones',
                            'cantidad': 1,
                            'menu_producto_id': 1,
                            'producto': {
                                'id': 7,
                                'disponible': true,
                                'nombre': 'Sopa de maní',
                                'categoria': { 'id': 1, 'nombre': 'Plato secundario' },
                                'precio': '6.00',
                            },
                        }
                    ]
                },
            },
            {
                'id': 11,
                'monto_total': '15.00',
                'cantidad': 2,
                'pedido_id': 6,
                'menu_producto': {
                    'id': 11,
                    'precio': "15.00",
                    'precio_combo': "16.50",
                    'descripcion': "pan",
                    'completo': false,
                    'producto': {
                        'id': 11,
                        'disponible': true,
                        'nombre': 'Pan de ajo',
                        'categoria': { 'id': 5, 'nombre': 'Acompañamientos' },
                        'precio': '15.00',
                    },
                    'menu': {
                        'id': 1,
                        'nombre': 'menu 1',
                        'descripcion': 'descripcion actual',
                        'fecha': '2025-04-27',
                        'actual': true
                    },
                    'combos': []
                },
            }
        ]
    },
    {
        'id': 7,
        'estado': 'completado',
        'monto_total': '180.90',
        'cliente': { 'id': 7, 'nombre': 'Sofia Castro', 'telefono': '65432109' },
        'usuario': { 'id': 1, 'name': 'Lidia Sarely' },
        'caja': {
            'monto_inicial': '150.00',
            'monto_total': '330.90',
            'fecha': '2025-04-27',
            'descripcion': 'venta familiar',
            'usuario': { 'id': 1, 'name': 'Lidia Sarely' },
        },
        'menu_pedidos': [
            {
                'id': 12,
                'monto_total': '75.90',
                'cantidad': 1,
                'pedido_id': 7,
                'menu_producto': {
                    'id': 12,
                    'precio': "75.90",
                    'precio_combo': "80.00",
                    'descripcion': "plato familiar",
                    'completo': true,
                    'producto': {
                        'id': 12,
                        'disponible': true,
                        'nombre': 'Pique macho familiar',
                        'categoria': { 'id': 1, 'nombre': 'Plato principal' },
                        'precio': '75.90',
                    },
                    'menu': {
                        'id': 1,
                        'nombre': 'menu 1',
                        'descripcion': 'descripcion actual',
                        'fecha': '2025-04-27',
                        'actual': true
                    },
                    'combos': [
                        {
                            'id': 1,
                            'descripcion': 'sin descripciones',
                            'cantidad': 1,
                            'menu_producto_id': 1,
                            'producto': {
                                'id': 7,
                                'disponible': true,
                                'nombre': 'Sopa de maní',
                                'categoria': { 'id': 1, 'nombre': 'Plato secundario' },
                                'precio': '6.00',
                            },
                        }
                    ]
                },
            },
            {
                'id': 13,
                'monto_total': '35.00',
                'cantidad': 3,
                'pedido_id': 7,
                'menu_producto': {
                    'id': 13,
                    'precio': "35.00",
                    'precio_combo': "38.00",
                    'descripcion': "bebida grande",
                    'completo': false,
                    'producto': {
                        'id': 13,
                        'disponible': true,
                        'nombre': 'Limonada grande',
                        'categoria': { 'id': 2, 'nombre': 'Bebidas' },
                        'precio': '35.00',
                    },
                    'menu': {
                        'id': 1,
                        'nombre': 'menu 1',
                        'descripcion': 'descripcion actual',
                        'fecha': '2025-04-27',
                        'actual': true
                    },
                    'combos' : []
                },
            }
        ]
    },
    {
        'id': 8,
        'estado': 'pendiente',
        'monto_total': '42.50',
        'cliente': { 'id': 8, 'nombre': 'Jorge Rios', 'telefono': '69876543' },
        'usuario': { 'id': 1, 'name': 'Lidia Sarely' },
        'caja': {
            'monto_inicial': '50.00',
            'monto_total': '00.00',
            'fecha': '2025-04-27',
            'descripcion': 'ninguna',
            'usuario': { 'id': 1, 'name': 'Lidia Sarely' },
        },
        'menu_pedidos': [
            {
                'id': 14,
                'monto_total': '42.50',
                'cantidad': 1,
                'pedido_id': 8,
                'menu_producto': {
                    'id': 14,
                    'precio': "42.50",
                    'precio_combo': "45.00",
                    'descripcion': "desayuno completo",
                    'completo': true,
                    'producto': {
                        'id': 14,
                        'disponible': true,
                        'nombre': 'Desayuno americano',
                        'categoria': { 'id': 6, 'nombre': 'Desayunos' },
                        'precio': '42.50',
                    },
                    'menu': {
                        'id': 1,
                        'nombre': 'menu 1',
                        'descripcion': 'descripcion actual',
                        'fecha': '2025-04-27',
                        'actual': true
                    },
                    'combos': [
                        {
                            'id': 1,
                            'descripcion': 'sin descripciones',
                            'cantidad': 1,
                            'menu_producto_id': 1,
                            'producto': {
                                'id': 7,
                                'disponible': true,
                                'nombre': 'Sopa de maní',
                                'categoria': { 'id': 1, 'nombre': 'Plato secundario' },
                                'precio': '6.00',
                            },
                        }
                    ]
                },
            }
        ]
    },
    {
        'id': 9,
        'estado': 'completado',
        'monto_total': '150.25',
        'cliente': { 'id': 9, 'nombre': 'Elena Morales', 'telefono': '72349876' },
        'usuario': { 'id': 1, 'name': 'Lidia Sarely' },
        'caja': {
            'monto_inicial': '100.00',
            'monto_total': '250.25',
            'fecha': '2025-04-27',
            'descripcion': 'venta almuerzo ejecutivo',
            'usuario': { 'id': 1, 'name': 'Lidia Sarely' },
        },
        'menu_pedidos': [
            {
                'id': 15,
                'monto_total': '55.25',
                'cantidad': 1,
                'pedido_id': 9,
                'menu_producto': {
                    'id': 15,
                    'precio': "55.25",
                    'precio_combo': "60.00",
                    'descripcion': "plato ejecutivo",
                    'completo': true,
                    'producto': {
                        'id': 15,
                        'disponible': true,
                        'nombre': 'Filete mignon',
                        'categoria': { 'id': 1, 'nombre': 'Plato principal' },
                        'precio': '55.25',
                    },
                    'menu': {
                        'id': 1,
                        'nombre': 'menu 1',
                        'descripcion': 'descripcion actual',
                        'fecha': '2025-04-27',
                        'actual': true
                    },
                    'combos': [
                        {
                            'id': 1,
                            'descripcion': 'sin descripciones',
                            'cantidad': 1,
                            'menu_producto_id': 1,
                            'producto': {
                                'id': 7,
                                'disponible': true,
                                'nombre': 'Sopa de maní',
                                'categoria': { 'id': 1, 'nombre': 'Plato secundario' },
                                'precio': '6.00',
                            },
                        }
                    ]
                },
            },
            {
                'id': 16,
                'monto_total': '35.00',
                'cantidad': 2,
                'pedido_id': 9,
                'menu_producto': {
                    'id': 16,
                    'precio': "35.00",
                    'precio_combo': "38.00",
                    'descripcion': "vino",
                    'completo': false,
                    'producto': {
                        'id': 16,
                        'disponible': true,
                        'nombre': 'Vino tinto casa',
                        'categoria': { 'id': 2, 'nombre': 'Bebidas' },
                        'precio': '35.00',
                    },
                    'menu': {
                        'id': 1,
                        'nombre': 'menu 1',
                        'descripcion': 'descripcion actual',
                        'fecha': '2025-04-27',
                        'actual': true
                    },
                    'combos' : []
                },
            },
            {
                'id': 17,
                'monto_total': '25.00',
                'cantidad': 1,
                'pedido_id': 9,
                'menu_producto': {
                    'id': 17,
                    'precio': "25.00",
                    'precio_combo': "27.00",
                    'descripcion': "postre especial",
                    'completo': false,
                    'producto': {
                        'id': 17,
                        'disponible': true,
                        'nombre': 'Tiramisú',
                        'categoria': { 'id': 3, 'nombre': 'Postres' },
                        'precio': '25.00',
                    },
                    'menu': {
                        'id': 1,
                        'nombre': 'menu 1',
                        'descripcion': 'descripcion actual',
                        'fecha': '2025-04-27',
                        'actual': true
                    },
                    'combos' : []
                },
            }
        ]
    },
    {
        'id': 10,
        'estado': 'pendiente',
        'monto_total': '95.60',
        'cliente': { 'id': 10, 'nombre': 'Daniel Torrez', 'telefono': '71234598' },
        'usuario': { 'id': 1, 'name': 'Lidia Sarely' },
        'caja': {
            'monto_inicial': '50.00',
            'monto_total': '00.00',
            'fecha': '2025-04-27',
            'descripcion': 'ninguna',
            'usuario': { 'id': 1, 'name': 'Lidia Sarely' },
        },
        'menu_pedidos': [
            {
                'id': 18,
                'monto_total': '45.60',
                'cantidad': 1,
                'pedido_id': 10,
                'menu_producto': {
                    'id': 18,
                    'precio': "45.60",
                    'precio_combo': "50.00",
                    'descripcion': "plato vegetariano",
                    'completo': true,
                    'producto': {
                        'id': 18,
                        'disponible': true,
                        'nombre': 'Lasagna vegetariana',
                        'categoria': { 'id': 1, 'nombre': 'Plato principal' },
                        'precio': '45.60',
                    },
                    'menu': {
                        'id': 1,
                        'nombre': 'menu 1',
                        'descripcion': 'descripcion actual',
                        'fecha': '2025-04-27',
                        'actual': true
                    },
                    'combos': [
                        {
                            'id': 1,
                            'descripcion': 'sin descripciones',
                            'cantidad': 1,
                            'menu_producto_id': 1,
                            'producto': {
                                'id': 7,
                                'disponible': true,
                                'nombre': 'Sopa de maní',
                                'categoria': { 'id': 1, 'nombre': 'Plato secundario' },
                                'precio': '6.00',
                            },
                        }
                    ]
                },
            },
            {
                'id': 19,
                'monto_total': '25.00',
                'cantidad': 2,
                'pedido_id': 10,
                'menu_producto': {
                    'id': 19,
                    'precio': "25.00",
                    'precio_combo': "27.00",
                    'descripcion': "ensalada",
                    'completo': false,
                    'producto': {
                        'id': 19,
                        'disponible': true,
                        'nombre': 'Ensalada César',
                        'categoria': { 'id': 7, 'nombre': 'Ensaladas' },
                        'precio': '25.00',
                    },
                    'menu': {
                        'id': 1,
                        'nombre': 'menu 1',
                        'descripcion': 'descripcion actual',
                        'fecha': '2025-04-27',
                        'actual': true
                    },
                    'combos' : []
                },
            }
        ]
    }
];
