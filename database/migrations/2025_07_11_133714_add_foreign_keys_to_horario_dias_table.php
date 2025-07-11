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
        Schema::table('horario_dias', function (Blueprint $table) {
            $table->foreign(['horario_id'], 'horario_dias_horario_id_fkey')->references(['id'])->on('horarios')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('horario_dias', function (Blueprint $table) {
            $table->dropForeign('horario_dias_horario_id_fkey');
        });
    }
};
