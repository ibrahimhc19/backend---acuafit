<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Factura extends Model
{
    use HasFactory;
    protected  $table = 'facturaciones';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;

    protected $fillable = [
        'estudiante_id',
        'pagado_por',
        'tipo_documento_pagador',
        'documento_pagador',
        'correo_pagador',
        'direccion_pagador',
        'celular_pagador',
        'concepto',
        'categoria_pago',
        'valor_curso',
        'valor_matricula',
        'sede_id',
        'fecha_limite_exoneracion'
    ];
    protected $appends = ['saldo_final'];

    public function estudiante()
    {
        return $this->belongsTo(Estudiante::class);
    }

    public function sede()
    {
        return $this->belongsTo(Sede::class);
    }

    public function pagos()
    {
        return $this->hasMany(Pago::class);
    }

    public function getSaldoFinalAttribute()
    {
        $total = $this->valor_curso + $this->valor_matricula;
        $abonado = $this->pagos()->sum('monto');
        return $total - $abonado;
    }
}
