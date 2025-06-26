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
        Schema::table('facturaciones', function (Blueprint $table) {
            $table->foreign(['estudiante_id'], 'facturaciones_ibfk_1')->references(['id'])->on('estudiantes')->onUpdate('no action')->onDelete('cascade');
            $table->foreign(['sede_id'], 'facturaciones_ibfk_2')->references(['id'])->on('sedes')->onUpdate('no action')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('facturaciones', function (Blueprint $table) {
            $table->dropForeign('facturaciones_ibfk_1');
            $table->dropForeign('facturaciones_ibfk_2');
        });
    }
};
