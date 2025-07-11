-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-06-2025 a las 02:26:19
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `acuafit`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acudientes`
--

CREATE TABLE `acudientes` (
  `id` int(11) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `tipo_documento` varchar(10) NOT NULL,
  `documento_identidad` varchar(50) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `rut` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `acudientes`
--

INSERT INTO `acudientes` (`id`, `nombres`, `apellidos`, `tipo_documento`, `documento_identidad`, `telefono`, `email`, `rut`) VALUES
(2, 'Lucía', 'Salazar', 'CC', '2345678901', '3102345678', 'lucia.salazar@example.com', NULL),
(3, 'Andrés', 'Quintero', 'CC', '3456789012', '3103456789', 'andres.quintero@example.com', NULL),
(4, 'Carlos', 'Mendoza', 'CC', '1234567890', '3101234567', 'carlos.mendoza@example.com', NULL),
(5, 'Laura', 'Sánchez', 'CC', '800004', '3001112266', 'laura.sanchez@example.com', NULL),
(6, 'Javier', 'Moreno', 'CC', '800005', '3001112277', 'javier.moreno@example.com', NULL),
(7, 'Lucía', 'Pérez', 'CC', '800006', '3001112288', 'lucia.perez@example.com', NULL),
(8, 'Andrés', 'Torres', 'CC', '800007', '3001112299', 'andres.torres@example.com', NULL),
(9, 'Marcela', 'Rivas', 'CC', '800008', '3001112300', 'marcela.rivas@example.com', NULL),
(10, 'Eduardo', 'Castro', 'CC', '800009', '3001112311', 'eduardo.castro@example.com', NULL),
(11, 'Juliana', 'López', 'CC', '800010', '3001112322', 'juliana.lopez@example.com', NULL),
(12, 'Santiago', 'Gil', 'CC', '800011', '3001112333', 'santiago.gil@example.com', NULL),
(13, 'Paula', 'Mejía', 'CC', '800012', '3001112344', 'paula.mejia@example.com', NULL),
(14, 'Ricardo', 'Vargas', 'CC', '800013', '3001112355', 'ricardo.vargas@example.com', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiantes`
--

CREATE TABLE `estudiantes` (
  `id` int(11) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `tipo_documento` varchar(10) NOT NULL,
  `edad` int(11) NOT NULL,
  `documento_identidad` varchar(50) NOT NULL,
  `acudiente_id` int(11) DEFAULT NULL,
  `sede_id` int(11) NOT NULL,
  `horario_id` int(11) NOT NULL,
  `fecha_inscripcion` date NOT NULL,
  `correo` varchar(100) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `rut` varchar(100) DEFAULT NULL,
  `autoriza_uso_imagen` tinyint(1) NOT NULL DEFAULT 0,
  `acepta_reglamento` tinyint(1) NOT NULL DEFAULT 0,
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estudiantes`
--

INSERT INTO `estudiantes` (`id`, `nombres`, `apellidos`, `tipo_documento`, `edad`, `documento_identidad`, `acudiente_id`, `sede_id`, `horario_id`, `fecha_inscripcion`, `correo`, `direccion`, `telefono`, `rut`, `autoriza_uso_imagen`, `acepta_reglamento`, `observaciones`) VALUES
(27, 'Miguel Ángel', 'Torres Rojas', 'CC', 28, '1030405060', NULL, 3, 3, '2024-05-19', 'miguel.torres@email.com', 'Avenida Las Palmas # 40-50', '3002223344', '1030405060-8', 0, 1, 'Ninguna.'),
(30, 'Gabriela', 'Ortiz Pinto', 'CC', 27, '1040506070', NULL, 3, 3, '2024-05-16', 'gabriela.ortiz@email.com', 'Calle 3 Sur # 60-25', '3148889900', '1040506070-7', 1, 1, 'Pago completo.'),
(32, 'Carlos', 'Mendoza', 'CC', 18, '100001', NULL, 2, 3, '2025-05-30', 'carlos.mendoza@example.com', 'Calle 10 #5-20', '3120001001', '123456789-0', 1, 1, NULL),
(33, 'Sofía', 'Ramírez', 'TI', 12, '100002', 2, 3, 4, '2025-05-30', 'sofia.ramirez@example.com', 'Cra 7 #12-45', '3110001002', NULL, 1, 1, 'Alérgica al cloro'),
(34, 'Juan', 'Torres', 'CC', 25, '100003', NULL, 3, 4, '2025-05-30', 'juan.torres@example.com', 'Av 15 #8-30', '3100001003', '987654321-0', 0, 1, NULL),
(37, 'Laura', 'Gómez', 'TI', 9, '100006', 2, 2, 4, '2025-05-30', 'laura.gomez@example.com', 'Av 3 #7-21', '3140001006', NULL, 1, 1, 'Tiene asma'),
(38, 'Luis', 'Martínez', 'CC', 20, '100007', NULL, 3, 3, '2025-05-30', 'luis.martinez@example.com', 'Calle 33 #6-10', '3150001007', '222333444-5', 1, 1, NULL),
(39, 'Camila', 'Herrera', 'TI', 11, '100008', 4, 2, 3, '2025-05-30', 'camila.herrera@example.com', 'Cra 21 #15-78', '3160001008', NULL, 1, 1, NULL),
(41, 'Mariana', 'Díaz', 'TI', 13, '100010', 3, 3, 3, '2025-05-30', 'mariana.diaz@example.com', 'Calle 40 #9-40', '3180001010', NULL, 1, 1, NULL),
(42, 'Ana', 'Ruiz', 'TI', 10, '100011', 2, 3, 4, '2025-05-30', 'ana.ruiz@example.com', 'Calle 21 #11-10', '3123451111', NULL, 1, 1, NULL),
(44, 'Isabella', 'Mejía', 'TI', 12, '100013', 4, 2, 3, '2025-05-30', 'isabella.mejia@example.com', 'Calle 30 #7-35', '3130001013', NULL, 1, 1, NULL),
(45, 'Julián', 'Pardo', 'CC', 28, '100014', NULL, 2, 3, '2025-05-30', 'julian.pardo@example.com', 'Av 13 #5-60', '3190001014', '445566778-0', 0, 1, NULL),
(46, 'Daniela', 'Salazar', 'TI', 14, '100015', 3, 3, 4, '2025-05-30', 'daniela.salazar@example.com', 'Cra 25 #15-17', '3210001015', NULL, 1, 1, 'Primera vez en natación'),
(48, 'Carla', 'Nieto', 'TI', 11, '100017', 2, 3, 3, '2025-05-30', 'carla.nieto@example.com', 'Cra 12 #9-09', '3230001017', NULL, 1, 1, NULL),
(50, 'Paula', 'Acosta', 'TI', 13, '100019', 3, 3, 4, '2025-05-30', 'paula.acosta@example.com', 'Calle 5 #3-12', '3250001019', NULL, 1, 1, NULL),
(51, 'Nicolás', 'Vega', 'CC', 19, '100020', NULL, 2, 4, '2025-05-30', 'nicolas.vega@example.com', 'Cra 27 #20-20', '3260001020', NULL, 1, 1, NULL),
(53, 'Tomás', 'Restrepo', 'CC', 27, '100022', NULL, 2, 4, '2025-05-30', 'tomas.restrepo@example.com', 'Cra 16 #5-55', '3280001022', '998877665-3', 1, 1, NULL),
(54, 'Renata', 'Cárdenas', 'TI', 9, '100023', 2, 2, 3, '2025-05-30', 'renata.cardenas@example.com', 'Calle 17 #9-11', '3290001023', NULL, 1, 1, NULL),
(55, 'Santiago', 'Herrera', 'CC', 23, '100024', NULL, 3, 4, '2025-05-30', 'santiago.herrera@example.com', 'Cra 30 #13-08', '3300001024', NULL, 1, 1, NULL),
(56, 'Sara', 'Valencia', 'TI', 13, '100025', 4, 3, 4, '2025-05-30', 'sara.valencia@example.com', 'Av 6 #2-20', '3310001025', NULL, 1, 1, NULL),
(57, 'Esteban', 'Quintero', 'CC', 32, '100026', NULL, 2, 3, '2025-05-30', 'esteban.quintero@example.com', 'Calle 25 #17-07', '3320001026', '776655443-2', 0, 1, NULL),
(59, 'Jorge', 'Barrera', 'CC', 29, '100028', NULL, 2, 4, '2025-05-30', 'jorge.barrera@example.com', 'Av 10 #1-19', '3340001028', NULL, 1, 1, NULL),
(60, 'Emma', 'Zamora', 'TI', 12, '100029', 3, 3, 3, '2025-05-30', 'emma.zamora@example.com', 'Calle 7 #6-61', '3350001029', NULL, 1, 1, NULL),
(61, 'David', 'Ibarra', 'CC', 21, '100030', NULL, 3, 4, '2025-05-30', 'david.ibarra@example.com', 'Cra 14 #3-14', '3360001030', NULL, 1, 1, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturaciones`
--

CREATE TABLE `facturaciones` (
  `id` int(11) NOT NULL,
  `estudiante_id` int(11) NOT NULL,
  `pagado_por` varchar(25) NOT NULL,
  `tipo_documento_pagador` varchar(25) NOT NULL,
  `documento_pagador` varchar(50) NOT NULL,
  `correo_pagador` varchar(100) DEFAULT NULL,
  `direccion_pagador` varchar(255) DEFAULT NULL,
  `celular_pagador` varchar(20) DEFAULT NULL,
  `concepto` varchar(25) NOT NULL,
  `categoria_pago` varchar(25) NOT NULL,
  `valor_curso` decimal(10,2) NOT NULL,
  `valor_matricula` decimal(10,2) DEFAULT 0.00,
  `sede_id` int(11) NOT NULL,
  `fecha_limite_exoneracion` date DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `id` int(11) NOT NULL,
  `tipo_grupo` varchar(25) NOT NULL,
  `sede_id` int(11) NOT NULL,
  `dia_semana` enum('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo') NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`id`, `tipo_grupo`, `sede_id`, `dia_semana`, `hora_inicio`, `hora_fin`) VALUES
(3, 'Adultos', 3, 'Viernes', '18:00:00', '20:00:00'),
(4, 'Niños', 2, 'Miércoles', '14:00:00', '15:30:00'),
(5, 'Niños', 5, 'Miércoles', '16:00:00', '17:00:00'),
(6, 'Adultos', 5, 'Miércoles', '18:00:00', '19:00:00'),
(7, 'Niños', 6, 'Viernes', '15:30:00', '16:30:00'),
(8, 'Adultos', 6, 'Viernes', '17:30:00', '18:30:00'),
(9, 'Niños', 7, 'Sábado', '09:00:00', '10:00:00'),
(10, 'Adultos', 7, 'Sábado', '10:00:00', '11:00:00'),
(11, 'Niños', 2, 'Lunes', '16:00:00', '17:00:00'),
(12, 'Adultos', 2, 'Lunes', '17:00:00', '18:00:00'),
(13, 'Niños', 3, 'Martes', '15:00:00', '16:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_04_16_014410_create_personal_access_tokens_table', 1),
(5, '2025_04_16_133118_create_permission_tables', 1),
(6, '2025_05_14_211139_create_cache_table', 0),
(7, '2025_05_14_211139_create_cache_locks_table', 0),
(8, '2025_05_14_211139_create_estudiantes_table', 0),
(9, '2025_05_14_211139_create_failed_jobs_table', 0),
(10, '2025_05_14_211139_create_horarios_table', 0),
(11, '2025_05_14_211139_create_job_batches_table', 0),
(12, '2025_05_14_211139_create_jobs_table', 0),
(13, '2025_05_14_211139_create_model_has_permissions_table', 0),
(14, '2025_05_14_211139_create_model_has_roles_table', 0),
(15, '2025_05_14_211139_create_pagos_table', 0),
(16, '2025_05_14_211139_create_password_reset_tokens_table', 0),
(17, '2025_05_14_211139_create_permissions_table', 0),
(18, '2025_05_14_211139_create_personal_access_tokens_table', 0),
(19, '2025_05_14_211139_create_representantes_table', 0),
(20, '2025_05_14_211139_create_role_has_permissions_table', 0),
(21, '2025_05_14_211139_create_roles_table', 0),
(22, '2025_05_14_211139_create_sedes_table', 0),
(23, '2025_05_14_211139_create_sessions_table', 0),
(24, '2025_05_14_211139_create_users_table', 0),
(25, '2025_05_14_211142_add_foreign_keys_to_estudiantes_table', 0),
(26, '2025_05_14_211142_add_foreign_keys_to_model_has_permissions_table', 0),
(27, '2025_05_14_211142_add_foreign_keys_to_model_has_roles_table', 0),
(28, '2025_05_14_211142_add_foreign_keys_to_pagos_table', 0),
(29, '2025_05_14_211142_add_foreign_keys_to_role_has_permissions_table', 0),
(30, '2025_05_30_140322_create_cache_table', 0),
(31, '2025_05_30_140322_create_cache_locks_table', 0),
(32, '2025_05_30_140322_create_estudiantes_table', 0),
(33, '2025_05_30_140322_create_failed_jobs_table', 0),
(34, '2025_05_30_140322_create_horarios_table', 0),
(35, '2025_05_30_140322_create_job_batches_table', 0),
(36, '2025_05_30_140322_create_jobs_table', 0),
(37, '2025_05_30_140322_create_model_has_permissions_table', 0),
(38, '2025_05_30_140322_create_model_has_roles_table', 0),
(39, '2025_05_30_140322_create_pagos_table', 0),
(40, '2025_05_30_140322_create_password_reset_tokens_table', 0),
(41, '2025_05_30_140322_create_permissions_table', 0),
(42, '2025_05_30_140322_create_personal_access_tokens_table', 0),
(43, '2025_05_30_140322_create_representantes_table', 0),
(44, '2025_05_30_140322_create_role_has_permissions_table', 0),
(45, '2025_05_30_140322_create_roles_table', 0),
(46, '2025_05_30_140322_create_sedes_table', 0),
(47, '2025_05_30_140322_create_sessions_table', 0),
(48, '2025_05_30_140322_create_users_table', 0),
(49, '2025_05_30_140325_add_foreign_keys_to_estudiantes_table', 0),
(50, '2025_05_30_140325_add_foreign_keys_to_horarios_table', 0),
(51, '2025_05_30_140325_add_foreign_keys_to_model_has_permissions_table', 0),
(52, '2025_05_30_140325_add_foreign_keys_to_model_has_roles_table', 0),
(53, '2025_05_30_140325_add_foreign_keys_to_pagos_table', 0),
(54, '2025_05_30_140325_add_foreign_keys_to_role_has_permissions_table', 0),
(55, '2025_06_01_023641_create_facturaciones_table', 0),
(56, '2025_06_01_023644_add_foreign_keys_to_facturaciones_table', 0),
(57, '2025_06_01_023913_create_pagos_table', 0),
(58, '2025_06_01_023916_add_foreign_keys_to_pagos_table', 0),
(59, '2025_06_25_181530_change_tipo_documento_to_string', 2),
(60, '2025_06_26_000629_rename_representantes_to_acudientes', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id` int(11) NOT NULL,
  `facturacion_id` int(11) NOT NULL,
  `estudiante_id` int(11) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `fecha_pago` date NOT NULL,
  `metodo_pago` varchar(25) NOT NULL,
  `numero_referencia_pago` varchar(100) DEFAULT NULL,
  `soporte_pago` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sedes`
--

CREATE TABLE `sedes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sedes`
--

INSERT INTO `sedes` (`id`, `nombre`, `direccion`) VALUES
(2, 'Castilla', '-'),
(3, 'La 33', '-'),
(5, 'La Floresta', '-'),
(6, 'La Estrella', '-'),
(7, 'Aranjuéz', '-'),
(8, 'San Lucas', '-');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `google_id`, `avatar_url`, `email_verified_at`, `password`, `remember_token`) VALUES
(1, 'Ibrahim', 'ibrahimhc19@gmail.com', NULL, NULL, NULL, '$2y$12$VFS0.ebeCP9BbQe.nIEj7eMq9PJgNXGQYA48XDtPU2cYN4u2ENxpq', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `acudientes`
--
ALTER TABLE `acudientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `acudiente_documento_identidad` (`documento_identidad`);

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `estudiante_documento_identidad` (`documento_identidad`),
  ADD KEY `estudiante_sede_id` (`sede_id`),
  ADD KEY `estudiante_horario_id` (`horario_id`),
  ADD KEY `estudiante_acudiente_id` (`acudiente_id`) USING BTREE;

--
-- Indices de la tabla `facturaciones`
--
ALTER TABLE `facturaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `factura_estudiante_id` (`estudiante_id`),
  ADD KEY `factura_sede_id` (`sede_id`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_horarios_sede` (`sede_id`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indices de la tabla `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pagos_estudiante_id` (`estudiante_id`),
  ADD KEY `fk_pagos_facturacion` (`facturacion_id`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indices de la tabla `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indices de la tabla `sedes`
--
ALTER TABLE `sedes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `acudientes`
--
ALTER TABLE `acudientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `facturaciones`
--
ALTER TABLE `facturaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sedes`
--
ALTER TABLE `sedes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `estudiantes`
--
ALTER TABLE `estudiantes`
  ADD CONSTRAINT `estudiantes_ibfk_1` FOREIGN KEY (`acudiente_id`) REFERENCES `acudientes` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `estudiantes_ibfk_2` FOREIGN KEY (`sede_id`) REFERENCES `sedes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `estudiantes_ibfk_3` FOREIGN KEY (`horario_id`) REFERENCES `horarios` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `facturaciones`
--
ALTER TABLE `facturaciones`
  ADD CONSTRAINT `facturaciones_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `facturaciones_ibfk_2` FOREIGN KEY (`sede_id`) REFERENCES `sedes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD CONSTRAINT `fk_horarios_sede` FOREIGN KEY (`sede_id`) REFERENCES `sedes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `fk_pagos_facturacion` FOREIGN KEY (`facturacion_id`) REFERENCES `facturaciones` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
