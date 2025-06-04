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
        Schema::table('estudiantes', function (Blueprint $table) {
            $table->foreign(['representante_id'], 'estudiantes_ibfk_1')->references(['id'])->on('representantes')->onUpdate('restrict')->onDelete('set null');
            $table->foreign(['sede_id'], 'estudiantes_ibfk_2')->references(['id'])->on('sedes')->onUpdate('restrict')->onDelete('cascade');
            $table->foreign(['horario_id'], 'estudiantes_ibfk_3')->references(['id'])->on('horarios')->onUpdate('restrict')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('estudiantes', function (Blueprint $table) {
            $table->dropForeign('estudiantes_ibfk_1');
            $table->dropForeign('estudiantes_ibfk_2');
            $table->dropForeign('estudiantes_ibfk_3');
        });
    }
};
