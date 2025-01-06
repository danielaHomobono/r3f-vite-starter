-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-05-2024 a las 15:32:03
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `IngresoLogin` (IN `Usu` VARCHAR(20), IN `Pass` VARCHAR(15))   BEGIN

select NomRol
	from usuario u inner join roles r on u.RolUsu = r.RolUsu
		where NombreUsu = Usu and PassUsu = Pass /* se compara con los parametros */
			and Activo = 1;
            
end$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `NuevoCliente` (IN `Nom` VARCHAR(30), IN `Ape` VARCHAR(40), IN `Tip` VARCHAR(20), IN `Doc` INT, OUT `rta` INT)   BEGIN
    DECLARE filas int default 0;
    DECLARE existe int default 0;

    SET filas = (SELECT count(*) FROM cliente);
    IF filas = 0 THEN
        SET filas = 452; /* consideramos a este numero como el primer numero de cliente */
    ELSE
        SET filas = (SELECT max(NCliente) + 1 FROM cliente);
        SET existe = (SELECT count(*) FROM cliente WHERE TDocC = Tip AND DocC = Doc);
    END IF;

    IF existe = 0 THEN
        INSERT INTO cliente VALUES (filas, Nom, Ape, Tip, Doc);
        SET rta  = filas;
    ELSE
        SET rta = existe;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `NuevoSocio` (IN `pNCliente` INT, OUT `rta` INT)   BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET rta = -1;
        ROLLBACK;
    END;

    START TRANSACTION;

    INSERT INTO socio (NCliente) VALUES (pNCliente);
    SET rta = LAST_INSERT_ID();

    COMMIT;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `actividad`
--

CREATE TABLE `actividad` (
  `NActividad` int(11) NOT NULL,
  `Nombre` varchar(40) DEFAULT NULL,
  `cupo` int(11) DEFAULT NULL,
  `precio` float DEFAULT NULL,
  `NProfesor` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `actividad`
--

INSERT INTO `actividad` (`NActividad`, `Nombre`, `cupo`, `precio`, `NProfesor`) VALUES
(1, 'Yoga', 20, 15.5, 1),
(2, 'Pilates', 15, 20, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `NCliente` int(11) NOT NULL,
  `NombreC` varchar(30) DEFAULT NULL,
  `ApellidoC` varchar(40) DEFAULT NULL,
  `TDocC` varchar(20) DEFAULT NULL,
  `DocC` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`NCliente`, `NombreC`, `ApellidoC`, `TDocC`, `DocC`) VALUES
(1, 'Pedro', 'Gomez', 'DNI', 87654321),
(452, 'daniela', 'ho', NULL, 2886543),
(453, 'dafr', 'homobono', NULL, 23456789),
(454, 'cc', 'homobono', NULL, 34567899),
(455, 'agus', 'Ber', NULL, 123456),
(456, 'da', 'da', NULL, 12),
(457, 'da', 'gro', NULL, 123478),
(458, 'daty', 'groer', NULL, 1234786),
(459, 'dfr', 'gtyu', NULL, 567890),
(460, 'dfr', 'gtyu', NULL, 567890),
(461, 'sol', 'perez', NULL, 456123),
(462, 'beto', 'asaber', NULL, 345654),
(463, 'betu', 'asaber', NULL, 876567),
(464, 'betu', 'asaber', NULL, 876567),
(465, 'vvvvvvvv', 'vvvvvvvvvvvvvvv', NULL, 44444),
(466, 'xxxx', 'zzzzzzzzzzzzzzz', NULL, 9878987),
(467, 'vero', 'res', NULL, 3456),
(468, 'vero', 'res', NULL, 3456),
(469, 'pepe', 'sapo', NULL, 11111111),
(470, 'eeeeeeee', 'eeeeeeeeeee', NULL, 4566666),
(471, 'wwwwww', 'eeeeeeeeeeeeeeee', NULL, 34554),
(472, 'fffffffff', '444444444444', NULL, 444),
(473, 'pepe', 'soriano', NULL, 2344),
(474, 'ffffff', 'rrrrrrrrrrrr', NULL, 234),
(475, 'vvvvvvvvvv', 'rrrrrrrrrrrrr', NULL, 555555),
(476, 'eeeeeeeeeee', 'ddddddddd', NULL, 4567655),
(477, 'eeeeeeeeeee', 'ddddddddd', NULL, 4567655),
(478, 'eeeeeeeeeee', 'ddddddddd', NULL, 4567655),
(479, 'ccccccccc', 'eeeeeeeeeeeee', NULL, 333),
(480, 'da', 'deeee', NULL, 12334),
(481, 'da', 'deeee', NULL, 12334),
(482, 'da', 'deeee', NULL, 12334),
(483, 'r', 'fffff', NULL, 4444455),
(484, 'flor', 'jaz', NULL, 4445555),
(485, 'dddddd', 'ffffffffff', NULL, 333333),
(486, 'ddddd', 'fffffffffffffff', NULL, 2323232),
(487, 'gerr', 'errr', NULL, 3444),
(488, 'fffffff', 'fffffffffffffff', NULL, 44455),
(489, 'kkkkkkk', 'gggggg', NULL, 66655777);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripcion`
--

CREATE TABLE `inscripcion` (
  `idInscri` int(11) NOT NULL,
  `NSocio` int(11) DEFAULT NULL,
  `NCliente` int(11) DEFAULT NULL,
  `idSesion` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pago`
--

CREATE TABLE `pago` (
  `idPago` int(11) NOT NULL,
  `idInscri` int(11) DEFAULT NULL,
  `monto` float DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

CREATE TABLE `profesor` (
  `NProfesor` int(11) NOT NULL,
  `NombreP` varchar(30) DEFAULT NULL,
  `ApellidoP` varchar(40) DEFAULT NULL,
  `TDocP` varchar(20) DEFAULT NULL,
  `DocP` int(11) DEFAULT NULL,
  `DomiP` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`NProfesor`, `NombreP`, `ApellidoP`, `TDocP`, `DocP`, `DomiP`) VALUES
(1, 'John', 'Doe', 'DNI', 12345678, '123 Main St'),
(2, 'Jane', 'Smith', 'DNI', 87654321, '456 Elm St'),
(3, 'John', 'Doe', 'DNI', 12345678, '123 Main St'),
(4, 'Jane', 'Smith', 'DNI', 87654321, '456 Elm St');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `RolUsu` int(11) NOT NULL,
  `NomRol` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`RolUsu`, `NomRol`) VALUES
(120, 'Administrador'),
(121, 'Empleado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sesion`
--

CREATE TABLE `sesion` (
  `idSesion` int(11) NOT NULL,
  `NActividad` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sesion`
--

INSERT INTO `sesion` (`idSesion`, `NActividad`, `fecha`) VALUES
(2, 1, '2024-06-01'),
(3, 2, '2024-06-02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `socio`
--

CREATE TABLE `socio` (
  `NSocio` int(11) NOT NULL,
  `NCliente` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `socio`
--

INSERT INTO `socio` (`NSocio`, `NCliente`) VALUES
(1, 480),
(2, 481),
(3, 482),
(4, 483),
(5, 484),
(6, 485),
(7, 486),
(8, 487),
(9, 488),
(10, 489);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `CodUsu` int(11) NOT NULL,
  `NombreUsu` varchar(20) DEFAULT NULL,
  `PassUsu` varchar(15) DEFAULT NULL,
  `RolUsu` int(11) DEFAULT NULL,
  `Activo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`CodUsu`, `NombreUsu`, `PassUsu`, `RolUsu`, `Activo`) VALUES
(26, 'Mari2023', '123456', 120, 1),
(27, 'UsuarioPrueba', 'Usu2023', 120, 1),
(28, 'UsuarioPrueba', 'Usu2023', 120, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `actividad`
--
ALTER TABLE `actividad`
  ADD PRIMARY KEY (`NActividad`),
  ADD KEY `fk_actividad_profesor` (`NProfesor`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`NCliente`);

--
-- Indices de la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD PRIMARY KEY (`idInscri`),
  ADD KEY `fk_inscripcion_cliente` (`NCliente`),
  ADD KEY `fk_inscripcion_sesion` (`idSesion`),
  ADD KEY `fk_inscripcion_socio` (`NSocio`);

--
-- Indices de la tabla `pago`
--
ALTER TABLE `pago`
  ADD PRIMARY KEY (`idPago`),
  ADD KEY `fk_pago` (`idInscri`);

--
-- Indices de la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD PRIMARY KEY (`NProfesor`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`RolUsu`);

--
-- Indices de la tabla `sesion`
--
ALTER TABLE `sesion`
  ADD PRIMARY KEY (`idSesion`),
  ADD KEY `fk_sesion` (`NActividad`);

--
-- Indices de la tabla `socio`
--
ALTER TABLE `socio`
  ADD PRIMARY KEY (`NSocio`),
  ADD KEY `fk_socio` (`NCliente`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`CodUsu`),
  ADD KEY `fk_usuario` (`RolUsu`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `sesion`
--
ALTER TABLE `sesion`
  MODIFY `idSesion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `socio`
--
ALTER TABLE `socio`
  MODIFY `NSocio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `CodUsu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `actividad`
--
ALTER TABLE `actividad`
  ADD CONSTRAINT `fk_actividad_profesor` FOREIGN KEY (`NProfesor`) REFERENCES `profesor` (`NProfesor`);

--
-- Filtros para la tabla `inscripcion`
--
ALTER TABLE `inscripcion`
  ADD CONSTRAINT `fk_inscripcion_cliente` FOREIGN KEY (`NCliente`) REFERENCES `cliente` (`NCliente`),
  ADD CONSTRAINT `fk_inscripcion_sesion` FOREIGN KEY (`idSesion`) REFERENCES `sesion` (`idSesion`),
  ADD CONSTRAINT `fk_inscripcion_socio` FOREIGN KEY (`NSocio`) REFERENCES `socio` (`NSocio`);

--
-- Filtros para la tabla `pago`
--
ALTER TABLE `pago`
  ADD CONSTRAINT `fk_pago` FOREIGN KEY (`idInscri`) REFERENCES `inscripcion` (`idInscri`);

--
-- Filtros para la tabla `sesion`
--
ALTER TABLE `sesion`
  ADD CONSTRAINT `fk_sesion` FOREIGN KEY (`NActividad`) REFERENCES `actividad` (`NActividad`);

--
-- Filtros para la tabla `socio`
--
ALTER TABLE `socio`
  ADD CONSTRAINT `fk_socio` FOREIGN KEY (`NCliente`) REFERENCES `cliente` (`NCliente`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario` FOREIGN KEY (`RolUsu`) REFERENCES `roles` (`RolUsu`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
