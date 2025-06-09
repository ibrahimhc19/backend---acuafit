<?php
use Illuminate\Support\Facades\Route;
use App\Models\Estudiante;
use Illuminate\Http\Request;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\SedeController;
use App\Http\Controllers\HorarioController;
use App\Http\Controllers\AcudienteController;
use App\Http\Controllers\FacturaController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\Auth\LoginController;


Route::post('/factura', [FacturaController::class, 'store']);
Route::get('/facturas', [FacturaController::class, 'index']);
Route::get('/factura/{id}', [FacturaController::class, 'show']);
Route::patch('/factura/{id}', [FacturaController::class, 'update']);
Route::delete('/factura/{id}', [FacturaController::class, 'destroy']);

// Route::get('/estudiantes', [EstudianteController::class, 'index']);
