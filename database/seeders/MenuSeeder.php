<?php

namespace Database\Seeders;

use App\Livewire\Menus\MenuProducto;
use App\Models\ComboModel;
use App\Models\MenuModel;
use App\Models\MenuProductoModel;
use App\Models\ProductoModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $menu = MenuModel::create([
            'nombre' => 'Menú 1',
            'descripcion' => 'Descripciones 1',
            'actual' => false
        ]);

        $menu_producto = [
            [
                'precio' => (ProductoModel::find(13))->precio,
                'precio_combo' => (ProductoModel::find(13))->precio ,
                'descripcion' => 'sin descripciones',
                'producto_id' => 13,
                'completo' => true
            ],
            [
                'precio' => (ProductoModel::find(14))->precio,
                'precio_combo' => (ProductoModel::find(14))->precio ,
                'descripcion' => 'sin descripciones',
                'producto_id' => 14,
                'completo' => true
            ],
            [
                'precio' => (ProductoModel::find(16))->precio,
                'precio_combo' => (ProductoModel::find(16))->precio ,
                'descripcion' => 'sin descripciones',
                'producto_id' => 16,
                'completo' => true
            ],
            [
                'precio' => (ProductoModel::find(17))->precio,
                'precio_combo' => (ProductoModel::find(17))->precio ,
                'descripcion' => 'sin descripciones',
                'producto_id' => 17,
                'completo' => true
            ],
            [
                'precio' => (ProductoModel::find(18))->precio,
                'precio_combo' => (ProductoModel::find(18))->precio ,
                'descripcion' => 'sin descripciones',
                'producto_id' => 18,
                'completo' => true
            ],

            // Sopa (producto_id = 20 como solicitaste)
            [
                'precio' => (ProductoModel::find(20))->precio,
                'precio_combo' => (ProductoModel::find(20))->precio ,
                'descripcion' => 'sin descripciones',
                'producto_id' => 20,
                'completo' => false
            ],

            // Bebidas (completo = false)
            [
                'precio' => (ProductoModel::find(29))->precio,
                'precio_combo' => (ProductoModel::find(29))->precio ,
                'descripcion' => 'sin descripciones',
                'producto_id' => 29,
                'completo' => false
            ],
            [
                'precio' => (ProductoModel::find(30))->precio,
                'precio_combo' => (ProductoModel::find(30))->precio ,
                'descripcion' => 'sin descripciones',
                'producto_id' => 30,
                'completo' => false
            ],
            [
                'precio' => (ProductoModel::find(31))->precio,
                'precio_combo' => (ProductoModel::find(31))->precio ,
                'descripcion' => 'sin descripciones',
                'producto_id' => 31,
                'completo' => false
            ]
        ];

        foreach ($menu_producto as $key => $item) {
            MenuProductoModel::create([
                'precio' => $item['precio'],
                'precio_combo' => $item['precio_combo'],
                'descripcion' => $item['descripcion'],
                'producto_id' => $item['producto_id'],
                'completo' => $item['completo'],
                'menu_id' => $menu->id,
            ]);
        }
    }
}
