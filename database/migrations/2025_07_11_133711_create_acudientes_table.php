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
        Schema::create('acudientes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombres', 100);
            $table->string('apellidos', 100);
            $table->string('tipo_documento', 10);
            $table->string('documento_identidad', 50)->unique('acudiente_documento_identidad');
            $table->string('telefono', 20)->nullable();
            $table->string('email', 100)->nullable();
            $table->string('rut', 100)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('acudientes');
    }
};
