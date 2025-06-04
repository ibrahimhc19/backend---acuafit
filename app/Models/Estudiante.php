<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

class Estudiante extends Model
{
    use HasFactory;

    /**
     * El nombre de la tabla asociada con el modelo.
     *
     * @var string
     */
    protected $table = 'estudiantes';

    /**
     * La clave primaria para el modelo.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * Indica si la clave primaria es autoincremental.
     *
     * @var bool
     */
    public $incrementing = true;

    /**
     * El tipo de dato de la clave primaria.
     *
     * @var string
     */
    protected $keyType = 'int';

    /**
     * Indica si el modelo debe tener timestamps (created_at y updated_at).
     * Tu migración no incluye timestamps, así que lo ponemos a false si no los vas a añadir.
     * Si decides añadirlos a tu tabla, ponlo a true o elimina esta línea.
     *
     * @var bool
     */
    public $timestamps = false; // Asumiendo que no tienes created_at y updated_at

    /**
     * Los atributos que se pueden asignar masivamente.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nombres',
        'apellidos',
        'tipo_documento',
        'edad',
        'documento_identidad',
        'representante_id',
        'sede_id',
        'horario_id',
        'fecha_inscripcion',
        'correo',
        'direccion',
        'telefono',
        'rut',
        'autoriza_uso_imagen',
        'acepta_reglamento',
        'observaciones',
    ];

    public function setFechaInscripcionAttribute($value)
    {
        if ($value) {
            try {

                $this->attributes['fecha_inscripcion'] = Carbon::createFromFormat('d/m/Y', $value)->toDateString();
            } catch (\Exception $e) {
                $this->attributes['fecha_inscripcion'] = $value;
                Log::warning("Falló la conversión de fecha en el mutador para la inscripción del estudiante: " . $value . ". Error: " . $e->getMessage());
            }
        } else {
            $this->attributes['fecha_inscripcion'] = null;
        }
    }

    /**
     * Los atributos que deben ser casteados a tipos nativos.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'id' => 'integer',
        'fecha_inscripcion' => 'date',
        'autoriza_uso_imagen' => 'boolean',
        'acepta_reglamento' => 'boolean',
        'edad' => 'integer',
        'representante_id' => 'integer',
        'sede_id' => 'integer',
        'horario_id' => 'integer',
    ];


    public function acudiente()
    {
        return $this->belongsTo(Acudiente::class, 'representante_id');
    }

    public function sede()
    {
        return $this->belongsTo(Sede::class, 'sede_id');
    }

    public function horario()
    {
        return $this->belongsTo(Horario::class, 'horario_id');
    }
    public function pagos()
    {
        return $this->hasMany(Pago::class, 'estudiante_id', 'id');

    }
}
