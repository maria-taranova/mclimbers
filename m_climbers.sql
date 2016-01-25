-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 25, 2016 at 01:48 AM
-- Server version: 5.5.42
-- PHP Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `m_climbers`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(40) NOT NULL COMMENT 'Auto Increment',
  `username` varchar(20) NOT NULL,
  `lname` varchar(60) DEFAULT NULL,
  `fname` varchar(60) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `locationID` int(40) DEFAULT NULL COMMENT 'FK for location',
  `email` varchar(60) DEFAULT NULL,
  `profilePicture` varchar(500) DEFAULT NULL,
  `fb_id` varchar(100) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=278 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `lname`, `fname`, `password`, `locationID`, `email`, `profilePicture`, `fb_id`) VALUES
(4, 'mariataranova', 'Taranova', 'Mariia', '202cb962ac59075b964b07152d234b70', 1, 'email@test.test', 'https://scontent.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/10488244_10152270992207992_5698782110782439683_n.jpg?oh=df15aaacf0219ccb1ce7d0aab892c7c3&oe=56F47A6F', NULL),
(6, 'akshaychauhan', 'Chauhan', 'Akshay', '202cb962ac59075b964b07152d234b70', 1, 'email@test.test', 'https://scontent.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/1782014_10152366483067140_1732864458641428858_n.jpg?oh=c3031c60289f67fe93d32fc3e654323f&oe=56F72325', NULL),
(8, 'jonathanlee', 'Lee', 'Jonathan', '202cb962ac59075b964b07152d234b70', 1, 'email@test.test', 'https://scontent.xx.fbcdn.net/hphotos-xaf1/v/t1.0-9/11924960_1162646833749092_7489155473597122314_n.jpg?oh=bffacfb0315225bfc43d5d22cc813740&oe=56AC9739', NULL),
(10, 'nikkipearce', 'Pearce', 'Nikki', '202cb962ac59075b964b07152d234b70', 1, 'email@test.test', 'https://scontent.xx.fbcdn.net/hphotos-xtp1/v/t1.0-9/12227196_10153607856770155_191112048453626502_n.jpg?oh=5b191fc1c42c59c8850b05b1492a10a0&oe=56B47198', NULL),
(251, 'Jim', 'Jimothy', 'Jim', '202cb962ac59075b964b07152d234b70', 1, 'jim@jim.jim', '', NULL),
(276, 'mtaranova', 'Taranova', 'Maria', '81dc9bdb52d04dc20036dbd8313ed055', 1, 'mariia.taranova@gmail.com', '', NULL),
(277, 'mt', 'T', 'M', '827ccb0eea8a706c4c34a16891f84e7b', 1, 'j@j.com', '', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `locationID` (`locationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT COMMENT 'Auto Increment',AUTO_INCREMENT=278;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`locationID`) REFERENCES `location` (`id`);
