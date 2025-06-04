<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;
use Illuminate\Support\Facades\Log;
use App\Models\Estudiante;
use Illuminate\Support\Facades\Storage;

class Pago extends Model
{
    use HasFactory;

    protected $table = 'pagos';
    protected $primaryKey = 'id';
    public $incrementing= true;
    protected $keyType = 'int';
    public $timestamps=false;
    protected $fillable = [
        'facturacion_id',
        'fecha_pago',
        'monto',
        'metodo_pago',
        'numero_referencia_pago',
        'soporte_pago'
    ];

    public function setFechaPagoAttribute($value)
    {
        if ($value) {
            try {

                $this->attributes['fecha_pago'] = Carbon::createFromFormat('d/m/Y', $value)->toDateString();
            } catch (\Exception $e) {
                $this->attributes['fecha_pago'] = $value;
                Log::warning("Falló la conversión de fecha en el mutador para Pago: " . $value . ". Error: " . $e->getMessage());
            }
        } else {
            $this->attributes['fecha_pago'] = null;
        }
    }

    protected $casts = [
        'id' => 'integer',
        "fecha_pago"=> "date",
        "monto" => "decimal:2"
    ];

    protected static function boot()
{
    parent::boot();
    static::deleting(function ($pago) {
        if ($pago->soporte_pago) {
            Storage::disk('public')->delete($pago->soporte_pago);
            Log::info("Archivo de soporte {$pago->soporte_pago} eliminado para Pago ID: {$pago->id}");
        }
    });
}

    public function estudiante(){
        return $this->belongsTo(Estudiante::class,"estudiante_id");
    }

    public function facturacion()
    {
        return $this->belongsTo(Facturacion::class);
    }
}
