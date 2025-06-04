<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Inscripción Exitosa</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <script>
        // Previene que el usuario use el botón "atrás"
        history.replaceState(null, null, location.href);
        window.addEventListener('popstate', function () {
            history.go(1);
        });
    </script>
</head>
<body class="bg-light d-flex align-items-center justify-content-center vh-100">

    <div class="text-center bg-white p-5 rounded shadow" style="max-width: 500px;">
        <h1 class="text-success mb-4">Inscripción realizada con éxito</h1>
        <p class="mb-4">Gracias por registrarse. Puede cerrar esta página o seguirnos en nuestras redes sociales.</p>

        <div class="d-flex justify-content-center gap-3">
            <a href="https://facebook.com/TU_PAGINA" class="btn btn-outline-primary" target="_blank">
                <i class="bi bi-facebook"></i> Facebook
            </a>
            <a href="https://instagram.com/TU_PAGINA" class="btn btn-outline-danger" target="_blank">
                <i class="bi bi-instagram"></i> Instagram
            </a>
            <a href="https://wa.me/TU_NUMERO" class="btn btn-outline-success" target="_blank">
                <i class="bi bi-whatsapp"></i> WhatsApp
            </a>
        </div>
    </div>

    <!-- Bootstrap Icons (opcional) -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
</body>
</html>
