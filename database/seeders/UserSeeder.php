<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'Admin Principal',
                'email' => 'admin@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('Password123'), // Contraseña segura
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'name' => 'Usuario de Prueba',
                'email' => 'usuario@example.com',
                'email_verified_at' => now(),
                'password' => Hash::make('Usuario123'),
                'remember_token' => null,
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
