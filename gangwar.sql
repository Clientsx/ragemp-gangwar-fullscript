-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 22. Mrz 2022 um 11:40
-- Server-Version: 10.4.22-MariaDB
-- PHP-Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `gangwar`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `Username` varchar(32) NOT NULL,
  `SocialClub` varchar(255) NOT NULL,
  `HWID` varchar(255) NOT NULL,
  `Ban` int(11) NOT NULL,
  `Banreason` varchar(128) NOT NULL DEFAULT 'Keinen Grund angegeben',
  `Admin` int(3) NOT NULL DEFAULT 0,
  `Vip` int(11) NOT NULL,
  `Money` varchar(64) NOT NULL DEFAULT '5000',
  `Kills` int(15) NOT NULL DEFAULT 2,
  `Deaths` int(15) NOT NULL DEFAULT 1,
  `Level` int(8) NOT NULL DEFAULT 1,
  `xp` int(32) NOT NULL DEFAULT 25,
  `maxxp` int(32) NOT NULL DEFAULT 100,
  `team` varchar(128) NOT NULL DEFAULT '"NONE"',
  `isleader` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `accounts`
--

INSERT INTO `accounts` (`id`, `Username`, `SocialClub`, `HWID`, `Ban`, `Banreason`, `Admin`, `Vip`, `Money`, `Kills`, `Deaths`, `Level`, `xp`, `maxxp`, `team`, `isleader`) VALUES
(37, 'Gustawo', 'Hurensohn69101', 'D8903A045B461938CEA2534C71D2C1B075D0BFA8F4E4CF3818500A1C435E01E09E5AABE4693A29B8ED9037D854F4A7705810DA342B76E9886E12037C61F8EC40', 0, 'Keinen Grund angegeben', 6, 0, '82500', 270, 158, 139, 275, 800, '187', 1),
(38, 'Client', 'ILoveMyAK47YO', 'D8903A045BA0CFC0A15C1C447E62C210B9E286BC9CC8E0983EF018C8DD221020F8D242D0A78411B0D9BAE3D827E81400417C08A056B6E98071300328847E18C0', 0, 'Keinen Grund angegeben', 8, 0, '12098712', 113, 209, 133, 100, 500, 'LSPD', 1),
(39, 'Exit', 'PatronDerG', 'D8903A045B06BDC8CBE0311022682BD01F3C7DC08B34D540884C5B641D2AE76030C604E85C7EDB585EB6105476AAA8805EB26D349706F5805BF8AE50D14C7680', 0, 'Keinen Grund angegeben', 6, 0, '5000', 179, 45, 127, 200, 450, '\"NONE\"', 0),
(40, 'Yazira', 'MadCauseMe', 'D8903A045BFA2A20489266042726C110B9E273A887F425E089F018C8DD22E1C0A4107F08F7723358D9BAE3ACFABA7290D41208A056B6E9C85628D86CAA401C00', 0, 'Keinen Grund angegeben', 0, 0, '5000', 54, 103, 120, 275, 300, '\"NONE\"', 0),
(41, 'Red', 'zTryHardx_', 'D8903A045B4620581F46760811C4D2B075E21EE4870AC9C8A2F018C8DD223F004BAEF5C82E1E2230E312E33881BAA1D0A34408A056B6E938E03E3DA41A7AB180', 0, 'Keinen Grund angegeben', 0, 0, '5000', 57, 91, 126, 0, 400, '\"NONE\"', 0),
(42, 'OzyV', 'OzyVkiLL', 'CFBAFD2CC3261F588CF44758F72E7AF0ADEED10C0586DD20E26246144DF411A0DF7655E4ED62B4D07D34316C6E3293D01B9EC354E748BE98224E8BE85322F1C0', 0, 'Keinen Grund angegeben', 7, 0, '5000', 9, 33, 3, 50, 150, '\"NONE\"', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `colshapes`
--

CREATE TABLE `colshapes` (
  `id` int(11) NOT NULL,
  `posX` float NOT NULL DEFAULT 15,
  `posY` float NOT NULL DEFAULT 15,
  `posZ` float NOT NULL DEFAULT 75,
  `Event` varchar(64) NOT NULL DEFAULT 'NONE',
  `haveMessage` int(11) NOT NULL DEFAULT 0,
  `Message` varchar(128) NOT NULL DEFAULT 'Keine Nachricht',
  `dimension` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `colshapes`
--

INSERT INTO `colshapes` (`id`, `posX`, `posY`, `posZ`, `Event`, `haveMessage`, `Message`, `dimension`) VALUES
(1, -38.5107, -1109.32, 26.4374, 'openAutohaus', 1, 'Drück E zum öffnen.', 0),
(2, -48.4722, -1075.06, 26.7869, 'sellVehicleShape', 1, 'Drück E zum verkaufen.', 0),
(3, -1534.43, 80.3046, 56.7743, 'openGarage', 1, 'Drück E zum öffnen.', 0),
(4, -1525.97, 868.967, 181.818, 'openGarage', 1, 'Drück E zum öffnen.', 0),
(6, -1786.63, 459.578, 128.308, 'openGarage', 1, 'Drück E zum öffnen.', 0),
(7, -68.8828, -1458.78, 32.1155, 'openGarage', 1, 'Drück E zum öffnen.', 0),
(8, 102.746, -1958.99, 20.7951, 'openGarage', 1, 'Drück E zum öffnen.', 0),
(9, 337.579, -2035.95, 21.3676, 'openGarage', 1, 'Drück E zum öffnen.', 0),
(10, 478.443, -1794.06, 28.5303, 'openGarage', 1, 'Drück E zum öffnen.', 0),
(11, 1151.28, -1656.67, 36.527, 'openGarage', 1, 'Drück E zum öffnen.', 0),
(12, -984.282, -2640.93, 13.9675, 'openGarage', 1, 'Drück E zum öffnen.', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `components`
--

CREATE TABLE `components` (
  `id` int(11) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Weapon` varchar(64) NOT NULL,
  `Component` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `components`
--

INSERT INTO `components` (`id`, `Username`, `Weapon`, `Component`) VALUES
(108, 'Gustawo', 'Advancedrifle', 'COMPONENT_AT_AR_SUPP'),
(109, 'Gustawo', 'Advancedrifle', 'COMPONENT_ADVANCEDRIFLE_CLIP_02'),
(110, 'Client', 'Advancedrifle', 'COMPONENT_AT_AR_SUPP'),
(111, 'Gustawo', 'Smg', 'COMPONENT_AT_PI_SUPP'),
(112, 'Client', 'Advancedrifle', 'COMPONENT_ADVANCEDRIFLE_CLIP_02'),
(113, 'Gustawo', 'Smg', 'COMPONENT_SMG_CLIP_02'),
(114, 'Gustawo', 'Carbinerifle', 'COMPONENT_AT_AR_SUPP'),
(115, 'Client', 'Minismg', 'COMPONENT_MINISMG_CLIP_02');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `garage`
--

CREATE TABLE `garage` (
  `id` int(11) NOT NULL,
  `Username` varchar(128) NOT NULL,
  `GarageVehicleID` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `garage`
--

INSERT INTO `garage` (`id`, `Username`, `GarageVehicleID`) VALUES
(1, 'Client', 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `Username` varchar(128) NOT NULL,
  `Tokens` int(11) NOT NULL DEFAULT 10,
  `Gifts` int(11) NOT NULL DEFAULT 1,
  `XpBoost` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `inventory`
--

INSERT INTO `inventory` (`id`, `Username`, `Tokens`, `Gifts`, `XpBoost`) VALUES
(35, 'Gustawo', 10, 1, 0),
(36, 'Client', 76434, 1, 12),
(37, 'Exit', 1000, 1, 3),
(38, 'Yazira', 100, 1, 1),
(39, 'Red', 100, 1, 1),
(40, 'OzyV', 100, 1, 10);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `team`
--

CREATE TABLE `team` (
  `id` int(11) NOT NULL,
  `teamname` varchar(128) NOT NULL DEFAULT 'NONE',
  `teamposx` float NOT NULL,
  `teamposy` float NOT NULL,
  `teamposz` float NOT NULL,
  `teamposr` float NOT NULL,
  `teamblip` int(11) NOT NULL DEFAULT 1,
  `teamblipcolor` int(11) NOT NULL DEFAULT 1,
  `teamstate` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `team`
--

INSERT INTO `team` (`id`, `teamname`, `teamposx`, `teamposy`, `teamposz`, `teamposr`, `teamblip`, `teamblipcolor`, `teamstate`) VALUES
(2, 'Grove', 112.12, -1960.26, 20.9403, 14.5363, 310, 25, 0),
(3, 'Ballas', -38.6467, -1444.03, 31.4935, -179.777, 310, 7, 0),
(4, 'Vagos', 343.81, -2028.49, 22.3543, 139.985, 310, 46, 0),
(5, 'Crips', 472.935, -1775.34, 28.8802, -91.1629, 310, 38, 0),
(6, 'Bloods', 1286.7, -1604.5, 54.8249, 14.0551, 310, 1, 0),
(7, 'MG13', 1386.04, -593.309, 74.4855, 54.5861, 310, 77, 1),
(8, 'LSPD', 447.636, -983.199, 30.6896, 82.2141, 60, 53, 1),
(9, 'LCN', -1537.25, 130.23, 57.3713, 134.01, 310, 40, 0),
(10, 'Triaden', -1804.9, 437.135, 128.709, -1.52365, 310, 78, 0),
(11, 'Yakuza', -1516.73, 851.568, 181.595, -13.4698, 310, 76, 0),
(12, '187', -1580.43, -34.1569, 57.5652, -81.6862, 310, 56, 1);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `teamclothes`
--

CREATE TABLE `teamclothes` (
  `id` int(11) NOT NULL,
  `frakname` varchar(128) NOT NULL DEFAULT 'Zivilist',
  `MaskD` int(11) NOT NULL,
  `MaskT` int(11) NOT NULL,
  `HatD` int(11) NOT NULL,
  `HatT` int(11) NOT NULL,
  `JacketD` int(11) NOT NULL,
  `JacketT` int(11) NOT NULL,
  `ShirtD` int(11) NOT NULL,
  `ShirtT` int(11) NOT NULL,
  `LegD` int(11) NOT NULL,
  `LegT` int(11) NOT NULL,
  `ShoesD` int(11) NOT NULL,
  `ShoesT` int(11) NOT NULL,
  `HandsD` int(11) NOT NULL,
  `HandsT` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `teamclothes`
--

INSERT INTO `teamclothes` (`id`, `frakname`, `MaskD`, `MaskT`, `HatD`, `HatT`, `JacketD`, `JacketT`, `ShirtD`, `ShirtT`, `LegD`, `LegT`, `ShoesD`, `ShoesT`, `HandsD`, `HandsT`) VALUES
(10, 'Ballas', 111, 2, 83, 0, 139, 3, 15, 0, 5, 9, 6, 0, 4, 0),
(11, 'Ballas', 111, 2, 83, 0, 305, 9, 15, 0, 16, 5, 6, 0, 4, 0),
(12, 'Ballas', 111, 2, 109, 4, 305, 0, 15, 0, 15, 8, 6, 0, 4, 0),
(13, 'Ballas', 111, 2, 104, 20, 350, 0, 15, 0, 69, 0, 6, 0, 0, 0),
(15, 'Grove', 111, 0, 83, 0, 139, 3, 15, 0, 16, 4, 6, 0, 4, 0),
(16, 'Grove', 111, 0, 83, 0, 305, 7, 15, 0, 6, 1, 6, 0, 4, 0),
(17, 'Grove', 111, 0, 83, 0, 305, 0, 15, 0, 5, 6, 6, 0, 4, 0),
(18, 'Bloods', 111, 9, 94, 1, 79, 0, 15, 0, 6, 0, 6, 0, 4, 0),
(19, 'Bloods', 111, 9, 94, 1, 127, 10, 0, 0, 5, 0, 8, 7, 4, 0),
(20, 'Bloods', 111, 9, 96, 1, 128, 4, 15, 0, 6, 1, 8, 7, 0, 0),
(22, 'Bloods', 111, 9, 142, 2, 387, 2, 0, 0, 6, 16, 6, 0, 1, 0),
(23, 'Vagos', 51, 8, 110, 2, 271, 6, 15, 0, 16, 2, 6, 0, 0, 0),
(24, 'Vagos', 51, 8, 104, 22, 305, 11, 15, 0, 6, 0, 6, 0, 0, 0),
(25, 'Vagos', 51, 8, 104, 20, 305, 13, 15, 0, 6, 1, 6, 0, 0, 0),
(26, 'Vagos', 51, 8, 109, 4, 310, 0, 15, 0, 119, 0, 6, 0, 14, 0),
(27, 'Crips', 111, 4, 142, 8, 374, 0, 15, 0, 54, 0, 6, 0, 14, 0),
(28, 'Crips', 111, 4, 94, 2, 225, 0, 15, 0, 62, 0, 6, 0, 8, 0),
(29, 'Crips', 111, 4, 94, 2, 5, 0, 15, 0, 64, 0, 6, 0, 5, 0),
(30, 'LCN', 111, 17, 12, 0, 154, 0, 15, 0, 28, 0, 10, 0, 6, 0),
(31, 'LCN', 111, 18, 12, 1, 154, 0, 15, 0, 24, 5, 36, 1, 6, 0),
(32, 'LCN', 111, 18, 142, 0, 139, 3, 15, 0, 24, 5, 30, 0, 4, 0),
(34, 'LCN', 111, 17, 142, 0, 139, 3, 15, 0, 24, 0, 30, 1, 4, 0),
(35, 'Yakuza', 111, 5, 142, 0, 139, 3, 15, 0, 24, 4, 6, 0, 4, 0),
(36, 'Yakuza', 111, 5, 142, 0, 139, 1, 15, 0, 24, 0, 6, 0, 4, 0),
(37, 'Yakuza', 111, 5, 142, 0, 107, 2, 15, 0, 24, 0, 6, 0, 4, 0),
(38, 'Yakuza', 111, 5, 83, 0, 235, 0, 15, 0, 24, 4, 6, 0, 0, 0),
(39, 'Triaden', 118, 8, 11, 0, 77, 2, 31, 0, 28, 11, 10, 0, 0, 0),
(40, 'Triaden', 118, 8, 11, 0, 94, 0, 15, 0, 28, 11, 10, 0, 0, 0),
(41, 'Triaden', 118, 8, 11, 0, 131, 0, 15, 0, 28, 11, 10, 0, 0, 0),
(42, 'Triaden', 118, 8, 11, 0, 139, 3, 15, 0, 28, 11, 10, 0, 4, 0),
(43, '187', 51, 0, 104, 20, 135, 0, 15, 0, 28, 0, 6, 0, 0, 0),
(44, '187', 51, 0, 142, 0, 135, 0, 15, 0, 28, 0, 6, 0, 0, 0),
(45, '187', 51, 0, 142, 0, 139, 3, 15, 0, 28, 0, 6, 0, 4, 0),
(46, '187', 51, 0, 104, 20, 50, 0, 170, 0, 28, 0, 6, 0, 4, 0),
(47, '187', 111, 16, 59, 2, 131, 0, 15, 0, 16, 1, 5, 0, 0, 0),
(48, 'Grove', 0, 0, 164, 0, 392, 0, 15, 0, 1, 0, 6, 0, 0, 0),
(53, '187', 54, 0, 121, 0, 135, 0, 15, 0, 28, 0, 6, 0, 0, 0),
(54, '187', 44, 0, 121, 0, 382, 0, 15, 0, 131, 0, 6, 0, 0, 0),
(55, 'LSPD', 50, 4, 123, 0, 49, 0, 15, 0, 24, 0, 10, 0, 1, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `vehicles`
--

CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL,
  `model` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `vehicles`
--

INSERT INTO `vehicles` (`id`, `model`, `owner`) VALUES
(14, 'Schafter6', 'Client'),
(15, 'Skyline', 'Client'),
(16, 'Widebodyled', 'Client'),
(17, 'R35', 'Client'),
(18, 'Mariokart7', 'Client'),
(19, 'Luigiskart7', 'Client'),
(20, 'Mariokart8', 'Client');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `colshapes`
--
ALTER TABLE `colshapes`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `components`
--
ALTER TABLE `components`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `garage`
--
ALTER TABLE `garage`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `teamclothes`
--
ALTER TABLE `teamclothes`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `vehicles`
--
ALTER TABLE `vehicles`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT für Tabelle `colshapes`
--
ALTER TABLE `colshapes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT für Tabelle `components`
--
ALTER TABLE `components`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;

--
-- AUTO_INCREMENT für Tabelle `garage`
--
ALTER TABLE `garage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT für Tabelle `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT für Tabelle `teamclothes`
--
ALTER TABLE `teamclothes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT für Tabelle `vehicles`
--
ALTER TABLE `vehicles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
