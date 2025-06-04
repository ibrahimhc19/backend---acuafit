<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Sede extends Model
{
    use HasFactory;

    protected $table = 'sedes';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;
    protected $fillable = [
        'nombre',
        'direccion'
    ];

    protected $casts = [
    'id' => 'integer',
    'nombre' => 'string',
    'direccion' => 'string',
];

public function estudiantes()
{
    return $this->hasMany(Estudiante::class, 'sede_id');
}

public function horarios()
{
    return $this->hasMany(Horario::class, 'sede_id');
}

}
