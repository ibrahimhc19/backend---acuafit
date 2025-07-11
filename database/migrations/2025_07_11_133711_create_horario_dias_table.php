<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('horario_dias', function (Blueprint $table) {
            $table->integer('horario_id');
        });
        DB::statement("alter table \"horario_dias\" add column \"dia\" dia_semana not null");
        DB::statement("alter table \"horario_dias\" add primary key (\"horario_id\", \"dia\")");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('horario_dias');
    }
};
