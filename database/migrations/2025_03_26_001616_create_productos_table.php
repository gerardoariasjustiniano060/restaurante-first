<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->id();
            $table->boolean('disponible')->default(true);
            $table->string('nombre', 100);
            // Clave foránea para categorías
            $table->foreignId('categoria_id')
                ->references('id')
                ->on('categorias')
                ->onDelete('cascade'); // o 'cascade' según tu necesidad
            $table->decimal('precio', 8, 2); // <-- NUEVO CAMPO (8 dígitos totales, 2 decimales)
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
