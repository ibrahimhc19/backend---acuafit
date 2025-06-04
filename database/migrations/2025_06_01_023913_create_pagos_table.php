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
            $table->integer('id', true);
            $table->integer('facturacion_id')->index('fk_pagos_facturacion');
            $table->integer('estudiante_id')->index('estudiante_id');
            $table->decimal('monto', 10);
            $table->date('fecha_pago')->default('CURRENT_DATE');
            $table->enum('metodo_pago', ['Efectivo', 'Transferencia', 'Tarjeta']);
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
