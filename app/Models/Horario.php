<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Horario extends Model
{
    use HasFactory;

    protected $table = 'horarios';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;
    protected $fillable = [
        'tipo_grupo',
        'sede_id',
        'dia_semana',
        'hora_inicio',
        'hora_fin'
    ];

    protected $casts = [
        'id' => 'integer',
        'sede_id' => 'integer',
        'hora_inicio' => 'datetime:H:i:s',
        'hora_fin' => 'datetime:H:i:s',
        'tipo_grupo' => 'string',
        'dia_semana' => 'string'
    ];



    public function sede()
    {
        return $this->belongsTo(Sede::class, 'sede_id');
    }

    public function estudiantes()
    {
        return $this->hasMany(Estudiante::class, 'horario_id');
    }
}
