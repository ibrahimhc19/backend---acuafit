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
        Schema::table('pagos', function (Blueprint $table) {
            $table->foreign(['facturacion_id'], 'fk_pagos_facturacion')->references(['id'])->on('facturaciones')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign(['estudiante_id'], 'pagos_ibfk_1')->references(['id'])->on('estudiantes')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pagos', function (Blueprint $table) {
            $table->dropForeign('fk_pagos_facturacion');
            $table->dropForeign('pagos_ibfk_1');
        });
    }
};
