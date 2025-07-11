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
        Schema::table('grupos', function (Blueprint $table) {
            $table->foreign(['categoria_id'], 'grupos_categoria_id_fkey')->references(['id'])->on('categorias')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['horario_id'], 'grupos_horario_id_fkey')->references(['id'])->on('horarios')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['sede_id'], 'grupos_sede_id_fkey')->references(['id'])->on('sedes')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('grupos', function (Blueprint $table) {
            $table->dropForeign('grupos_categoria_id_fkey');
            $table->dropForeign('grupos_horario_id_fkey');
            $table->dropForeign('grupos_sede_id_fkey');
        });
    }
};
