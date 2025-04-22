<?php

namespace Database\Seeders;

use App\Models\StockModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StockModel::create([
            'cantidad_maxima' => 15,
            'menu_producto_id' => 1,
        ]);

        StockModel::create([
            'cantidad_maxima' => 15,
            'menu_producto_id' => 2,
        ]);

        StockModel::create([
            'cantidad_maxima' => 15,
            'menu_producto_id' => 3,
        ]);

        StockModel::create([
            'cantidad_maxima' => 15,
            'menu_producto_id' => 4,
        ]);

        StockModel::create([
            'cantidad_maxima' => 15,
            'menu_producto_id' => 5,
        ]);
    }
}
