<?php

namespace Database\Seeders;

use App\Models\CategoriaModel;
use App\Models\ProductoModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener IDs de categorías
        $segundoId = CategoriaModel::where('nombre', 'Segundo')->first()->id;
        $sopaId = CategoriaModel::where('nombre', 'Sopa')->first()->id;
        $sodaRefrescoId = CategoriaModel::where('nombre', 'Soda/Refresco')->first()->id;

        // Productos de categoría "Segundo" (5 productos)
        $segundos = [
            ['nombre' => 'Majadito de gallina batido', 'categoria_id' => $segundoId, 'precio' => 17.00],
            ['nombre' => 'Majadito tostado', 'categoria_id' => $segundoId, 'precio' => 17.00],
            ['nombre' => 'Fideo salteado', 'categoria_id' => $segundoId, 'precio' => 17.00],
            ['nombre' => 'Milanesa de pollo', 'categoria_id' => $segundoId, 'precio' => 17.00],
            ['nombre' => 'Milanesa de carne', 'categoria_id' => $segundoId, 'precio' => 17.00],
            ['nombre' => 'Pollo al jugo', 'categoria_id' => $segundoId, 'precio' => 20.00],
            ['nombre' => 'Salpicon', 'categoria_id' => $segundoId, 'precio' => 17.00],
            ['nombre' => 'Chuleta de res', 'categoria_id' => $segundoId, 'precio' => 17.00],
            ['nombre' => 'Bife', 'categoria_id' => $segundoId, 'precio' => 17.00],
            ['nombre' => 'Picante de gallina', 'categoria_id' => $segundoId, 'precio' => 17.00],

            ['nombre' => 'Aji de lengua', 'categoria_id' => $segundoId, 'precio' => 20.00],
            ['nombre' => 'Rapi', 'categoria_id' => $segundoId, 'precio' => 20.00],
            ['nombre' => 'Queperí', 'categoria_id' => $segundoId, 'precio' => 20.00],
            ['nombre' => 'Chancho al horno', 'categoria_id' => $segundoId, 'precio' => 20.00],
            ['nombre' => 'Feioda', 'categoria_id' => $segundoId, 'precio' => 35.00],

            ['nombre' => 'Pollo al horno', 'categoria_id' => $segundoId, 'precio' => 17.00],
            ['nombre' => 'Lasaña de pollo', 'categoria_id' => $segundoId, 'precio' => 17.00],
            ['nombre' => 'Lasaña de carne', 'categoria_id' => $segundoId, 'precio' => 17.00],
        ];

        // Productos de categoría "Sopa" (5 productos)
        $sopas = [
            // 19 - 20 - 21 - 22
            ['nombre' => 'Sopa de fideo', 'categoria_id' => $sopaId, 'precio' => 6.00],
            ['nombre' => 'Sopa de maní', 'categoria_id' => $sopaId, 'precio' => 6.50],
            ['nombre' => 'Sopa de frangollo', 'categoria_id' => $sopaId, 'precio' => 6.00],
            ['nombre' => 'Sopa de Verduras', 'categoria_id' => $sopaId, 'precio' => 6.50],
        ]; // 24

        // Productos de categoría "Soda/Refresco" (6 productos)
        $bebidas = [
            // Refrescos
            ['nombre' => 'Coca cola persona', 'categoria_id' => $sodaRefrescoId, 'precio' => 7.00],
            ['nombre' => 'Coca Cola peque', 'categoria_id' => $sodaRefrescoId, 'precio' => 3.00],
            ['nombre' => 'Fanta peque', 'categoria_id' => $sodaRefrescoId, 'precio' => 7.00],
            ['nombre' => 'Fanta persona', 'categoria_id' => $sodaRefrescoId, 'precio' => 3.00],
            ['nombre' => 'Sprite peque', 'categoria_id' => $sodaRefrescoId, 'precio' => 3.00],
            ['nombre' => 'Sprite persona', 'categoria_id' => $sodaRefrescoId, 'precio' => 7.00],

            ['nombre' => 'Refresco baso', 'categoria_id' => $sodaRefrescoId, 'precio' => 2.00],
            ['nombre' => 'Refresco grande jarra', 'categoria_id' => $sodaRefrescoId, 'precio' => 8.00],
            ['nombre' => 'Refresco pequeña jarra', 'categoria_id' => $sodaRefrescoId, 'precio' => 4.00],
        ];

        // Combinar todos los productos
        $productos = array_merge($segundos, $sopas, $bebidas);

        // Insertar productos
        foreach ($productos as $producto) {
            ProductoModel::create(array_merge($producto, [
                'disponible' => true,
                'created_at' => now(),
                'updated_at' => now()
            ]));
        }
    }
}
