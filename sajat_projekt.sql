-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Dec 17. 20:22
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `sajat_projekt`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone_number` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `address`, `phone_number`) VALUES
(1, 'asd', 'hajasm778@gmail.com', '$2b$12$wGTsCSuEDxDu6IME34EPBe1Yor4xcD5J8plU5FXvTsAaEJJMG.xsK', 'asdasd', 2147483647),
(2, 'admin', 'admin@gmail.com', '$2b$12$h0u4K5fxvcnZx9YgDybjS.jqroJnMNa5hRdTOHJaOacgekz9tM89O', 'asd', 123123),
(3, 'cigany', 'cigany@fasz.com', '$2b$12$eqhC3RKDuu7bZuE415xsH.lngSAV2Fjw2D3TXYi2bQW01vV0sbVHS', 'asd', 2147483647);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


INSERT INTO products (name, description, price, quantity, image) VALUES
("Apple iPhone 17 Pro", "256 GB", 550000, 15, "https://p1.akcdn.net/full/1470426085.apple-iphone-17-pro-1tb.jpg"),
("Apple iPhone 17", "256 GB", 400000, 31, "https://p1.akcdn.net/full/1470425923.apple-iphone-17-256gb.jpg"),
("Apple iPhone 17 Air", "256 GB", 500000, 7, "https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/iphone-air-finish-unselect-gallery-1-202509_GEO_EMEA_FMT_WHH?wid=1280&hei=492&fmt=jpeg&qlt=90&.v=1757958360560"),
("Apple iPhone 17 Pro Max", "256 GB", 600000, 3, "https://icentre.hu/storage/files/images/products/iphone-17-pro-max-256gb-kozmosznarancs_02.webp");