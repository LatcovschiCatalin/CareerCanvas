-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: jobrapid
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `job_id` int NOT NULL AUTO_INCREMENT,
  `job_title` varchar(50) DEFAULT NULL,
  `job_description` varchar(255) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  `salary` varchar(30) DEFAULT NULL,
  `application_deadline` datetime DEFAULT NULL,
  `job_email` varchar(50) DEFAULT NULL,
  `job_phone` varchar(30) DEFAULT NULL,
  `user_id` int NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`job_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (95,'Data Analyst','I need someone to clean my yard','Chisinau','500','2023-10-14 00:00:00','grisha.moraru@yahoo.com','060945731',80,'2023-12-12 00:00:00'),(96,'Clean the yard','I need a smart young man who can install windows at my computer.','Los Angeles','250','2023-11-15 00:00:00','ion.baton@gmail.com','555-555-5555',88,'2023-10-11 00:00:00'),(97,'Accountant','Analyze data and generate reports','Straseni','500','2023-10-14 00:00:00','job1@example.com','888-888-8888',81,'2023-11-30 00:00:00'),(98,'Software Engineer','Handle financial transactions','New York','70000','2023-12-20 00:00:00','job1@example.com','023792036',76,'2023-12-12 00:00:00'),(99,'Walk my dog','My kid doesn\'t understand multiplication and needs someone\'s help.','Los Angeles','90000','2023-10-14 00:00:00','cristigrecu1@gmail.com','555-555-5555',78,'2023-10-12 00:00:00'),(100,'Install Windows','I need a smart young man who can install windows at my computer.','San Francisco','1000','2023-10-12 00:00:00','job3@example.com','555-555-5555',94,'2024-01-05 00:00:00'),(101,'Software Engineer','I need someone to clean my yard','Ohio','70000','2023-10-12 00:00:00','cristigrecu1@gmail.com','060542669',89,'2023-12-17 00:00:00'),(102,'Babysitter','I need a smart young man who can install windows at my computer.','Straseni','60000','2023-11-30 00:00:00','grigoras.dumitru@gmail.com','022785652',99,'2023-10-14 00:00:00'),(103,'Help my kid with homework','Need someone to sit with my baby','Truseni','60000','2023-11-30 00:00:00','job4@example.com','777-777-7777',89,'2023-10-12 00:00:00'),(104,'Software Engineer','I need someone to walk my dog i won\'t be able to do it today','San Francisco','200','2023-12-17 00:00:00','job5@example.com','022785652',84,'2023-12-12 00:00:00'),(105,'Stroika','Develop software applications','Los Angeles','1000','2023-12-17 00:00:00','job1@example.com','888-888-8888',96,'2023-12-20 00:00:00'),(106,'Data Analyst','I need a smart young man who can install windows at my computer.','New York','250','2023-11-15 00:00:00','job3@example.com','777-777-7777',92,'2023-11-30 00:00:00'),(107,'Data Analyst','Analyze data and generate reports','Chisinau','450','2024-01-05 00:00:00','grisha.moraru@yahoo.com','023792036',87,'2023-12-17 00:00:00'),(108,'Accountant','My kid doesn\'t understand multiplication and needs someone\'s help.','Chisinau','100000','2023-11-15 00:00:00','marius.cimpoi@gmail.com','666-666-6666',83,'2024-01-05 00:00:00'),(109,'Clean the yard','I need a smart young man who can install windows at my computer.','Chisinau','450','2023-12-10 00:00:00','job4@example.com','555-555-5555',83,'2023-11-15 00:00:00'),(110,'Stroika','I need a strong guy to help me with moving cinder blocks','Los Angeles','80000','2024-01-05 00:00:00','babushka.vera@yahoo.com','022785652',89,'2024-02-10 00:00:00'),(111,'Walk my dog','Analyze data and generate reports','Los Angeles','90000','2023-12-20 00:00:00','marius.cimpoi@gmail.com','078550332',86,'2024-01-05 00:00:00'),(112,'Marketing Manager','My kid doesn\'t understand multiplication and needs someone\'s help.','Chicago','80000','2023-10-12 00:00:00','babushka.vera@yahoo.com','060542669',93,'2024-01-05 00:00:00'),(113,'Data Analyst','Manage marketing campaigns','Truseni','200','2023-10-14 00:00:00','babushka.vera@yahoo.com','888-888-8888',83,'2023-12-17 00:00:00'),(114,'Marketing Manager','Create visual designs','Truseni','200','2023-12-10 00:00:00','grisha.moraru@yahoo.com','888-888-8888',91,'2023-10-12 00:00:00'),(115,'Walk my dog','Need someone to sit with my baby','Chisinau','250','2023-12-20 00:00:00','job3@example.com','060542669',86,'2023-11-15 00:00:00'),(116,'Walk my dog','I need a smart young man who can install windows at my computer.','Truseni','500','2023-12-10 00:00:00','job5@example.com','060945731',78,'2023-12-10 00:00:00'),(117,'Install Windows','Handle financial transactions','Balti','60000','2023-12-20 00:00:00','job4@example.com','0602335472',79,'2023-11-30 00:00:00'),(118,'Help my kid with homework','I need someone to walk my dog i won\'t be able to do it today','Boston','250','2023-12-12 00:00:00','babushka.vera@yahoo.com','060945731',90,'2023-12-20 00:00:00'),(119,'Stroika','Handle financial transactions','Boston','60000','2024-01-05 00:00:00','marius.cimpoi@gmail.com','666-666-6666',84,'2023-10-12 00:00:00'),(120,'Graphic Designer','Design a menu in restaurant','Chicago','600','2023-11-10 00:00:00','ion.baton@gmail.com','0684939',72,'2023-10-11 00:00:00'),(121,'Help my kid with homework','Create visual designs','New York','70000','2023-11-30 00:00:00','marius.cimpoi@gmail.com','078550332',96,'2023-12-10 00:00:00'),(122,'Install Windows','I need someone to walk my dog i won\'t be able to do it today','Cioresti','90000','2023-10-12 00:00:00','job4@example.com','777-777-7777',76,'2023-11-15 00:00:00'),(123,'Clean the yard','Analyze data and generate reports','Cioresti','100000','2023-12-10 00:00:00','job4@example.com','555-555-5555',83,'2023-10-12 00:00:00'),(124,'Graphic Designer','Develop software applications','Chicago','100000','2023-10-11 00:00:00','job4@example.com','666-666-6666',84,'2023-11-30 00:00:00'),(126,'Python scraping','Need a student who scrapy, on 1 day','Chisinau, Moldova','Negotiable','2023-12-12 00:00:00','bigboss@gmail.com','3523252',7,'2023-10-12 12:14:11'),(127,'Python scraping','Need a student who scrapy, on 1 day','Chisinau, Moldova','Negotiable','2023-12-12 00:00:00','bigboss@gmail.com','3523252',102,'2023-10-23 16:44:10'),(128,'hh','hrg','hgjre','ghreh','2023-10-24 17:01:34','hrheg',NULL,102,'2023-10-24 17:01:30');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs_tags`
--

DROP TABLE IF EXISTS `jobs_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs_tags` (
  `job_tags_id` int NOT NULL AUTO_INCREMENT,
  `job_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`job_tags_id`),
  KEY `job_id` (`job_id`),
  KEY `tag_id` (`tag_id`),
  CONSTRAINT `jobs_tags_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`),
  CONSTRAINT `jobs_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs_tags`
--

LOCK TABLES `jobs_tags` WRITE;
/*!40000 ALTER TABLE `jobs_tags` DISABLE KEYS */;
INSERT INTO `jobs_tags` VALUES (1,1,1),(2,1,3),(3,2,4),(4,2,5),(5,3,7),(6,3,6),(25,101,6),(26,101,4),(27,101,5),(31,95,2),(32,95,3),(33,95,5);
/*!40000 ALTER TABLE `jobs_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `rating` int DEFAULT NULL,
  `review_message` varchar(500) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `user_id_referenced` int DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `user_id` (`user_id`),
  KEY `FK_Review_User_Referenced` (`user_id_referenced`),
  CONSTRAINT `FK_Review_User_Referenced` FOREIGN KEY (`user_id_referenced`) REFERENCES `user` (`user_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,7,4,'test','2023-10-06 13:26:13',101),(2,68,3,'very average','2023-07-06 13:27:48',101),(3,7,5,'amazing!!!','2023-10-06 09:28:31',NULL),(4,102,4,'Coool!!','2023-11-14 08:53:30',NULL),(5,102,4,'Coool!!','2023-11-14 08:54:30',NULL),(6,102,4,'Coool!!','2023-11-14 08:59:20',NULL),(7,102,4,'Coool!!','2023-11-14 09:00:27',100),(8,102,4,'Coool!!','2023-11-14 09:13:21',99),(9,102,4,'Coool!!','2023-11-14 09:13:40',100),(10,102,4,'Coool!!','2023-11-14 09:15:40',100),(11,102,5,'testingtesting','2023-11-14 09:16:11',102),(12,102,4,'Coool!!','2023-11-14 09:16:34',102),(13,102,4,'Coool!!','2023-11-14 09:17:25',102),(14,102,4,'Coool!!','2023-11-14 09:17:56',102),(15,102,1,'Coool!!','2023-11-14 09:19:13',101),(16,102,5,'Coool!!','2023-11-14 09:19:18',101),(18,102,5,'Coool!!','2023-11-14 09:41:59',99),(19,102,5,'Coool!!','2023-11-14 09:42:01',99),(20,102,5,'Coool!!','2023-11-14 09:42:35',99),(21,102,5,'Coool!!','2023-11-14 09:43:38',99),(22,102,5,'Coool!!','2023-11-14 10:36:58',89),(23,102,5,'Coool!!','2023-11-14 20:40:18',95),(24,102,5,'Coool!!','2023-11-15 15:47:36',85),(25,102,5,'Coool!!','2023-11-15 15:49:31',86);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_job`
--

DROP TABLE IF EXISTS `student_job`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_job` (
  `id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NOT NULL,
  `job_id` int NOT NULL,
  `created_date` datetime NOT NULL,
  `status` enum('Accepted','Rejected','Waiting') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `student_id` (`student_id`),
  KEY `job_id` (`job_id`),
  CONSTRAINT `student_job_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `student_job_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_job`
--

LOCK TABLES `student_job` WRITE;
/*!40000 ALTER TABLE `student_job` DISABLE KEYS */;
INSERT INTO `student_job` VALUES (2,100,127,'2023-10-24 10:54:23','Accepted'),(3,7,127,'2023-10-24 10:55:51','Waiting');
/*!40000 ALTER TABLE `student_job` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `tag_name` varchar(30) DEFAULT NULL,
  `color` varchar(7) DEFAULT NULL,
  `current_count` int DEFAULT NULL,
  `all_time_count` int DEFAULT NULL,
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'babysitting','#FCFCFC',0,0),(2,'cleaning','#2509E5',0,0),(3,'building','#5D3807',0,0),(4,'Petsitting','#E01496',0,0),(5,'IT','#8B7E7E',0,0),(6,'Moving','#E0680B',0,0),(7,'Tutoring','#074303',0,0),(8,'Cooking','#E2E315',0,0),(9,'Photo-session','#8215E3',0,0);
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(30) NOT NULL,
  `phone` varchar(30) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `address` varchar(30) DEFAULT NULL,
  `gender` enum('M','F','O') NOT NULL,
  `skills` varchar(50) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `created` datetime DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role` enum('Student','Recruiter') DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (7,'Johnny','Depp','depp@gmail.com','445135','1990-11-29','Soiuz','M','Corsar','$2b$12$m.RW07FLVUvEKY4uWbA6XOvGuSdZpt6dM3ncT7FDcGekHrxiGcXYm','2023-09-14 15:57:47','16a7983d-ca96-4fe5-b5d5-d34896e6eb83.png','Student'),(68,'John','Doe','john.doe@example.com','555-555-5555','1990-01-01','123 Main St','M','Programming','$2b$12$vBJQWAtoUmpvAODFewZZcO.XvbcR.MpF9iyErY7fyGutyyW8JJMdi','2023-09-14 15:57:47',NULL,'Recruiter'),(69,'Alice','Smith','alice.smith@example.com','555-555-5556','1992-03-15','456 Elm St','F','Data Analysis','$2b$12$DaePj0.9QPzCXmiHqWooSu3zlChh2Q1kkJkLK53IVPKf.T8.O.Juu','2023-09-14 16:05:32',NULL,'Recruiter'),(70,'Michael','Johnson','michael.johnson@example.com','555-555-5557','1985-07-20','789 Oak St','M','Graphic Design','$2b$12$nZs9slx.NqZY4HD4WXeY.OtBZonFHFXiojk8aKC8Je1/HJu2Jhw/i','2023-09-14 16:12:18',NULL,'Recruiter'),(71,'Emily','Williams','emily.williams@example.com','555-555-5558','1988-12-10','101 Pine St','F','Marketing','$2b$12$qVMLEJzQjG/0Lt2fhPZHC.nWLxTY8SKh/hk9pYyMaADGgDF7fL1e6','2023-09-14 16:19:04',NULL,'Recruiter'),(72,'Daniel','Brown','daniel.brown@example.com','555-555-5559','1993-04-25','555 Cedar St','M','Sales','$2b$12$w7lkODOatJ5BnuAJg3Exv.HIADJkQF2K61CJ.l45.RfX5Lb2G4PYy','2023-09-14 16:26:51',NULL,'Recruiter'),(73,'Sophia','Lee','sophia.lee@example.com','555-555-5560','1995-08-05','777 Birch St','F','Writing','$2b$12$TMuwQb05.vjNKi6lmXh4uO.w0BhWtwRK3E.8imCrAbHjzUbfcLYte','2023-09-14 16:33:37',NULL,'Recruiter'),(74,'William','Garcia','william.garcia@example.com','555-555-5561','1987-02-14','999 Maple St','M','Engineering','$2b$12$oRIxuRkay4F.NICjJMqCIeDSXyTUyTUoMLOGI8rrJExuFU2ITAuu2','2023-09-14 16:40:23',NULL,'Recruiter'),(75,'Olivia','Martinez','olivia.martinez@example.com','555-555-5562','1991-06-30','333 Pine St','F','Finance','$2b$12$0LYAToSR/91Z2yPyblV.zuyB5cJOy7MHq3pAMreAtxdDrOK6YEAoG','2023-09-14 16:47:09',NULL,'Recruiter'),(76,'David','Anderson','david.anderson@example.com','555-555-5563','1986-10-12','222 Oak St','M','Art','$2b$12$5HNEXF4oGWU/RaUo45nlsOdcXuK5NB9G3n2QariO9SqhNNGBGDT3W','2023-09-14 16:53:56',NULL,'Recruiter'),(77,'Ava','Lopez','ava.lopez@example.com','555-555-5564','1994-09-02','444 Elm St','F','Customer Support','$2b$12$lP78Vjn/k.XpqZ/jJC/fU.IUKMl1c7bHHQN4vGgvMp6Pb2IzY.EnK','2023-09-14 17:00:42',NULL,'Recruiter'),(78,'James','Gonzalez','james.gonzalez@example.com','555-555-5565','1984-03-25','555 Birch St','M','Teaching','$2b$12$wyLmElcy/CoqtBybhzSdueuTLzn5sp386c0jv.6oapynQK52Eln8K','2023-09-14 17:07:28',NULL,'Recruiter'),(79,'Mia','Harris','mia.harris@example.com','555-555-5566','1989-11-07','666 Cedar St','F','Research','$2b$12$vKY/PjOx42KJSSKq1kX.3eOz2OPv5VWA2Zk0T/lcDsv/pyikJgSwW','2023-09-14 17:14:15',NULL,'Recruiter'),(80,'Benjamin','Rodriguez','benjamin.rodriguez@example.com','555-555-5567','1996-05-18','777 Maple St','M','Management','$2b$12$75cAEh1p6weF8GEYJYjk7.fbYPIr0i4jenab6G7ZpPigngeomUBVC','2023-09-14 17:21:01',NULL,'Recruiter'),(81,'Ella','Wilson','ella.wilson@example.com','555-555-5568','1983-12-01','888 Oak St','F','Design','$2b$12$40Y.3dMQxW/5xSnI/GN0YOrAC.H6lvE4HH48AaWT/kcfSNuTD5IDq','2023-09-14 17:27:48',NULL,'Recruiter'),(82,'Alexander','Taylor','alexander.taylor@example.com','555-555-5569','1997-08-15','999 Elm St','M','Consulting','$2b$12$ZkYPYM8VHbyobwLIuLQWEOg2Oe9Beq8kjLW9NPpg540P2g8dY.7ge','2023-09-14 17:34:34',NULL,'Recruiter'),(83,'Liam','Clark','liam.clark@example.com','555-555-5570','1990-04-10','123 Cedar St','M','Writing','$2b$12$x.kUz7Km6gtUmJtmFLjoTui3jPqpXck8Cya/8x49eq6kZwWMIFaRq','2023-09-14 17:41:21',NULL,'Recruiter'),(84,'Grace','Lewis','grace.lewis@example.com','555-555-5571','1986-01-20','456 Pine St','F','Engineering','$2b$12$zk5aByt0nB9rRNMIUVzimOG2JD/ncZYp.fvIBDZeHx/WZTqlzqRH6','2023-09-14 17:48:07',NULL,'Recruiter'),(85,'Lucas','Walker','lucas.walker@example.com','555-555-5572','1993-07-05','789 Oak St','M','Marketing','$2b$12$h41TBn7xfKDmyjfMcv7.pOpUn72IY3g17hQ5nGEIYQTeW.0VJuUy2','2023-09-14 17:54:53',NULL,'Recruiter'),(86,'Chloe','Young','chloe.young@example.com','555-555-5573','1995-02-28','101 Elm St','F','Programming','$2b$12$aUbghDveuNE.chu1E8ouuuHn.RrSBP2gb3v0/HES7HxiXUjr75i9e','2023-09-14 18:01:40',NULL,'Recruiter'),(87,'Henry','Hall','henry.hall@example.com','555-555-5574','1987-09-13','555 Maple St','M','Data Analysis','$2b$12$shiAJivJhwIFqWEBnPXMouoJrYuNSLnZbjrIrL99dvsZZknCb2tmW','2023-09-14 18:08:26',NULL,'Recruiter'),(88,'Lily','Adams','lily.adams@example.com','555-555-5575','1991-11-29','333 Cedar St','F','Finance','$2b$12$1OiJt9ThDmGTmE9LRGzHDuFvkKJcGkD..B6YOUpNj/YjTxelQMWzK','2023-09-14 18:15:13',NULL,'Recruiter'),(89,'Aiden','Hernandez','aiden.hernandez@example.com','555-555-5576','1984-06-22','222 Pine St','M','Art','$2b$12$0xmmf2AkMmnn1SKzR6LmFelChPPcwdDej6TGbHPRU2mSPjkLhJP76','2023-09-14 18:22:00',NULL,'Recruiter'),(90,'Zoe','Morales','zoe.morales@example.com','555-555-5577','1996-03-07','444 Oak St','F','Customer Support','$2b$12$KrxYYDjtOmp8f9EkgsjDguqplZAI1KARHtB/UtTI65sJHaeyNxiHO','2023-09-14 18:28:47',NULL,'Recruiter'),(91,'Jackson','Russell','jackson.russell@example.com','555-555-5578','1988-10-04','666 Maple St','M','Teaching','$2b$12$sO8uBs1PbJgQDjuxtMv9K.HYvVUv5R6tU2/QuPlIjHGu8hZbHsCGK','2023-09-14 18:35:34',NULL,'Recruiter'),(92,'Madison','Stewart','madison.stewart@example.com','555-555-5579','1992-05-09','888 Cedar St','F','Research','$2b$12$BiXAifWssZ06StxoMkteoehKwM63eOq7vtYZxj9xSmdwaAaYwlo1a','2023-09-14 18:42:21',NULL,'Recruiter'),(93,'Sebastian','Perez','sebastian.perez@example.com','555-555-5580','1983-08-18','999 Pine St','M','Management','$2b$12$FhTYiBGaEp2SJoYDfBA98e9m655iS7AlsyW60pj3Njc8y9XOka0NS','2023-09-14 18:49:08',NULL,'Recruiter'),(94,'Avery','Turner','avery.turner@example.com','555-555-5581','1997-01-23','123 Elm St','F','Design','$2b$12$6XSKXv/DNSU2Di1LBhmrO.PLA6ej1LI1dmTucuMcYSFChTLqA4yye','2023-09-14 18:55:55',NULL,'Recruiter'),(95,'Evelyn','Wright','evelyn.wright@example.com','555-555-5582','1990-09-06','456 Oak St','F','Consulting','$2b$12$IcpoCfcNKCrdWQ5Lyu6ar.UTKXK4wgVp6.o9BnQldI63ZFyA3lDCq','2023-09-14 19:02:42',NULL,'Recruiter'),(96,'Mason','Morgan','mason.morgan@example.com','555-555-5583','1985-02-11','789 Cedar St','M','Writing','$2b$12$udGk2DMCeGPkYjRVleCpeeeb.n1A0jwJmPQClFBhgV7qLB1/eSLze','2023-09-14 19:09:29',NULL,'Recruiter'),(97,'Scarlett','Ross','scarlett.ross@example.com','555-555-5584','1993-06-26','101 Maple St','F','Engineering','$2b$12$xoonr2wrd6Semgy4HcR1AOdYIn9J99Z77JwgExbOXuCm.Lrjg6wPG','2023-09-14 19:16:16',NULL,'Recruiter'),(99,'Rodion','Clepa','rodion@gmail.com','4352562','2000-01-01','Grigorii Vieru','M','Frumos, Posibil destept','$2b$12$TQt.R3TL.UEvR7atgXlyJuWvhYqYPy6/Bn2uGe3onlTXe6ooiDLT.','2023-09-29 08:51:53','NULL','Recruiter'),(100,'Rodion','Clepa','rodion1@gmail.com','4352562','2000-01-01','Grigorii Vieru','M','Frumos, Posibil destept','$2b$12$xW2cXSXHeRfUyBxYMMKYKu1gjWn5BD0rT26eZiFfqIAohRseu013q','2023-10-12 12:46:50',NULL,'Student'),(101,'Macreedy','Mark','mark@gmail.com','21421432','2000-01-01','Grigorii Vieru','M','Python, mysql','$2b$12$Uh2KETRhM.WzLkCAk59NzuOz4NC8tBpJx3prsWfmA8ucqzNZfq9l.','2023-10-23 16:33:28',NULL,'Student'),(102,'Recruiter','Rick','recruiter@gmail.com','21421432','2000-01-01','Grigorii Vieru','M','Python, mysql','$2b$12$h.Z11p/SwqvP.jrwbcSrKukW8Q7AW8DXVlBwwlIsist2fBmkG6cJS','2023-10-23 16:43:37',NULL,'Recruiter'),(106,'Tester','Tester2','tester@gmail.com','85743','1997-01-23','home rn','M','surving','$2b$12$SQwgSUvC2wGVmkaSdXrM3O0loCNA51QQGDqkhzUkZUYg1iU/RvwIe','2023-11-15 15:19:13','NULL','Recruiter');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-15 16:02:45
