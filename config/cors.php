<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    // 'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'paths' => ['api/*', 'sanctum/csrf-cookie', 'login', 'logout', 'user', 'sedes', 'horarios', 'sede/*'],

    // 'paths' => ['api/*'],
    'allowed_origins' => ['http://localhost:5173'],

    'allowed_methods' => ['*'],

    // 'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],
//     'allowed_headers' => [
//     'Content-Type',
//     'X-Requested-With',
//     'X-XSRF-TOKEN',
//     'X-CSRF-TOKEN',
//     'Accept',
//     'Authorization',
// ],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,
    // 'supports_credentials' => false,

];
