<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\log;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )->withMiddleware(function (Middleware $middleware) {
        $middleware->statefulApi();
    })
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->redirectGuestsTo(function (Request $request) {
            if ($request->expectsJson()) {
                return null;
            }
            try {
                return route('login');
            } catch (\Symfony\Component\Routing\Exception\RouteNotFoundException $e) {

                Log::warning('Se intentó redirigir a la ruta "login" (no JSON) pero no está definida.');
                return '/';
            }
        });
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
