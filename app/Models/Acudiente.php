<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Acudiente extends Model
{
    use HasFactory;

    protected $table = 'representantes';
    protected $primaryKey = 'id';
    public $incrementing = true;
    protected $keyType = 'int';
    public $timestamps = false;

    protected $fillable = [
        'nombres',
        'apellidos',
        'tipo_documento',
        'documento_identidad',
        'telefono',
        'email',
        'rut'
    ];

    protected $casts = [
        'id' => 'integer',
        'tipo_documento' => 'string'
    ];

    public function estudiantes(){
        return $this->hasMany(Estudiante::class, 'representante_id', 'id');
    }

}
