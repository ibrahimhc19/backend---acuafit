<?php

namespace App\Http\Controllers;

use App\Models\Pago;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class PagoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pagos = Pago::with(['estudiante' => function ($query) {
            $query->select('id', 'nombres', 'apellidos', 'documento_identidad', 'telefono');
        }])->paginate(15);
        return response()->json($pagos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'estudiante_id' => 'required|integer|exists:estudiantes,id',
            'monto' => ['required', 'numeric', 'regex:/^\d{1,8}(\.\d{1,2})?$/', 'min:0.01'],
            'fecha_pago' => 'required|date_format:d/m/Y',
            'metodo_pago' => ['required', 'string', Rule::in(['Efectivo', 'Transferencia'])],
            'soporte_pago' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048'

        ], [
            'estudiante_id.required' => 'El ID del estudiante es obligatorio.',
            'estudiante_id.exists'   => 'El estudiante seleccionado no existe.',
            'monto.required'         => 'El monto es obligatorio.',
            'monto.numeric'          => 'El monto debe ser un número.',
            'monto.regex'            => 'El formato del monto no es válido (ej: 123.45, máximo 8 dígitos antes del decimal y 2 después).',
            'monto.min'              => 'El monto debe ser al menos 0.01.',
            'fecha_pago.required'    => 'La fecha de pago es obligatoria.',
            'fecha_pago.date_format' => 'El formato de la fecha de pago debe ser DD-MM-YYYY.',
            'metodo_pago.required'   => 'El método de pago es obligatorio.',
            'metodo_pago.in'         => 'El método de pago seleccionado no es válido.',
            'soporte_pago.file'      => 'El soporte de pago debe ser un archivo.',
            'soporte_pago.mimes'     => 'El soporte de pago debe ser un archivo de tipo: pdf, jpg, jpeg, png.',
            'soporte_pago.max'       => 'El soporte de pago no debe exceder los 2MB.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Errores de validación.',
                'errors' => $validator->errors()
            ], 422);
        }
        $dataForCreation = $validator->validated();

        if ($request->hasFile('soporte_pago')) {
            if ($request->file('soporte_pago')->isValid()) {
                $filePath = $request->file('soporte_pago')->store('soportes_pago', 'public');
                $dataForCreation['soporte_pago'] = $filePath;
            } else {
                return response()->json([
                    'message' => 'El archivo de soporte de pago no es válido o está corrupto'
                ], 400);
            }
        }

        try {
            $pago = Pago::create($dataForCreation);
            return response()->json([
                'message' => 'Pago registrado exitosamente.',
                'data' => $pago
            ], 201);
        } catch (\Exception $e) {
            Log::error('Error al registrar el pago: ' . $e->getMessage() . ' StackTrace: ' . $e->getTraceAsString());
            return response()->json([
                'message' => 'Hubo un error en el servidor al procesar la solicitud. Por favor, inténtalo más tarde.'
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $idPago)
    {
        try {
            $pago = Pago::with(['estudiante' => function ($query) {
                $query->select('id', 'nombres', 'apellidos', 'documento_identidad', 'telefono');
            }])->findOrFail($idPago);
            return response()->json($pago);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Pago no encontrado.'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $idPago)
    {
        try {
            $pago = Pago::findOrFail($idPago);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Pago no encontrado'], 404);
        }

        $validator = Validator::make($request->all(), [
            'estudiante_id' => 'sometimes|required|integer|exists:estudiantes,id',
            'monto'         => ['sometimes', 'required', 'numeric', 'regex:/^\d{1,8}(\.\d{1,2})?$/', 'min:0.01'],
            'fecha_pago'    => 'sometimes|required|date_format:d/m/Y',
            'metodo_pago'   => ['sometimes', 'required', 'string', Rule::in(['Efectivo', 'Transferencia', 'Tarjeta'])],
            'soporte_pago'  => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:2048',
        ], [
            'fecha_pago.date_format' => 'El formato de la fecha de pago debe ser dd/mm/yyyy.',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $validatedData = $validator->validated();

        if ($request->hasFile('soporte_pago')) {
            if ($request->file('soporte_pago')->isValid()) {
                if ($pago->soporte_pago) {
                    Storage::disk('public')->delete($pago->soporte_pago);
                }
                $filePath = $request->file('soporte_pago')->store('soportes_pago', 'public');
                $validatedData['soporte_pago'] = $filePath;
            } else {
                return response()->json([
                    'message' => 'El nuevo archivo de soporte de pago no es válido'
                ], 400);
            }
        } elseif($request->exists('soporte_pago') && is_null($request->input('soporte_pago'))) {
            if($pago->soporte_pago){
                Storage::disk('public')->delete($pago->soporte_pago);
            }
            $validatedData['soporte_pago'] = null;
        }

        try {
            $pago->update($validatedData);

            if($pago->estudiante_id){
                $pago->load(['estudiante' => function($query){
                    $query->select('id', 'nombres', 'apellidos', 'documento_identidad', 'telefono');
                }]);
            } else {
                $pago->estudiante = null;
            }

            return response()->json([
                'message' => 'Pago actualizado exitosamente'
            ], 200);

        } catch (\Exception $e) {
            Log::error('Error al actualizar el pago: ' . $e->getMessage() . ' StackTrace: ' . $e->getTraceAsString());
            return response()->json(['message'=> 'Hubo un error al actualizar el pago'],500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $idPago)
    {
        try {
            $pago = Pago::findOrFail($idPago);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['message' => 'Pago no encontrado'], 404);
        }

        try {
            if ($pago->soporte_pago) {
                Storage::disk('public')->delete($pago->soporte_pago);
            }
            $pago->delete();

            return response()->json([
                'message' => 'Pago eliminado exitosamente'
            ], 200);
        } catch (\Exception $e) {
            Log::error('Error al eliminar el pago: ' . $e->getMessage() . 'StackTrace: ' . $e->getTraceAsString());
            return response()->json([
                'message' => 'Hubo un error al eliminar el pago'
            ], 500);
        }
    }
}
