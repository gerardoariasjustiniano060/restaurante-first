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
        /*        stocks
            1   (1  30  hoy)
            2   (2  15  hoy)
            3   (3  10  hoy)
            4   (4  20  hoy)
            5   (5  15  hoy)
            6   (6  20  hoy)
            7   (7  10  hoy)
        */
        Schema::create('stocks', function (Blueprint $table) {
            $table->id();

            $table->bigInteger('cantidad_maxima')->default(0);
            $table->date('fecha')->default(date('Y-m-d'));

            $table->foreignId('menu_producto_id')
                ->references('id')
                ->on('menu_producto')
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
        Schema::dropIfExists('stocks');
    }
};
