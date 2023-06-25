CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`discordId` varchar(512) NOT NULL,
	`counts` bigint DEFAULT 0,
	`createdAt` date NOT NULL);
