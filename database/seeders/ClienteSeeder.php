<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ClienteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('es_ES'); // Configura Faker para datos en español

        // Array de 10 clientes de ejemplo
        $clientes = [
            [
                'nombre_completo' => 'Juan Pérez López',
                'telefono' => '+51 987 654 321',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nombre_completo' => 'María García Rodríguez',
                'telefono' => '+51 987 123 456',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nombre_completo' => 'Carlos Martínez Sánchez',
                'telefono' => '+51 912 345 678',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nombre_completo' => 'Ana Fernández González',
                'telefono' => '+51 934 567 890',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nombre_completo' => 'Luis Díaz Jiménez',
                'telefono' => '+51 956 789 012',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nombre_completo' => 'Sofía Ruiz Hernández',
                'telefono' => '+51 978 901 234',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nombre_completo' => 'Pedro Gómez Martín',
                'telefono' => '+51 991 012 345',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nombre_completo' => 'Laura Moreno Álvarez',
                'telefono' => '+51 923 456 789',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nombre_completo' => 'Jorge Navarro Romero',
                'telefono' => '+51 945 678 901',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'nombre_completo' => 'Elena Torres Molina',
                'telefono' => '+51 967 890 123',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ];

        // Insertar usando Query Builder
        DB::table('clientes')->insert($clientes);

        // Alternativa con Faker para más clientes (descomenta si necesitas)
        /*
        for ($i = 0; $i < 10; $i++) {
            Cliente::create([
                'nombre_completo' => $faker->name,
                'telefono' => '+51 9' . $faker->numerify('## ### ####'),
            ]);
        } */
    }
}
