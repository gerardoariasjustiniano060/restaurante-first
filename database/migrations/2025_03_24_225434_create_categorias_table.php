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
        Schema::create('categorias', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 100);  // Campo para el nombre (ajusta el tamaño según necesites)
            $table->string('icono', 10)->nullable();  // Campo para el nombre (ajusta el tamaño según necesites)
            $table->enum('tipo', ['principal', 'secundario', 'terciario'])->default('principal');
            $table->timestamps();           // created_at y updated_at
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categorias');
    }
};
