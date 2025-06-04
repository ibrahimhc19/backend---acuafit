<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Str;
use Exception;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            // Buscar o crear el usuario
            $user = User::updateOrCreate(
                [
                    // Criterio para buscar: email o google_id
                    // Si usas google_id para mayor robustez:
                    // 'google_id' => $googleUser->getId(),
                    // Si usas email (más común si google_id no es obligatorio):
                    'email' => $googleUser->getEmail(),
                ],
                [
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(), // Se incluye aquí para el caso de creación
                    // 'google_id' => $googleUser->getId(), // Asegúrate de que esté en $fillable si lo usas
                    'email_verified_at' => now(), // Marcar email como verificado
                    // Si el password es requerido, genera uno aleatorio si el usuario es nuevo
                    // o si el usuario existente no tiene password (solo se logueaba con Google)
                    'password' => $user->password ?? Hash::make(Str::random(24)),
                    // 'avatar' => $googleUser->getAvatar(), // Si tienes este campo y está en $fillable
                ]
            );

            Auth::login($user, true); // Iniciar sesión del usuario (true para "recordarme")

            return redirect()->intended('/dashboard'); // O a donde quieras redirigir

        } catch (Exception $e) {
            // Log::error('Google Auth Error: ' . $e->getMessage());
            return redirect('/login')->with('error', 'Error al autenticar con Google. Inténtalo de nuevo.');
        }
    }
}
