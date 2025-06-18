<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inscripción Acuafit {{ \Carbon\Carbon::now()->year }}</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
</head>

<body>
    <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-11 col-lg-8 col-xl-6 col-xxl-6">
                <div class="card shadow-sm">
                    <div class="card-body p-4 p-md-5">
                        <h1 class="card-title text-center mb-4">Formulario de Inscripción Acuafit
                            {{ \Carbon\Carbon::now()->year }}</h1>
                        <p class="text-muted text-center mb-4">* Indica campo obligatorio</p>

                        @if (session('success'))
                            <div class="alert alert-success">
                                {{ session('success') }}
                            </div>
                        @endif

                        @if ($errors->any() && !$errors->hasBag('default'))
                            <div class="alert alert-danger">
                                <ul class="mb-0">
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif

                        {{-- <form action="{{ route('inscripciones.store') }}" method="POST"> --}}
                        <form>
                            @csrf

                            <div class="mb-3">
                                <label for="nombres_estudiante" class="form-label">Nombres del estudiante *</label>
                                <input type="text" id="nombres_estudiante" name="nombres_estudiante"
                                    class="form-control @error('nombres_estudiante') is-invalid @enderror"
                                    value="{{ old('nombres_estudiante') }}" required>
                                @error('nombres_estudiante')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label for="apellidos_estudiante" class="form-label">Apellidos del estudiante
                                    *</label>
                                <input type="text" id="apellidos_estudiante" name="apellidos_estudiante"
                                    class="form-control @error('apellidos_estudiante') is-invalid @enderror"
                                    value="{{ old('apellidos_estudiante') }}" required>
                                @error('apellidos_estudiante')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Tipo de documento de identidad del estudiante *</label>
                                @php
                                    $tipos_documento = [
                                        'Tarjeta de identidad' => 'Tarjeta de identidad',
                                        'Registro civil' => 'Registro civil',
                                        'Cédula ciudadanía' => 'Cédula ciudadanía',
                                        'Documento extranjero' => 'Documento extranjero',
                                    ];
                                @endphp
                                @foreach ($tipos_documento as $key => $value)
                                    <div class="form-check">
                                        <input
                                            class="form-check-input @error('tipo_documento_estudiante') is-invalid @enderror"
                                            type="radio" name="tipo_documento_estudiante"
                                            id="tipo_documento_{{ Str::slug($key) }}" value="{{ $key }}"
                                            {{ old('tipo_documento_estudiante') == $key ? 'checked' : '' }} required>
                                        <label class="form-check-label" for="tipo_documento_{{ Str::slug($key) }}">
                                            {{ $value }}
                                        </label>
                                    </div>
                                @endforeach
                                @error('tipo_documento_estudiante')
                                    <div class="invalid-feedback d-block">{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label for="numero_documento_estudiante" class="form-label">Número del documento de
                                    identidad del estudiante *</label>
                                <input type="text" id="numero_documento_estudiante"
                                    name="numero_documento_estudiante"
                                    class="form-control @error('numero_documento_estudiante') is-invalid @enderror"
                                    value="{{ old('numero_documento_estudiante') }}" required>
                                @error('numero_documento_estudiante')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <hr class="my-4">

                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" id="requiereAcudiente"
                                    name="requiere_acudiente" value="1"
                                    {{ old('requiere_acudiente') ? 'checked' : '' }}>
                                <label class="form-check-label" for="requiereAcudiente">
                                    ¿El estudiante es menor de edad y/o requiere datos de acudiente?
                                </label>
                            </div>

                            <div id="datosAcudienteContainer">
                                <div class="mb-3">
                                    <label for="nombre_acudiente" class="form-label">Nombre completo del
                                        acudiente:</label>
                                    <input type="text" id="nombre_acudiente" name="nombre_acudiente"
                                        class="form-control @error('nombre_acudiente') is-invalid @enderror"
                                        value="{{ old('nombre_acudiente') }}">
                                    @error('nombre_acudiente')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>

                                <div class="mb-3">
                                    <label for="numero_documento_acudiente" class="form-label">Número de documento
                                        del acudiente:</label>
                                    <input type="text" id="numero_documento_acudiente"
                                        name="numero_documento_acudiente"
                                        class="form-control @error('numero_documento_acudiente') is-invalid @enderror"
                                        value="{{ old('numero_documento_acudiente') }}">
                                    @error('numero_documento_acudiente')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>

                            <hr class="my-4">


                            <div class="mb-3">
                                <label for="email_contacto" class="form-label">Correo electrónico de contacto
                                    *</label>
                                <input type="email" id="email_contacto" name="email_contacto"
                                    class="form-control @error('email_contacto') is-invalid @enderror"
                                    value="{{ old('email_contacto') }}" required>
                                @error('email_contacto')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label for="direccion_residencia" class="form-label">Dirección completa de
                                    residencia (incluyendo ciudad) *</label>
                                <input type="text" id="direccion_residencia" name="direccion_residencia"
                                    class="form-control @error('direccion_residencia') is-invalid @enderror"
                                    value="{{ old('direccion_residencia') }}" required>
                                @error('direccion_residencia')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label for="celular_contacto" class="form-label">Número de teléfono celular de
                                    contacto *</label>
                                <input type="tel" id="celular_contacto" name="celular_contacto"
                                    class="form-control @error('celular_contacto') is-invalid @enderror"
                                    value="{{ old('celular_contacto') }}" required>
                                @error('celular_contacto')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label for="numero_rut" class="form-label">Número de RUT (Registro Único Tributario)
                                    (Si no posee, escriba "No tengo") *</label>
                                <input type="text" id="numero_rut" name="numero_rut"
                                    class="form-control @error('numero_rut') is-invalid @enderror"
                                    value="{{ old('numero_rut') }}" required>
                                @error('numero_rut')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label for="edad_estudiante" class="form-label">Edad del estudiante (en años
                                    cumplidos) *</label>
                                <input type="number" id="edad_estudiante" name="edad_estudiante"
                                    class="form-control @error('edad_estudiante') is-invalid @enderror"
                                    value="{{ old('edad_estudiante') }}" required min="1">
                                @error('edad_estudiante')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label for="sede" class="form-label">Sede de preferencia *</label>
                                <select class="form-select @error('sede') is-invalid @enderror" id="sede"
                                    name="sede" required>
                                    <option value="" disabled {{ old('sede') ? '' : 'selected' }}>Seleccione una
                                        sede...</option>
                                    <option value="Poblado" {{ old('sede') == 'Poblado' ? 'selected' : '' }}>Poblado
                                    </option>
                                    <option value="Castilla" {{ old('sede') == 'Castilla' ? 'selected' : '' }}>
                                        Castilla</option>
                                    <option value="La Estrella" {{ old('sede') == 'La Estrella' ? 'selected' : '' }}>
                                        La Estrella</option>
                                </select>
                                @error('sede')
                                    <div class="invalid-feedback">{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label class="form-label">Elija el grupo de natación (día y horario) *</label>
                                @php
                                    $grupos = [
                                        'Adultos sábados, de 8 a.m a 9 a.m',
                                        'Adultos sábados, de 9 a.m a 10 a.m',
                                        'Niños sábados, de 10 a.m a 11 a.m',
                                        'Adultos domingos, de 8 a.m a 9 a.m',
                                        'Adultos domingos, de 9 a.m a 10 a.m',
                                        'Niños domingos, de 10 a.m a 11 a.m',
                                        'Niños domingos, de 11 a.m a 12 m.',
                                    ];
                                @endphp
                                @foreach ($grupos as $grupo)
                                    <div class="form-check">
                                        <input class="form-check-input @error('grupo_horario') is-invalid @enderror"
                                            type="radio" name="grupo_horario" id="grupo_{{ Str::slug($grupo) }}"
                                            value="{{ $grupo }}"
                                            {{ old('grupo_horario') == $grupo ? 'checked' : '' }} required>
                                        <label class="form-check-label" for="grupo_{{ Str::slug($grupo) }}">
                                            {{ $grupo }}
                                        </label>
                                    </div>
                                @endforeach
                                @error('grupo_horario')
                                    <div class="invalid-feedback d-block">{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="mb-3 p-3 border rounded">
                                <label class="form-label">Autorización de uso de imagen: ¿Permite el uso de
                                    fotografías y/o videos del estudiante para fines publicitarios (redes sociales,
                                    folletos, etc.)? *</label>
                                <p class="small text-muted">Conoce más en: <a
                                        href="https://docs.google.com/document/d/1sub10661QHigJBqdSmgX181-YsMIPrUIgWr_XbLE5L8/edit?usp=sharing"
                                        target="_blank" rel="noopener noreferrer">documento de derechos de
                                        imagen</a></p>
                                <div class="form-check">
                                    <input class="form-check-input @error('autorizacion_imagen') is-invalid @enderror"
                                        type="radio" name="autorizacion_imagen" id="autorizacion_imagen_si"
                                        value="Sí autorizo"
                                        {{ old('autorizacion_imagen') == 'Sí autorizo' ? 'checked' : '' }} required>
                                    <label class="form-check-label" for="autorizacion_imagen_si">Sí
                                        autorizo.</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input @error('autorizacion_imagen') is-invalid @enderror"
                                        type="radio" name="autorizacion_imagen" id="autorizacion_imagen_no"
                                        value="No autorizo"
                                        {{ old('autorizacion_imagen') == 'No autorizo' ? 'checked' : '' }} required>
                                    <label class="form-check-label" for="autorizacion_imagen_no">No
                                        autorizo.</label>
                                </div>
                                @error('autorizacion_imagen')
                                    <div class="invalid-feedback d-block">{{ $message }}</div>
                                @enderror
                            </div>

                            <div class="mb-3 p-3 border rounded">
                                <label class="form-label">Aceptación del Reglamento Acuafit *</label>
                                <p class="small text-muted">Conoce más en: <a
                                        href="https://docs.google.com/document/d/112yqhEhp1Zf0CwjOjEYGqIEC5pYjbHiuJv2HKsOKBhU/edit?usp=sharing"
                                        target="_blank" rel="noopener noreferrer">reglamento Acuafit</a></p>
                                <div class="form-check">
                                    <input class="form-check-input @error('acuerdo_reglamento') is-invalid @enderror"
                                        type="checkbox" name="acuerdo_reglamento" id="acuerdo_reglamento"
                                        value="Sí" {{ old('acuerdo_reglamento') == 'Sí' ? 'checked' : '' }}
                                        required>
                                    <label class="form-check-label" for="acuerdo_reglamento">
                                        He leído y acepto el reglamento de Acuafit.
                                    </label>
                                    @error('acuerdo_reglamento')
                                        <div class="invalid-feedback d-block">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>

                            <div class="d-grid gap-2 d-md-flex justify-content-md-start mt-4">
                                <button type="submit" class="btn btn-primary btn-lg px-4">Enviar
                                    Inscripción</button>
                                <button type="reset" class="btn btn-outline-secondary btn-lg px-4">Limpiar
                                    Formulario</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous">
    </script>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const requiereAcudienteCheckbox = document.getElementById('requiereAcudiente');
            const datosAcudienteContainer = document.getElementById('datosAcudienteContainer');
            const nombreAcudienteInput = document.getElementById('nombre_acudiente');
            const numeroDocumentoAcudienteInput = document.getElementById('numero_documento_acudiente');

            function toggleAcudienteFields() {
                if (requiereAcudienteCheckbox.checked) {
                    datosAcudienteContainer.style.display = 'block';
                    nombreAcudienteInput.disabled = false;
                    numeroDocumentoAcudienteInput.disabled = false;
                    // Opcional: añadir 'required' si es estrictamente necesario cuando está visible
                    // nombreAcudienteInput.required = true;
                    // numeroDocumentoAcudienteInput.required = true;
                } else {
                    datosAcudienteContainer.style.display = 'none';
                    nombreAcudienteInput.disabled = true;
                    numeroDocumentoAcudienteInput.disabled = true;
                    // Opcional: quitar 'required'
                    // nombreAcudienteInput.required = false;
                    // numeroDocumentoAcudienteInput.required = false;
                    // Opcional: limpiar valores
                    // nombreAcudienteInput.value = '';
                    // numeroDocumentoAcudienteInput.value = '';
                }
            }

            // Estado inicial al cargar la página
            toggleAcudienteFields();

            // Evento al cambiar el checkbox
            requiereAcudienteCheckbox.addEventListener('change', toggleAcudienteFields);
        });
    </script>
</body>

</html>
