<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CategoriaSeeder::class,
            ClienteSeeder::class,
            UserSeeder::class,
            ProductoSeeder::class,
            MenuSeeder::class,
            ComboSeeder::class,
            StockSeeder::class
        ]);
    }
}
