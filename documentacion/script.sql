-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-10-2021 a las 06:32:26
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tarjeta_credito`
--

--
-- Volcado de datos para la tabla `Comentario`
--

INSERT INTO `Comentario` (`comentario_id`, `comentario`, `usuario_id`) VALUES
(1, 'Excelente servicio. 10/10 -IGN', 2),
(2, 'Bonito diseño', 2);

--
-- Volcado de datos para la tabla `Deshabilitacion`
--

INSERT INTO `Deshabilitacion` (`id`, `motivo`, `tarjeta_id`, `fecha`) VALUES
(4, 'asdfds', 19, '2021-10-26');

--
-- Volcado de datos para la tabla `Eliminacion`
--

INSERT INTO `Eliminacion` (`id`, `motivo`, `tarjeta_id`) VALUES
(1, 'Limite incorrecto', 16),
(2, 'Peticion del usuario', 17);

--
-- Volcado de datos para la tabla `Moneda`
--

INSERT INTO `Moneda` (`moneda_id`, `nombre`, `cambio_quetzales`, `simbolo`) VALUES
(1, 'Quetzal', 1, 'Q'),
(2, 'Dolar', 7.5, '$');

--
-- Volcado de datos para la tabla `Tarjeta`
--

INSERT INTO `Tarjeta` (`tarjeta_id`, `numero_tarjeta`, `cvv`, `fecha_vencimiento`, `notifyme`, `limite`, `saldo`, `usuario_id`, `tipo_cuenta_id`) VALUES
(1, '1000101898', '111', '2025-10-22', 0, 3000, 1130, 2, 1),
(2, '1000201899', '123', '2025-10-23', 1, 3000, 0, 2, 1),
(16, '1000301895', '123', '2025-10-23', 1, 3000, 0, 2, 1),
(17, '1000402897', '648', '2026-10-25', 0, 3000, 0, 2, 1),
(18, '1000502892', '942', '2026-10-25', 0, 3000, 0, 2, 1),
(19, '2000602895', '725', '2026-10-25', 1, 1000, 180, 2, 2),
(20, '2000702891', '326', '2026-10-25', 1, 1500, 40, 2, 2),
(21, '1000802894', '659', '2026-10-26', 0, 3000, 0, 2, 1);

--
-- Volcado de datos para la tabla `Tipo_cuenta`
--

INSERT INTO `Tipo_cuenta` (`tipo_cuenta_id`, `nombre`, `limite_default`, `moneda_id`) VALUES
(1, 'Normal', 3000, 1),
(2, 'Gold', 1000, 2);

--
-- Volcado de datos para la tabla `Transaccion`
--

INSERT INTO `Transaccion` (`transaccion_id`, `monto`, `es_Aumento`, `tarjeta_id`, `fecha`) VALUES
(1, 200, 1, 1, '2021-10-24'),
(2, 500, 1, 1, '2021-10-11'),
(3, 50, 0, 1, '2021-10-05'),
(4, 200, 1, 19, '2021-10-25'),
(5, 50, 1, 20, '2021-10-25'),
(6, 100, 0, 1, '2021-10-27'),
(7, 50, 0, 1, '2021-10-27'),
(8, 50, 0, 1, '2021-10-27'),
(9, 10, 0, 19, '2021-10-27'),
(10, 10, 0, 19, '2021-10-27'),
(11, 50, 0, 1, '2021-10-27'),
(12, 20, 0, 1, '2021-10-27'),
(13, 20, 0, 1, '2021-10-27'),
(14, 80, 0, 1, '2021-10-27'),
(15, 5, 0, 1, '2021-10-27'),
(16, 5, 0, 1, '2021-10-27'),
(17, 5, 0, 1, '2021-10-27'),
(18, 5, 0, 1, '2021-10-27'),
(19, 5, 0, 1, '2021-10-27'),
(20, 5, 0, 1, '2021-10-27'),
(21, 5, 0, 1, '2021-10-27'),
(22, 5, 0, 1, '2021-10-27'),
(23, 5, 0, 1, '2021-10-27'),
(24, 5, 0, 1, '2021-10-27'),
(25, 5, 0, 1, '2021-10-27'),
(26, 5, 0, 1, '2021-10-27'),
(28, 500, 1, 1, '2021-10-28'),
(29, 1000, 1, 1, '2021-10-28'),
(30, 700, 0, 1, '2021-10-28'),
(31, 20, 0, 1, '2021-10-28'),
(32, 5, 1, 1, '2021-10-28'),
(33, 5, 1, 1, '2021-10-28'),
(34, 5, 1, 1, '2021-10-28'),
(35, 5, 1, 1, '2021-10-28'),
(36, 5, 1, 1, '2021-10-28'),
(37, 5, 1, 1, '2021-10-28'),
(38, 5, 1, 1, '2021-10-28'),
(39, 5, 1, 1, '2021-10-28'),
(40, 5, 1, 1, '2021-10-28'),
(41, 5, 1, 1, '2021-10-28'),
(42, 5, 1, 1, '2021-10-28'),
(43, 5, 1, 1, '2021-10-28'),
(44, 5, 1, 1, '2021-10-28'),
(45, 5, 1, 1, '2021-10-28'),
(46, 5, 1, 1, '2021-10-28'),
(47, 5, 1, 1, '2021-10-28'),
(48, 5, 1, 1, '2021-10-28'),
(49, 5, 1, 1, '2021-10-28'),
(50, 5, 1, 1, '2021-10-28'),
(51, 5, 1, 1, '2021-10-28'),
(52, 5, 1, 1, '2021-10-28'),
(53, 5, 1, 1, '2021-10-28'),
(54, 5, 1, 1, '2021-10-28'),
(55, 5, 1, 1, '2021-10-28'),
(56, 5, 1, 1, '2021-10-28'),
(57, 5, 1, 1, '2021-10-28'),
(58, 5, 0, 20, '2021-10-28'),
(59, 5, 0, 20, '2021-10-28'),
(60, 1, 0, 20, '2021-10-28'),
(61, 1, 1, 20, '2021-10-28'),
(62, 5, 1, 20, '2021-10-28'),
(63, 5, 0, 20, '2021-10-28'),
(64, 5, 0, 20, '2021-10-28'),
(65, 5, 0, 20, '2021-10-28'),
(66, 10, 1, 20, '2021-10-28');

--
-- Volcado de datos para la tabla `Usuario`
--

INSERT INTO `Usuario` (`usuario_id`, `dpi`, `nombre`, `username`, `correo`, `password`, `admin`) VALUES
(1, '1234567891235', 'Luis', 'luis', 'luisito@gmail.com', '1234', 1),
(2, '1234567891234', 'Anthony Garcia', 'thony', 'anthonyegs@gmail.com', '1234', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
