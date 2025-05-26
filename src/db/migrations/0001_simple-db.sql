CREATE TABLE `accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	`name` text NOT NULL,
	`balance` real NOT NULL,
	`color` text NOT NULL,
	`icon` text NOT NULL,
	`currencyId` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `budgets` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	`title` text NOT NULL,
	`amount` real NOT NULL,
	`start` integer NOT NULL,
	`end` integer,
	`period` text NOT NULL,
	`color` text,
	`icon` text
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
CREATE TABLE `categories` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	`title` text NOT NULL,
	`supercategoryId` text,
	`color` text,
	`icon` text
);
--> statement-breakpoint
CREATE TABLE `currencies` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`symbol` text NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_transactions` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	`amount` real NOT NULL,
	`date` integer NOT NULL,
	`description` text NOT NULL,
	`categoryId` text NOT NULL,
	`accountId` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_transactions`("id", "createdAt", "updatedAt", "amount", "date", "description", "categoryId", "accountId") SELECT "id", "createdAt", "updatedAt", "amount", "date", "description", "categoryId", "accountId" FROM `transactions`;--> statement-breakpoint
DROP TABLE `transactions`;--> statement-breakpoint
ALTER TABLE `__new_transactions` RENAME TO `transactions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE INDEX `date_index` ON `transactions` (`date`);--> statement-breakpoint
CREATE INDEX `category_index` ON `transactions` (`categoryId`);--> statement-breakpoint
CREATE INDEX `account_index` ON `transactions` (`accountId`);