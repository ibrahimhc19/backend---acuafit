<?php

use Illuminate\Support\Facades\Route;
use App\Models\Estudiante;
use Illuminate\Http\Request;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\PagoController;
use App\Http\Controllers\SedeController;
use App\Http\Controllers\HorarioController;
use App\Http\Controllers\RepresentanteController;
use App\Http\Controllers\FacturaController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\Auth\LoginController;


Route::get('/', function () {
    return view('welcome');
});
// Autenticación
Route::post('/login', [LoginController::class, 'login']);
Route::get('/user', [LoginController::class, 'user'])->middleware('auth:sanctum');
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/auth/google/redirect', [GoogleController::class, 'redirect'])->name('auth.google.redirect');
Route::get('/auth/google/callback', [GoogleController::class, 'callback'])->name('auth.google.callback');

// Inscripciones y otros
Route::get('/registrar', [EstudianteController::class, 'create'])->name('inscripciones.create');
Route::get('/exito', function () {
    return view('success');
});

// Estudiantes
Route::post('/estudiante', [EstudianteController::class, 'store'])->middleware('auth:sanctum');
Route::get('/estudiantes', [EstudianteController::class, 'index'])->middleware('auth:sanctum');
Route::get('/estudiante/{id}', [EstudianteController::class, 'show'])->middleware('auth:sanctum');
Route::patch('/estudiante/{id}', [EstudianteController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/estudiante/{id}', [EstudianteController::class, 'destroy'])->middleware('auth:sanctum');

// Pagos
Route::post('/pago', [PagoController::class, 'store'])->middleware('auth:sanctum');
Route::get('/pagos', [PagoController::class, 'index'])->middleware('auth:sanctum');
Route::get('/pago/{id}', [PagoController::class, 'show'])->middleware('auth:sanctum');
Route::patch('/pago/{id}', [PagoController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/pago/{id}', [PagoController::class, 'destroy'])->middleware('auth:sanctum');

// Sedes
Route::post('/sede', [SedeController::class, 'store'])->middleware('auth:sanctum');
Route::get('/sedes', [SedeController::class, 'index'])->middleware('auth:sanctum');
Route::get('/sede/{id}', [SedeController::class, 'show'])->middleware('auth:sanctum');
Route::patch('/sede/{id}', [SedeController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/sede/{id}', [SedeController::class, 'destroy'])->middleware('auth:sanctum');

// Horarios
Route::post('/horario', [HorarioController::class, 'store'])->middleware('auth:sanctum');
Route::get('/horarios', [HorarioController::class, 'index'])->middleware('auth:sanctum');
Route::get('/horario/{id}', [HorarioController::class, 'show'])->middleware('auth:sanctum');
Route::patch('/horario/{id}', [HorarioController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/horario/{id}', [HorarioController::class, 'destroy'])->middleware('auth:sanctum');

// Acudientes
Route::post('/acudiente', [RepresentanteController::class, 'store'])->middleware('auth:sanctum');
Route::get('/acudientes', [RepresentanteController::class, 'index'])->middleware('auth:sanctum');
Route::get('/acudiente/{id}', [RepresentanteController::class, 'show'])->middleware('auth:sanctum');
Route::patch('/acudiente/{id}', [RepresentanteController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/acudiente/{id}', [RepresentanteController::class, 'destroy'])->middleware('auth:sanctum');

// Facturas
// Route::post('/factura', [FacturaController::class, 'store'])->middleware('auth:sanctum');
// Route::get('/facturas', [FacturaController::class, 'index'])->middleware('auth:sanctum');
// Route::get('/factura/{id}', [FacturaController::class, 'show'])->middleware('auth:sanctum');
// Route::patch('/factura/{id}', [FacturaController::class, 'update'])->middleware('auth:sanctum');
// Route::delete('/factura/{id}', [FacturaController::class, 'destroy'])->middleware('auth:sanctum');
