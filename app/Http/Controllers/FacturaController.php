<?php

namespace App\Http\Controllers;

use App\Models\Factura;
use Illuminate\Http\Request;

class FacturaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $facturas = Factura::query()->paginate(15);
        return response()->json($facturas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'estudiante_id' => 'required|exists:estudiantes,id',
            'pagado_por' => 'required|in:Estudiante,Representante',
            'tipo_documento_pagador' => 'required|in:CC,TI,CE,Pasaporte',
            'documento_pagador' => 'required|string|max:50',
            'correo_pagador' => 'nullable|email',
            'direccion_pagador' => 'nullable|string|max:255',
            'celular_pagador' => 'nullable|string|max:20',
            'concepto' => 'required|in:Mensualidad,Bimestre,Trimestre,Matrícula',
            'categoria_pago' => 'required|in:Pago total,Abono',
            'valor_curso' => 'required|numeric|min:0',
            'valor_matricula' => 'nullable|numeric|min:0',
            'sede_id' => 'required|exists:sedes,id',
            'fecha_limite_exoneracion' => 'nullable|date',
            'abonos' => 'required|array|min:1',
            'abonos.*.fecha_pago' => 'required|date',
            'abonos.*.monto' => 'required|numeric|min:0',
            'abonos.*.metodo_pago' => 'required|in:Efectivo,Transferencia,Tarjeta',
            'abonos.*.numero_referencia_pago' => 'nullable|string|max:100',
        ]);

        DB::beginTransaction();

        try {
            $factura = Facturacion::create([
                'estudiante_id' => $validated['estudiante_id'],
                'pagado_por' => $validated['pagado_por'],
                'tipo_documento_pagador' => $validated['tipo_documento_pagador'],
                'documento_pagador' => $validated['documento_pagador'],
                'correo_pagador' => $validated['correo_pagador'],
                'direccion_pagador' => $validated['direccion_pagador'],
                'celular_pagador' => $validated['celular_pagador'],
                'concepto' => $validated['concepto'],
                'categoria_pago' => $validated['categoria_pago'],
                'valor_curso' => $validated['valor_curso'],
                'valor_matricula' => $validated['valor_matricula'] ?? 0,
                'sede_id' => $validated['sede_id'],
                'fecha_limite_exoneracion' => $validated['fecha_limite_exoneracion'],
            ]);

            foreach ($validated['abonos'] as $abono) {
                Pago::create([
                    'facturacion_id' => $factura->id,
                    'fecha_pago' => $abono['fecha_pago'],
                    'monto' => $abono['monto'],
                    'metodo_pago' => $abono['metodo_pago'],
                    'numero_referencia_pago' => $abono['numero_referencia_pago'],
                ]);
            }

            DB::commit();

            return response()->json(['message' => 'Facturación y abonos registrados exitosamente'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al registrar', 'details' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Factura $factura)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Factura $factura)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Factura $factura)
    {
        //
    }
}
