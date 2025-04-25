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
        Schema::create('menu_producto', function (Blueprint $table) {
            $table->id();
            $table->decimal('precio', 8, 2);
            $table->decimal('precio_combo', 8, 2)->nullable();
            $table->string('descripcion')->nullable();
            $table->boolean('completo')->default(false);

            $table->foreignId('producto_id')
                ->references('id')
                ->on('productos')
                ->onDelete('cascade');

            $table->foreignId('menu_id')
                ->references('id')
                ->on('menus')
                ->onDelete('cascade');

            $table->softDeletes();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menu_producto');
    }
};
