<?php

namespace Database\Seeders;

use App\Models\CategoriaModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('categorias')->insert([
            [
                'nombre' => 'Segundo',
                'icono' => '🍛',
                'tipo' => CategoriaModel::PRINCIPAL,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nombre' => 'Sopa',
                'icono' => '🍜',
                'tipo' => CategoriaModel::SECUNDARIO,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nombre' => 'Soda/Refresco',
                'icono' => '🥤',
                'tipo' => CategoriaModel::TERCIARIO,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
