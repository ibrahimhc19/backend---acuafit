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
        Schema::create('estudiantes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombres', 100);
            $table->string('apellidos', 100);
            $table->string('tipo_documento', 10);
            $table->integer('edad');
            $table->string('documento_identidad', 50)->unique('estudiante_documento_identidad');
            $table->integer('acudiente_id')->nullable()->index('estudiante_acudiente_id');
            $table->date('fecha_inscripcion');
            $table->string('correo', 100)->nullable();
            $table->string('direccion')->nullable();
            $table->string('telefono', 20)->nullable();
            $table->string('rut', 100)->nullable();
            $table->boolean('autoriza_uso_imagen')->default(false);
            $table->boolean('acepta_reglamento')->default(false);
            $table->text('observaciones')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('estudiantes');
    }
};
