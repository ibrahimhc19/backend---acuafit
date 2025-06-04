<?php

namespace App\Http\Controllers;

use App\Models\Horario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Validation\Rule;

class HorarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $horarios = Horario::query()->paginate(15);
        return response()->json($horarios);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tipo_grupo' => ['required', 'string', Rule::in(['Adultos', 'Niños'])],
            'sede_id' => 'required|integer|exists:sedes,id',
            'dia_semana' => ['required', 'string', Rule::in(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'])],
            'hora_inicio' => 'required|date_format:H:i:s',
            'hora_fin' => 'required|date_format:H:i:s|after:hora_inicio',
        ], [
            'tipo_grupo.required' => 'El grupo es obligatorio',
            'sede_id.required' => 'La sede es obligatoria',
            'dia_semana.required' => 'El día de clase es obligatorio',
            'hora_inicio.required' => 'La hora de inicio es obligatoria',
            'hora_fin.required' => 'La hora de fin es obligatoria',
            'hora_inicio.date_format' => 'El formato de la hora de inicio debe ser HH:MM:SS (ej. 10:30:00).',
            'hora_fin.date_format' => 'El formato de la hora de fin debe ser HH:MM:SS (ej. 11:30:00).',
            'hora_fin.after' => 'La hora de fin debe ser posterior a la hora de inicio.',
            'tipo_grupo.in' => 'El tipo de grupo seleccionado no es válido.',
            'dia_semana.in' => 'El día de la semana seleccionado no es válido.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Errores de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $dataForCreation = $validator->validated();

        try {
            $horario = Horario::create($dataForCreation);
            return response()->json([
                'message' => 'Horario registrado exitosamente',
                'data' => $horario
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error al registrar el horario: ' . $e->getMessage() . ' StackTrace: ' . $e->getTraceAsString());
            return response()->json([
                'message' => 'Hubo un error en el servidor al procesar la solicitud. Por favor, inténtalo más tarde.'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $horarioId)
    {
        try {
            $horario = Horario::findOrFail($horarioId);
            return response()->json($horario);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Horario no encontrado.'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $horarioId)
    {
        try {
            $horario = Horario::findOrFail($horarioId);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Horario no encontrado'], 404);
        }

        $validator = Validator::make($request->all(), [
            'tipo_grupo' => ['sometimes','required', 'string', Rule::in(['Adultos', 'Niños'])],
            'sede_id' => 'sometimes|required|integer|exists:sedes,id',
            'dia_semana' => ['sometimes','required', 'string', Rule::in(['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'])],
            'hora_inicio' => 'sometimes|required|date_format:H:i:s',
            'hora_fin' => 'sometimes|required|date_format:H:i:s|after:hora_inicio',
        ], [
            'tipo_grupo.required' => 'El grupo es obligatorio',
            'sede_id.required' => 'La sede es obligatoria',
            'dia_semana.required' => 'El día de clase es obligatorio',
            'hora_inicio.required' => 'La hora de inicio es obligatoria',
            'hora_fin.required' => 'La hora de fin es obligatoria',
            'hora_inicio.date_format' => 'El formato de la hora de inicio debe ser HH:MM:SS (ej. 10:30:00).',
            'hora_fin.date_format' => 'El formato de la hora de fin debe ser HH:MM:SS (ej. 11:30:00).',
            'hora_fin.after' => 'La hora de fin debe ser posterior a la hora de inicio.',
            'tipo_grupo.in' => 'El tipo de grupo seleccionado no es válido.',
            'dia_semana.in' => 'El día de la semana seleccionado no es válido.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Errores de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $validatedData = $validator->validated();

        try {
            $horario->update($validatedData);
            $horario->refresh();
            return response()->json([
                'message' => 'Horario actualizado exitosamente',
                'data' => $horario
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error al actualizar el horario: ' . $e->getMessage() . ' StackTrace: ' . $e->getTraceAsString());
            return response()->json([
                'message' => 'Hubo un error al actualizar el horario'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $horarioId)
    {
        try {
            $horario = Horario::findOrFail($horarioId);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Horario no encontrado'
            ], 404);
        }
        try {
            $horario->delete();
            return response()->json([
                'message' => 'Horario eliminado exitosamente'
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error al eliminar el horario: ' . $e->getMessage() . ' StackTrace: ' . $e->getTraceAsString());
            return response()->json([
                'message' => 'Hubo un error al eliminar el horario'
            ], 500);
        }
    }
}
