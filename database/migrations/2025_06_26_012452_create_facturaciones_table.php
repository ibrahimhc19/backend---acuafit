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
        Schema::create('facturaciones', function (Blueprint $table) {
            $table->integer('id', true);
            $table->integer('estudiante_id')->index('estudiante_id');
            $table->string('pagado_por', 25);
            $table->string('tipo_documento_pagador', 25);
            $table->string('documento_pagador', 50);
            $table->string('correo_pagador', 100)->nullable();
            $table->string('direccion_pagador')->nullable();
            $table->string('celular_pagador', 20)->nullable();
            $table->string('concepto', 25);
            $table->string('categoria_pago', 25);
            $table->decimal('valor_curso', 10);
            $table->decimal('valor_matricula', 10)->nullable()->default(0);
            $table->integer('sede_id')->index('sede_id');
            $table->date('fecha_limite_exoneracion')->nullable();
            $table->dateTime('created_at')->nullable()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facturaciones');
    }
};
