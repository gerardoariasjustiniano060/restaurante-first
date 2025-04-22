<?php

namespace Database\Seeders;

use App\Models\ComboModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ComboSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $combos = [
            // Platos principales (completo = true)
            [
                'descripcion' => 'sin descripciones',
                'producto_id' => 20,
                'menu_producto_id' => 1,
            ],
            [
                'descripcion' => 'sin descripciones',
                'producto_id' => 20,
                'menu_producto_id' => 2,
            ],
            [
                'descripcion' => 'sin descripciones',
                'producto_id' => 20,
                'menu_producto_id' => 3,
            ],
            [
                'descripcion' => 'sin descripciones',
                'producto_id' => 20,
                'menu_producto_id' => 4,
            ],
            [
                'descripcion' => 'sin descripciones',
                'producto_id' => 20,
                'menu_producto_id' => 5,
            ],
        ];

        foreach ($combos as $key => $combo) {
            ComboModel::create([
                'descripcion' => $combo['descripcion'],
                'producto_id' => $combo['producto_id'],
                'menu_producto_id' => $combo['menu_producto_id'],
            ]);
        }
    }
}
