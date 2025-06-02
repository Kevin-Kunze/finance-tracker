CREATE TABLE `accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	`name` text NOT NULL,
	`balance` real DEFAULT 0 NOT NULL,
	`color` text NOT NULL,
	`icon` text NOT NULL,
	`currencyId` text NOT NULL,
	FOREIGN KEY (`currencyId`) REFERENCES `currencies`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `budgets` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	`name` text NOT NULL,
	`amount` real NOT NULL,
	`start` integer NOT NULL,
	`end` integer,
	`period` text NOT NULL,
	`color` text NOT NULL,
	`icon` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	`name` text NOT NULL,
	`picked` integer DEFAULT 0 NOT NULL,
	`color` text,
	`icon` text,
	`parentCategoryId` text
);
--> statement-breakpoint
CREATE TABLE `categories_to_budgets` (
	`budgetId` text NOT NULL,
	`categoryId` text NOT NULL,
	PRIMARY KEY(`budgetId`, `categoryId`),
	FOREIGN KEY (`budgetId`) REFERENCES `budgets`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `categoryTerms` (
	`id` text PRIMARY KEY NOT NULL,
	`term` text NOT NULL,
	`categoryId` text NOT NULL,
	FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `categoryTerms_term_categoryId_unique` ON `categoryTerms` (`term`,`categoryId`);--> statement-breakpoint
CREATE TABLE `currencies` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`symbol` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `transactionGroups` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	`name` text,
	`note` text,
	`amount` real GENERATED ALWAYS AS ((select sum(amount) from transactions where transactionGroupId = transactionGroups.id)) VIRTUAL NOT NULL,
	`date` integer NOT NULL,
	`imagePath` text
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	`amount` real NOT NULL,
	`date` integer GENERATED ALWAYS AS ((select date from transactionGroups where transactionGroups.id = transactions.transactionGroupId)) VIRTUAL NOT NULL,
	`categoryTermId` text NOT NULL,
	`accountId` text NOT NULL,
	`transactionGroupId` text NOT NULL,
	FOREIGN KEY (`categoryTermId`) REFERENCES `categoryTerms`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`accountId`) REFERENCES `accounts`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`transactionGroupId`) REFERENCES `transactionGroups`(`id`) ON UPDATE no action ON DELETE cascade
);
