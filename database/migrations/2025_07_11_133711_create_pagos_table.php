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
        Schema::create('pagos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('facturacion_id')->index('fk_pagos_facturacion');
            $table->integer('estudiante_id')->index('pagos_estudiante_id');
            $table->decimal('monto', 10);
            $table->date('fecha_pago');
            $table->string('metodo_pago', 25);
            $table->string('numero_referencia_pago', 100)->nullable();
            $table->string('soporte_pago')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pagos');
    }
};
