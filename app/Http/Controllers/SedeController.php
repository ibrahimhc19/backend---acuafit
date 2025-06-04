<?php

namespace App\Http\Controllers;

use App\Models\Sede;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class SedeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sedes = Sede::query()->paginate(15);
        return response()->json($sedes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator =Validator::make($request->all(), [
            'nombre' => 'required|string|max:100',
            'direccion' => 'required|string|max:100',
        ], [
            'nombre.required' => 'El nombre de la sede es obligatorio',
            'direccion.required' => 'La dirección de la sede es obligatoria'
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Errores de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $dataForCreation = $validator->validated();

        try {
            $sede = Sede::create($dataForCreation);
            return response()->json([
                'message' => 'Sede registrada exitosamente',
                'data' => $sede
            ], 201);
        } catch (\Exception $e){
            Log::error('Error al registrar la sede: ' . $e->getMessage() . ' StackTrace: ' . $e->getTraceAsString());
            return response()->json([
                'message' => 'Hubo un error en el servidor al procesar la solicitud. Por favor, inténtalo más tarde.'
            ],500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $sedeId)
    {
        try {
            $sede = Sede::withCount('estudiantes')->findOrFail($sedeId);
            return response()->json($sede);
        } catch(ModelNotFoundException $e){
            return response()->json(['message' => 'Sede no encontrada.'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $sedeId)
    {

        try {
            $sede = Sede::findOrFail($sedeId);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Sede no encontrada'], 404);
        }

        $validator =Validator::make($request->all(), [
            'nombre' => 'sometimes|required|string|max:100',
            'direccion' => 'sometimes|required|string|max:100',
        ], [
            'nombre.required' => 'El nombre de la sede es obligatorio',
            'direccion.required' => 'La dirección de la sede es obligatoria'
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Errores de validación',
                'errors' => $validator->errors()
            ], 422);
        }

        $validatedData = $validator->validated();

        try{
            $sede->update($validatedData);
            $sede->refresh();
            return response()->json([
                'message' => 'Sede actualizada exitosamente',
                'data' => $sede
            ], 200);
        }catch (\Exception $e){
            Log::error('Error al actualizar la sede: ' . $e->getMessage() . ' StackTrace: ' . $e->getTraceAsString());
            return response()->json([
                'message' => 'Hubo un error al actualizar la sede'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $sedeId)
    {
        try {
            $sede = Sede::findOrFail($sedeId);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Sede no encontrada'], 404);
        }

        try{
            $sede->delete();
            return response()->json([
                'message' => 'Sede eliminada exitosamente'
            ], 200);
        }catch (\Exception $e){
            Log::error('Error al eliminar la sede: ' . $e->getMessage() . ' StackTrace: ' . $e->getTraceAsString());
            return response()->json([
                'message' => 'Hubo un error al eliminar la sede'
            ], 500);
        }
    }
}
