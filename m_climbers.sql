-- phpMyAdmin SQL Dump
-- version 4.4.10
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 25, 2016 at 02:38 AM
-- Server version: 5.5.42
-- PHP Version: 5.6.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `m_climbers`
--

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(40) NOT NULL,
  `city` varchar(20) NOT NULL,
  `province` varchar(2) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `city`, `province`) VALUES
(1, 'Vancouver', 'BC'),
(2, 'Fraser Valley', 'BC'),
(3, 'Howe Sound', 'BC'),
(4, 'Pemberton', 'BC'),
(5, 'Ridge Meadows', 'BC'),
(6, 'Surrey', 'BC'),
(7, 'Langley', 'BC'),
(8, 'The North Shore', 'BC'),
(9, 'Tri Cities', 'BC'),
(10, 'Delta', 'BC'),
(11, 'Whistler', 'BC');

-- --------------------------------------------------------

--
-- Table structure for table `pictures`
--

CREATE TABLE `pictures` (
  `id` int(11) NOT NULL,
  `trailID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `link` varchar(300) NOT NULL,
  `comment` text CHARACTER SET utf8
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pictures`
--

INSERT INTO `pictures` (`id`, `trailID`, `userID`, `link`, `comment`) VALUES
(1, 1, 6, 'https://www.bchydro.com/content/dam/BCHydro/customer-portal/photographs/nature/water/buntzen-lake-full-width-nature.jpg', 'Comment #1'),
(2, 2, 10, 'http://www.buntzenlake.ca/wp-content/uploads/2014/03/North-Beach-Buntzen-Lake.jpg', 'Comment #1'),
(3, 1, 10, 'http://www.buntzenlake.ca/wp-content/uploads/2014/03/Winter-scene-at-Bunzten-Lake.jpg', 'Comment #2'),
(4, 2, 10, 'http://www.vancouvertour.info/images/lakes/buntzen_lake_1_.jpg', 'Comment #5'),
(5, 3, 10, 'http://farm7.staticflickr.com/6020/6000557809_3d245a5b50.jpg', 'Comment #2'),
(6, 4, 10, 'http://www.clubtread.com/articles/buntzen/b3.jpg', 'Comment #4'),
(7, 4, 10, 'http://www.campcranberrylake.com/images/lake.jpg', 'Comment #5'),
(8, 5, 10, 'http://blog.hellobc.com/wp-content/uploads/2013/09/Bowron-Lake-Canoe-Moose-1.jpg', 'Comment #2'),
(9, 6, 10, 'http://www.albertawow.com/campgrounds/waterfowl/Water_Fowl_Lakes_Campground_Banff_National_Park_3524.JPG', 'Comment #4'),
(10, 6, 10, 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Sasthamcotta_Lake_By_ArunElectra.jpg', 'Comment #5'),
(11, 7, 10, 'https://tripuratourismplaces.files.wordpress.com/2013/02/kamalasagar-lake-tripura-tourism-places1.jpg', 'Comment #2'),
(12, 8, 10, 'http://heinzfuneralhome.com/wp-content/uploads/2014/01/Cooper-Lake-Sunset.jpg', 'Comment #4'),
(13, 6, 4, 'pictures/Alicelake_1.jpg', 'Alice Lake '),
(14, 6, 8, 'pictures/Alicelake_2.jpg', 'Alice Lake'),
(15, 6, 10, 'pictures/Alicelake_3.jpg', 'Alice Lake Comment'),
(16, 6, 8, 'pictures/Alicelake_4.jpg', 'AliceLake'),
(17, 18, 8, 'pictures/Blacktusk_1.jpg', 'Black Tusk'),
(18, 18, 10, 'pictures/Blacktusk_2.jpg', 'Black Tusk'),
(19, 18, 8, 'pictures/Blacktusk_3.jpg', 'Black Tusk'),
(20, 18, 10, 'pictures/Blacktusk_4.jpg', 'Black Tusk'),
(21, 15, 4, 'pictures/Buntzenlake_1.jpg', 'Buntzen Lake'),
(22, 15, 10, 'pictures/Buntzenlake_2.jpg', 'Black Tusk'),
(23, 15, 6, 'pictures/Buntzenlake_3.jpg', 'Buntzen Lake'),
(24, 15, 8, 'pictures/Buntzenlake_4.jpg', 'Black Tusk'),
(25, 1, 4, 'pictures/Burnabylake_1.jpg', 'Burnaby Lake'),
(26, 1, 6, 'pictures/Burnabylake_2.jpg', 'Burnaby Lake'),
(27, 1, 8, 'pictures/Burnabylake_3.jpg', 'Burnaby Lake'),
(28, 1, 10, 'pictures/Burnabylake_4.jpg', 'Burnaby Lake'),
(34, 16, 4, 'pictures/Burnsbog_1.jpg', 'Burns Bog'),
(35, 16, 6, 'pictures/Burnsbog_2.jpg', 'Burns Bog'),
(36, 16, 4, 'pictures/Burnsbog_3.jpg', 'Burns Bog'),
(37, 16, 6, 'pictures/Burnsbog_4.jpg', 'Burns Bog'),
(38, 10, 4, 'pictures/CampbellValley_1.jpg', 'Campbell Valley Regional Park'),
(39, 10, 6, 'pictures/CampbellValley_2.jpg', 'Campbell Valley Regional Park'),
(40, 10, 4, 'pictures/CampbellValley_3.jpg', 'Campbell Valley Regional Park'),
(41, 10, 6, 'pictures/CampbellValley_4.jpg', 'Campbell Valley Regional Park'),
(42, 2, 4, 'pictures/Deerlake_1.jpg', 'Deer Lake Park'),
(43, 2, 6, 'pictures/Deerlake_2.jpg', 'Deer Lake Park'),
(44, 2, 4, 'pictures/Deerlake_3.jpg', 'Deer Lake Park'),
(45, 2, 6, 'pictures/Deerlake_4.jpg', 'Deer Lake Park'),
(46, 11, 4, 'pictures/Derbyreach_1.jpg', 'Derby Reach'),
(47, 11, 6, 'pictures/Derbyreach_2.jpg', 'Derby Reach'),
(48, 11, 4, 'pictures/Derbyreach_3.jpg', 'Derby Reach'),
(49, 11, 6, 'pictures/Derbyreach_4.jpg', 'Derby Reach'),
(50, 13, 4, 'pictures/Eaglebluffs_1.jpg', 'Eagle Bluffs'),
(51, 13, 6, 'pictures/Eaglebluffs_2.jpg', 'Eagle Bluffs'),
(52, 13, 4, 'pictures/Eaglebluffs_3.jpg', 'Eagle Bluffs'),
(53, 13, 6, 'pictures/Eaglebluffs_4.jpg', 'Eagle Bluffs'),
(54, 3, 8, 'pictures/Elkmountain_1.jpg', 'Elk Mountain '),
(55, 3, 10, 'pictures/Elkmountain_2.jpg', 'Elk Mountain '),
(56, 3, 8, 'pictures/Elkmountain_3.jpg', 'Elk Mountain '),
(57, 3, 10, 'pictures/Elkmountain_4.jpg', 'Elk Mountain '),
(58, 17, 10, 'pictures/Garibaldi_1.jpg', 'Garibaldi Lake'),
(59, 17, 4, 'pictures/Garibaldi_2.jpg', 'Garibaldi Lake'),
(60, 17, 10, 'pictures/Garibaldi_3.jpg', 'Garibaldi Lake'),
(61, 17, 4, 'pictures/Garibaldi_4.jpg', 'Garibaldi Lake'),
(62, 9, 8, 'pictures/Goldenears_1.jpg', 'Golden Ears'),
(63, 9, 4, 'pictures/Goldenears_2.jpg', 'Golden Ears'),
(64, 9, 8, 'pictures/Goldenears_3.jpg', 'Golden Ears'),
(65, 9, 4, 'pictures/Goldenears_4.jpg', 'Golden Ears'),
(66, 12, 10, 'pictures/Grousegrind_1.jpg', 'Grouse Grind'),
(67, 12, 8, 'pictures/Grousegrind_2.jpg', 'Grouse Grind'),
(68, 12, 10, 'pictures/Grousegrind_3.jpg', 'Grouse Grind'),
(69, 12, 8, 'pictures/Grousegrind_4.jpg', 'Grouse Grind'),
(70, 4, 8, 'pictures/Harrisongrind_1.jpg', 'Harrison Grind'),
(71, 4, 10, 'pictures/Harrisongrind_2.jpg', 'Harrison Grind'),
(72, 4, 8, 'pictures/Harrisongrind_3.jpg', 'Harrison Grind'),
(73, 4, 10, 'pictures/Harrisongrind_4.jpg', 'Harrison Grind'),
(74, 14, 10, 'pictures/Jugisland_1.jpg', 'Jug Island'),
(75, 14, 4, 'pictures/Jugisland_2.jpg', 'Jug Island'),
(76, 14, 10, 'pictures/Jugisland_3.jpg', 'Jug Island'),
(77, 14, 4, 'pictures/Jugisland_4.jpg', 'Jug Island'),
(78, 5, 10, 'pictures/Mountgardner_1.jpg', 'Mount Gardner'),
(79, 5, 6, 'pictures/Mountgardner_2.jpg', 'Mount Gardner'),
(80, 5, 10, 'pictures/Mountgardner_3.jpg', 'Mount Gardner'),
(81, 5, 6, 'pictures/Mountgardner_4.jpg', 'Mount Gardner'),
(82, 7, 8, 'pictures/Nairnfalls_1.jpg', 'Nairn Falls'),
(83, 7, 6, 'pictures/Nairnfalls_2.jpg', 'Nairn Falls'),
(84, 7, 8, 'pictures/Nairnfalls_3.jpg', 'Nairn Falls'),
(85, 7, 6, 'pictures/Nairnfalls_4.jpg', 'Nairn Falls'),
(86, 8, 8, 'pictures/Shadowlake_1.jpg', 'Shadow Lake'),
(87, 8, 10, 'pictures/Shadowlake_1.jpg', 'Shadow Lake'),
(88, 8, 8, 'pictures/Shadowlake_3.jpg', 'Shadow Lake'),
(89, 8, 10, 'pictures/Shadowlake_4.jpg', 'Shadow Lake');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(40) NOT NULL,
  `trailID` int(40) NOT NULL,
  `userID` int(40) NOT NULL,
  `reviewText` mediumtext NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `trailID`, `userID`, `reviewText`, `rating`) VALUES
(1, 1, 6, 'This trail is easy and just perfect for a relaxing walk around the beautiful lakes and woods. It was peaceful and the scenery was gorgeous. I could have stayed there the whole day to soak up the sun. \r\n\r\nWe took our time and finished the trail in just under 3 hours. But really why would you want to rush through it?', 3),
(3, 1, 4, 'This was my idea of a perfect weekend hike - A nice, easy stroll through the woods on a well-marked trail, with nice spots to chill or go for a swim. \r\n\r\nWe really took our time, and so it took us a little less than four hours to get around. It was a hot, sunny weekend so Alice Lake was packed, but the trail was not that busy. \r\n\r\nIf you''re looking for a nice relaxing hike to get out in nature, I highly recommend this one.', 4),
(4, 1, 8, 'I''ve done this hike a number of times and it''s beautiful all the way around. There are a couple of challenging (uphill) sections on the west side of the lake but the east is super easy. On a warm day it''s really nice to be able to jump into the lake to cool off. Dogs are very welcome. Do arrive early because the parking lot fills up FAST.', 5),
(5, 2, 4, 'I''ve hiked this trail a good 50 times in the last few years; the lake is gorgeous and there are so many scenic spots along the trail. Up until a few weeks ago I would''ve given a 5 star rating and raved about everything. I love hiking with my small well behaved dog. ', 4),
(6, 2, 6, 'Was expecting a nice stroll around the lake, but it impressed me with a amazing "hiking" trail. ', 3),
(7, 2, 8, 'My friend and I hiked this trail on March 23, as our first hike of the year. We were hoping for a gentle reintroduction to hiking season but this was a bit more of a challenge! ', 3),
(8, 2, 10, 'This entire hike was not very scenic but still very enjoyable. ', 2),
(9, 3, 4, 'I did this trail with a group of 4 last weekend and it was very enjoyable.', 3),
(10, 3, 6, 'I''m heading to Alice Lake today an will be checking out the Four Lakes Trail. Thanks for the great info! ', 4),
(11, 3, 8, ' We woke up in the morning and went to hike around the Alice lake loop trail. We parked and followed the signs so it took us the furthest way around all the 4 lakes. We stopped at the river and shortly after this we saw a BLACK BEAR! He stopped looked at us and then carried on towards the river. ', 3),
(12, 3, 10, 'We went to Alice lake today, a sunny day in April and we did the 4lake hike. It was a nice and refreshing stroll through the woods. ', 4),
(13, 4, 4, 'Easy trail. Once saw someone take a stroller up it, which is just ridiculous. However it''s a refreshing quick hike on the way to Pemberton.', 2),
(14, 4, 6, 'Earlier this month, brought my family to the campsite there. It was actually our backup choice, as our first choice was full. It turned out to be a lucky thing, because I later found out that it rained all night at the other place.', 3),
(15, 4, 8, 'This trail is one of my favorites, you have alot of different types of terrain in a short distance.', 3),
(16, 4, 10, 'This hike was really nice. It wasn''t as difficult as it says. The trail was versatile and fun. Since we went on a weekday no one else was there so you really feel secluded at the lake. :)', 4),
(17, 5, 4, 'The trail is, for most part, VERY well marked if you have an idea of what you''re looking for/which route you''re going to take. ', 2),
(18, 5, 6, 'Fantastic hike and glad I completed this before moving from Vancouver. \r\n\r\nThe views from Mt. Gardner, especially east are spectacular. Well worth the day trip.', 3),
(19, 5, 8, 'The trail was very well marked and we followed a trail winding up the hill, which was very steep in some parts', 3),
(20, 5, 10, 'There were quite a lot of fallen trees along the trail making it rather difficult to navigate and locate the markers on the trail.', 1),
(21, 6, 4, 'This trail is no longer open to dogs which i find very disappointing.', 1),
(22, 6, 6, 'If you''re looking for a relaxing trail, this is a perfect way to spend the day. ', 3),
(23, 6, 8, 'There are a ton of mosquitos, so make sure you do not attempt this with short sleeves and sans bug spray!', 2),
(24, 6, 10, 'A great, fun, and easy hike perfect for taking your dogs out for some fresh air', 3),
(25, 7, 4, 'Perfect little hike for geocaching, but the view at the top is a little disappointing. ', 2),
(26, 7, 6, 'We were hoping for more of a view, but the hike took a reasonable amount of time to complete (1h/25min return)', 3),
(27, 7, 8, 'Wondering if strollers can make it up the trail?', 2),
(28, 7, 10, 'It was a nice hike, and great workout too!', 3),
(29, 8, 4, 'We were very excited for this hike - but we were absolutely swarmed by mosquitos and bug 10 minutes into the hike. We''re very eager to take another attempt at it, but we''ll definitely bring more bug spray next time', 2),
(30, 8, 6, 'Nice and easy hike with good views.', 4),
(31, 8, 8, 'Good views. ', 2),
(32, 8, 10, 'Absolutely terrible, 10/10 WOULDN''T recommend. ', 1),
(33, 9, 4, 'The view is amazing - you can see all the way to the island and Mt Baker, and a ton of lakes in every direction', 3),
(34, 9, 6, 'I was impressed by how well the trail was marked! Makes for an easy climb to the summit', 4),
(35, 9, 8, 'Tough climb to the summit, but it''s definitely worth it. ', 3),
(36, 9, 10, 'A lot of different wildlife on the trail. Huge deer and lots of birds, but watch out for the black bears.', 3),
(39, 10, 4, 'Beautiful walking trails ', 4),
(40, 10, 4, 'Not only are there hiking trails, there are horseback riding trails as well', 3),
(41, 11, 6, 'Great place, lots of room for off leash dogs and camping along the river', 3),
(42, 11, 8, 'As much as I love dogs, there are way too many off leash dogs on this trail!!', 2),
(43, 12, 4, 'If you really want a good workout, do the grind. ', 5),
(44, 12, 10, 'The grind is my favourite thing about living in Vancouver, it''s more of an addition for myself and my family. ', 3),
(45, 13, 4, 'The switchback was steep and a knee killer if you come back the same way. ', 3),
(46, 13, 6, 'This trail is easily doable in trail running shoes. There''s no snow on the trails, although there was snow on the ski slopes.', 3),
(47, 14, 10, 'This hike was very easy, just enough to work up a little sweat. ', 2),
(48, 14, 8, 'A few ups and a few down sections, but you''ll get to the beach in no time. ', 4),
(49, 15, 4, 'This is the perfect trail if you''re looking to go some fresh air for a couple hours. Dog friendly, and a beach located halfway around the trail, it makes for a great day outing. ', 5),
(50, 15, 8, 'Great spring/summer hiking trail, but be careful when going there in the fall as the bridge located on the north side of the trail may be flooded. ', 3),
(51, 16, 4, 'This is a nice little urban trail, and well worth visiting at least once. ', 3),
(52, 16, 10, 'A great place to walk around, run, or explore and enjoy nature. ', 4),
(53, 17, 6, 'If there''s any sort of breeze or it''s colder at night, make sure you bring a warm change of clothes so your sweaty clothes from the day don''t turn against you. ', 4),
(54, 17, 8, 'I did this hike last week and we camped for 2 nights. You definitely need to make sure you have the right gear otherwise this could be a very miserable trail to hike. ', 3),
(55, 18, 6, 'People say bugs are the issue on the trail, but that would be the least of your problems. I ran into 3 bears along Black Tusk today, so make sure you''re prepared to see some larger-than-insects wildlife. ', 3),
(56, 18, 4, 'I was up here yesterday - no snow. Hoping to go back up to Black Tusk in the next few weeks. ', 2),
(78, 1, 251, 'This was a super fun trail!', 4),
(79, 4, 251, 'This was too difficult.', 1),
(80, 11, 251, 'I would totally recommend this trail!', 5),
(81, 2, 251, 'This trail was a lot of fun!', 4);

-- --------------------------------------------------------

--
-- Table structure for table `trails`
--

CREATE TABLE `trails` (
  `id` int(40) NOT NULL,
  `name` varchar(40) NOT NULL,
  `locationID` int(40) NOT NULL,
  `difficulty` varchar(40) NOT NULL,
  `distance` int(10) NOT NULL,
  `time` int(10) DEFAULT NULL,
  `season` varchar(20) NOT NULL,
  `dogFriendly` tinyint(1) NOT NULL,
  `bears` tinyint(1) NOT NULL,
  `bgImage` varchar(500) DEFAULT NULL,
  `latitude` varchar(10) NOT NULL,
  `longitude` varchar(10) NOT NULL,
  `desc` varchar(500) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `trails`
--

INSERT INTO `trails` (`id`, `name`, `locationID`, `difficulty`, `distance`, `time`, `season`, `dogFriendly`, `bears`, `bgImage`, `latitude`, `longitude`, `desc`) VALUES
(1, 'Burnaby Lake', 1, 'Easy', 10, 2, 'all year', 0, 0, 'trailPhotos/1.jpg', '49.242', '-122.944', 'Burnaby Lake is the largest lake in the lower mainland. With its rich ecology, it is home to many species making it a very enjoyable trail.'),
(2, 'Deer Lake Park', 1, 'Easy', 5, 1, 'all year', 1, 0, 'trailPhotos/2.jpg', '49.236', '-122.971', 'Located in Burnaby just east of Vancouver, Deer Lake Park offers a nice, flat, and easy walk that circles around the lake and passes by a beach area.'),
(3, 'Elk Mountain', 2, 'Intermediate', 7, 4, 'June - October', 1, 1, 'trailPhotos/3.jpg', '49.113', '-121.803', 'The top of Elk mountain offers an amazing view of the city of Chilliwack, and the surrounding Fraser Valley area. Relax on Elk Mountain before making the trek downhill and enjoy the view.'),
(4, 'Harrison Grind', 2, 'Difficult', 7, 6, 'October - November', 1, 1, 'trailPhotos/4.jpg', '49.300', '-121.785', 'Similar to the Grouse Grind, climb your way to the top through the rugged route that includes climbing across creeks and a very steep incline. Eventually you''ll get the top and see why Vancouverites love this trail.'),
(5, 'Mount Gardner', 3, 'Intermediate', 17, 7, 'all year', 1, 1, 'trailPhotos/5.jpg', '49.400', '-123.379', 'Visit the lovely community of Bowen Island and see it all by climbing the steep and rocky trail. Use the ropes along the trail to pull yourself up towards the peak. '),
(6, 'Alice Lake', 3, 'Easy', 6, 2, 'April - November', 1, 1, 'trailPhotos/6.jpg', '49.784', '-123.116', 'A popular camping spot in the summer, Alice Lake contains a network of hiking trails perfect for those looking to get outdoors for a nice walk. This trail offers a scenic easy hike that loops around the park and passes lakes and groves of gorgeous trees. '),
(7, 'Nairn Falls', 4, 'Easy', 3, 2, 'all year', 1, 1, 'trailPhotos/7.jpg', '50.293', '-122.825', 'Located along the Sea to Sky Highway, Nairn Falls is a nice, short hike to a beautiful waterfall. The trail has minimal elevation change as you follow is along the river. '),
(8, 'Shadow Lake', 4, 'Easy', 5, 2, 'June - October', 1, 1, 'trailPhotos/8.jpg', '49.981', '-123.151', 'Seeing the marshy shores of Shadow Lake surrounded by mountainous views is the real reward of this area. Make your way down the trail where you will see Shadow lake beyond the marshes off to your right.'),
(9, 'Golden Ears', 5, 'Difficult', 24, 12, 'all year', 1, 1, 'trailPhotos/9.jpg', '49.248', '-122.548', 'The Golden Ears trail is a popular hike in Golden Ears Provincial Park and offers some spectacular views for those who accomplish this challenging trail. It can be completed in a day by many people also camping overnight.'),
(10, 'Campbell Valley Regional Park', 6, 'Easy', 4, 2, 'all year', 1, 0, 'trailPhotos/10.jpg', '49.030', '-122.669', 'Campbell Valley Regional Park is a large park located amongst farm land and with a sprawling network of trails for walking, horseback riding, and exploring. Fun for the whole family, this park is also home to the historic Langley Speedway. '),
(11, 'Derby Reach Regional Park', 7, 'Easy', 8, 3, 'all year', 1, 0, 'trailPhotos/11.jpg', '49.171', '-122.577', 'Located in Langley, this park includes a scenic trail along the Edgewater Bar section and a forest loop along the Houston trail in the historic area. The park has camping, an off-leash dog park, and walking trails that are popular year-round.'),
(12, 'Grouse Grind', 8, 'Difficult', 3, 2, 'June - September', 1, 1, 'trailPhotos/12.jpg', '49.374', '-123.090', 'The Grouse grind is Vancouver''s most used trail and is known for its challenge in requiring physical strength and endurance in order to make it to the top. Even though it is less than 3km the trail has an elevation of 850m.'),
(13, 'Eagle Bluffs', 8, 'Intermediate', 8, 4, 'July - October', 1, 1, 'trailPhotos/13.jpg', '49.323', '-122.849', 'Located in West Vancouver, Eagle Bluffs has a spectacular view and is accessible from the downhill ski area of Cypress Mountain. '),
(14, 'Jug Island Beach', 9, 'Intermediate', 6, 3, 'all year', 1, 0, 'trailPhotos/14.jpg', '49.321', '-122.919', 'Jug Island is a tiny island located just off the tip of Belcarra. Offering great views of Indian Arm, this trail begins to climb quite quickly as you work your way up the gravel path. '),
(15, 'Buntzen Lake', 9, 'Easy', 8, 3, 'all year', 1, 0, 'trailPhotos/15.jpg', '49.350', '-122.859', 'Located in the beautiful area of Port Moody, this man-made lake is surrounded by forests and lush trees. There are many trails that loop around the lake or climb the mountains in the surrounding area.'),
(16, 'Burns Bog Delta Nature Reserve', 10, 'Easy', 3, 2, 'all year', 1, 0, 'trailPhotos/16.jpg', '49.147', '-122.890', 'One of the largest domed peat bogs in the world, this sensitive eco-system is accessible to the public in an area on the eastern side. Hikers can walk through the forested areas, passing over unique plant life created by the bog.'),
(17, 'Garibaldi Lake', 11, 'Intermediate', 18, 5, 'July - October', 1, 1, 'trailPhotos/17.jpg', '49.936', '-123.027', 'With turquoise-coloured water nestled between alpine mountains and a spectacular glacier as the backdrop, Garibaldi Lake is one of the most scenic destinations in BC'),
(18, 'Black Tusk', 11, 'Difficult', 29, 11, 'July - October', 1, 1, 'trailPhotos/18.jpg', '49.326', '-123.137', 'The dark, jagged edges of Black Tusk make it one of the most scenic and unique hikes in southwestern BC. Location in Garibaldi Provincial Park, it''s the most spectacular mountain in the area. ');

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
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pictures`
--
ALTER TABLE `pictures`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trailID` (`trailID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trailID` (`trailID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `trails`
--
ALTER TABLE `trails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `locationID` (`locationID`);

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
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `pictures`
--
ALTER TABLE `pictures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=90;
--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=82;
--
-- AUTO_INCREMENT for table `trails`
--
ALTER TABLE `trails`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT COMMENT 'Auto Increment',AUTO_INCREMENT=278;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `pictures`
--
ALTER TABLE `pictures`
  ADD CONSTRAINT `pictures_ibfk_1` FOREIGN KEY (`trailID`) REFERENCES `trails` (`id`),
  ADD CONSTRAINT `pictures_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`trailID`) REFERENCES `trails` (`id`),
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `users` (`id`);

--
-- Constraints for table `trails`
--
ALTER TABLE `trails`
  ADD CONSTRAINT `trails_ibfk_1` FOREIGN KEY (`locationID`) REFERENCES `location` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`locationID`) REFERENCES `location` (`id`);
