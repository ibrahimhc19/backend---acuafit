<?php

namespace App\Http\Controllers;

use App\Models\Acudiente;
use App\Models\Estudiante;
use Illuminate\Support\Arr;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class EstudianteController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $estudiantes = Estudiante::with(['acudiente', 'sede', 'horario'])->orderBy('nombres', 'asc')->paginate($perPage);
        return response()->json($estudiantes);
    }


    public function search(Request $request)
    {
        $query = $request->input('q');
        $perPage = $request->input('per_page', 10);

        $estudiantes = Estudiante::with(['acudiente', 'sede', 'horario'])
            ->when($query, function ($qBuilder) use ($query) {
                $qBuilder->where(function ($sub) use ($query) {
                    $sub->where('nombres', 'like', "%{$query}%")
                        ->orWhere('apellidos', 'like', "%{$query}%")
                        ->orWhere('documento_identidad', 'like', "%{$query}%")
                        ->orWhere('telefono', 'like', "%{$query}%");
                })
                    ->orWhereHas('acudiente', function ($qAcudiente) use ($query) {
                        $qAcudiente->where('nombres', 'like', "%{$query}%")
                            ->orWhere('apellidos', 'like', "%{$query}%")
                            ->orWhere('documento_identidad', 'like', "%{$query}%")
                            ->orWhere('telefono', 'like', "%{$query}%");
                    });
            })
            ->orderBy('nombres', 'asc')
            ->paginate($perPage)
            ->appends([
                'q' => $query,
                'per_page' => $perPage,
            ]);

        return response()->json($estudiantes);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombres' => 'required|string|max:100',
            'apellidos' => 'required|string|max:100',
            'tipo_documento' => ['required', 'string', Rule::in(['CC', 'TI', 'CE', 'Pasaporte'])],
            'edad' => 'required|integer|min:1',
            'documento_identidad' => 'required|string|unique:estudiantes,documento_identidad|max:50',
            'sede_id' => 'required|integer|exists:sedes,id',
            'horario_id' => 'required|integer|exists:horarios,id',
            'fecha_inscripcion' => 'required|date_format:Y-m-d',
            'correo' => 'nullable|string|email|unique:estudiantes,correo|max:100',
            'direccion' => 'nullable|string|max:255',
            'telefono' => 'nullable|string|max:20',
            'rut' => 'nullable|string|max:100',
            'autoriza_uso_imagen' => 'required|boolean',
            'acepta_reglamento' => 'required|boolean',
            'observaciones' => 'nullable|string',
            'requiere_acudiente' => 'required|boolean',

            // Acudiente (campos opcionales)
            'acudiente.nombres' => 'nullable|string|max:100',
            'acudiente.apellidos' => 'nullable|string|max:100',
            'acudiente.tipo_documento' => 'nullable|string',
            'acudiente.documento_identidad' => 'nullable|string|max:50',
            'acudiente.telefono' => 'nullable|string|max:20',
            'acudiente.email' => 'nullable|email|max:100',
            'acudiente.rut' => 'nullable|string|max:100',
        ], [
            'nombres.required' => 'El campo nombres es obligatorio.',
            'nombres.string' => 'El campo nombres debe ser una cadena de texto.',

            'apellidos.required' => 'El campo apellidos es obligatorio.',
            'apellidos.string' => 'El campo apellidos debe ser una cadena de texto.',

            'tipo_documento.required' => 'El tipo de documento es obligatorio.',
            'tipo_documento.string' => 'El tipo de documento debe ser una cadena de texto.',
            'tipo_documento.in' => 'El tipo de documento seleccionado no es válido. Valores permitidos: CC, TI, CE, Pasaporte.',

            'edad.required' => 'El campo edad es obligatorio.',
            'edad.integer' => 'El campo edad debe ser un número entero.',

            'documento_identidad.required' => 'El documento de identidad es obligatorio.',
            'documento_identidad.string' => 'El documento de identidad debe ser una cadena de texto.',
            'documento_identidad.unique' => 'Este documento de identidad ya ha sido registrado anteriormente.',

            'acudiente_id.integer' => 'El ID del acudiente debe ser un número entero.',
            'acudiente_id.exists' => 'El acudiente seleccionado no es válido o no existe.',

            'sede_id.required' => 'La sede es obligatoria.',
            'sede_id.integer' => 'El ID de la sede debe ser un número entero.',
            'sede_id.exists' => 'La sede seleccionada no es válida o no existe.',

            'horario_id.required' => 'El horario es obligatorio.',
            'horario_id.integer' => 'El ID del horario debe ser un número entero.',
            'horario_id.exists' => 'El horario seleccionado no es válido o no existe.',

            'fecha_inscripcion.required' => 'La fecha de inscripción es obligatoria.',
            'fecha_inscripcion.date_format' => 'El formato de la fecha de inscripción debe ser dd/mm/aaaa (ej. 29/05/2025).',

            'correo.string' => 'El correo debe ser una cadena de texto.',
            'correo.email' => 'El formato del correo electrónico no es válido.',
            'correo.unique' => 'Este correo electrónico ya ha sido registrado.',

            'direccion.string' => 'La dirección debe ser una cadena de texto.',
            'telefono.string' => 'El teléfono debe ser una cadena de texto.',
            'rut.string' => 'El RUT debe ser una cadena de texto.',

            'autoriza_uso_imagen.required' => 'Debes indicar si autorizas el uso de imagen.',
            'autoriza_uso_imagen.boolean' => 'La autorización de uso de imagen debe ser un valor verdadero o falso.',

            'acepta_reglamento.required' => 'Debes indicar si aceptas el reglamento.',
            'acepta_reglamento.boolean' => 'La aceptación del reglamento debe ser un valor verdadero o falso.',

            'observaciones.string' => 'Las observaciones deben ser una cadena de texto.',
        ]);

        $validator->after(function ($validator) use ($request) {
            if ($request->boolean('requiere_acudiente')) {
                $acudiente = $request->input('acudiente', []);
                if (empty($acudiente['nombres']) || empty($acudiente['documento_identidad'])) {
                    $validator->errors()->add('acudiente', 'Debe completar los datos del acudiente.');
                }
            }
        });


        if ($validator->fails()) {
            return response()->json([
                'message' => 'Errores de validación',
                'errors' => $validator->errors()
            ], 422);
        }


        $validated = $validator->validated();
        $estudianteData = Arr::except($validated, ['acudiente']);
        $acudienteData = $validated['acudiente'] ?? null;

        DB::beginTransaction();

        try {
            if ($validated['requiere_acudiente'] && $acudienteData && !empty($acudienteData['nombres'])) {
                $acudiente = Acudiente::create($acudienteData);
                $estudianteData['acudiente_id'] = $acudiente->id;
            }

            $estudiante = Estudiante::create($estudianteData);
            DB::commit();

            return response()->json([
                'message' => 'Estudiante registrado exitosamente',
                'data' => $estudiante
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error al registrar el estudiante' . $e->getMessage() . ' StackTrace: ' . $e->getTraceAsString());
            return response()->json([
                'message' => 'Hubo un error en el servidor al procesar la solicitud. Por favor inténtalo más tarde'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $estudianteId)
    {
        try {
            $estudiante = Estudiante::with(['acudiente', 'sede', 'horario'])->findOrFail($estudianteId);
            return response()->json($estudiante);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Estudiante no encontrado.'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $estudianteId)
    {
        try {
            $estudiante = Estudiante::findOrFail($estudianteId);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException) {
            return response()->json([
                'message' => 'Estudiante no encontrado'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'nombres' => 'sometimes|required|string|max:100',
            'apellidos' => 'sometimes|required|string|max:100',
            'tipo_documento' => ['sometimes', 'required', 'string', Rule::in(['CC', 'TI', 'CE', 'Pasaporte'])],
            'edad' => 'sometimes|required|integer|min:1',
            'documento_identidad' => ['sometimes', 'required', 'string', Rule::unique('estudiantes', 'documento_identidad')->ignore($estudiante->id)],
            'acudiente_id' => 'nullable|integer|exists:acudientes,id',
            'sede_id' => 'sometimes|required|integer|exists:sedes,id',
            'horario_id' => 'sometimes|required|integer|exists:horarios,id',
            'fecha_inscripcion' => 'sometimes|required|date_format:Y-m-d',
            'correo' => ['nullable', 'string', 'email', 'max:100', Rule::unique('estudiantes', 'correo')->ignore($estudiante->id)],
            'direccion' => 'nullable|string|max:255',
            'telefono' => 'nullable|string|max:20',
            'rut' => 'nullable|string|max:100',
            'autoriza_uso_imagen' => 'sometimes|required|boolean',
            'acepta_reglamento' => 'sometimes|required|boolean',
            'observaciones' => 'nullable|string',
            'requiere_acudiente' => 'required|boolean',

            // Acudiente (campos opcionales)
            'acudiente.nombres' => 'nullable|string|max:100',
            'acudiente.apellidos' => 'nullable|string|max:100',
            'acudiente.tipo_documento' => 'nullable|string',
            'acudiente.documento_identidad' => 'nullable|string|max:50',
            'acudiente.telefono' => 'nullable|string|max:20',
            'acudiente.email' => 'nullable|email|max:100',
            'acudiente.rut' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Errores de validación',
                'errors' => $validator->errors()
            ], 422);
        }
        $validated = $validator->validated();
        $estudianteData = Arr::except($validated, ['acudiente']);
        $acudienteData = $validated['acudiente'] ?? null;

        DB::beginTransaction();
        try {

            if ($validated['requiere_acudiente'] && $acudienteData && !empty($acudienteData['nombres'])) {

                if($estudiante->acudiente_id){
                    $acudiente = Acudiente::findOrFail($estudiante->acudiente_id);
                    $acudiente->update($acudienteData);
                } else {
                    $acudiente = Acudiente::create($acudienteData);
                    $estudianteData['acudiente_id'] = $acudiente->id;
                }
            } else {
                $estudianteData['acudiente_id'] = null;
            }

            $estudiante->update($estudianteData);
            $estudiante->refresh();

            DB::commit();

            return response()->json([
                'message' => 'Estudiante actualizado exitosamente',
                'data' => $estudiante
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Error al actualizar el estudiante: ' . $e->getMessage() . ' StackTrace: ' . $e->getTraceAsString());
            return response()->json([
                'message' => 'Hubo un error al actualizar el estudiante.'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $estudianteId)
    {
        try {
            $estudiante = Estudiante::findOrfail($estudianteId);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException) {
            return response()->json([
                'message' => 'Estudiante no encontrado'
            ], 404);
        }

        try {

            $estudiante->delete();
            return response()->json([
                'message' => 'Estudiante eliminado exitosamente'
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error al eliminar el estudiante: ' . $e->getMessage() . ' StackTrace: ' . $e->getTraceAsString());
            return response()->json([
                'message' => 'Hubo un error al eliminar al estudiante'
            ], 500);
        }
    }
}
