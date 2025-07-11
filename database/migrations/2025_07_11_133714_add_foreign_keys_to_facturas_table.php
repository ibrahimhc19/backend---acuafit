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
        Schema::table('facturas', function (Blueprint $table) {
            $table->foreign(['estudiante_id'], 'facturas_ibfk_1')->references(['id'])->on('estudiantes')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign(['sede_id'], 'facturas_ibfk_2')->references(['id'])->on('sedes')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('facturas', function (Blueprint $table) {
            $table->dropForeign('facturas_ibfk_1');
            $table->dropForeign('facturas_ibfk_2');
        });
    }
};
