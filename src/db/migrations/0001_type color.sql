PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_accounts` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	`name` text NOT NULL,
	`balance` real DEFAULT 0 NOT NULL,
	`color` text,
	`icon` text NOT NULL,
	`currencyId` text NOT NULL,
	FOREIGN KEY (`currencyId`) REFERENCES `currencies`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_accounts`("id", "createdAt", "updatedAt", "name", "balance", "color", "icon", "currencyId") SELECT "id", "createdAt", "updatedAt", "name", "balance", "color", "icon", "currencyId" FROM `accounts`;--> statement-breakpoint
DROP TABLE `accounts`;--> statement-breakpoint
ALTER TABLE `__new_accounts` RENAME TO `accounts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_budgets` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	`name` text NOT NULL,
	`amount` real NOT NULL,
	`start` integer NOT NULL,
	`end` integer,
	`period` text NOT NULL,
	`color` text,
	`icon` text NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_budgets`("id", "createdAt", "updatedAt", "name", "amount", "start", "end", "period", "color", "icon") SELECT "id", "createdAt", "updatedAt", "name", "amount", "start", "end", "period", "color", "icon" FROM `budgets`;--> statement-breakpoint
DROP TABLE `budgets`;--> statement-breakpoint
ALTER TABLE `__new_budgets` RENAME TO `budgets`;--> statement-breakpoint
CREATE TABLE `__new_categories` (
	`id` text PRIMARY KEY NOT NULL,
	`createdAt` integer DEFAULT (unixepoch()) NOT NULL,
	`updatedAt` integer DEFAULT (unixepoch()) NOT NULL,
	`name` text NOT NULL,
	`color` text,
	`icon` text,
	`parentCategoryId` text,
	FOREIGN KEY (`parentCategoryId`) REFERENCES `categories`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_categories`("id", "createdAt", "updatedAt", "name", "color", "icon", "parentCategoryId") SELECT "id", "createdAt", "updatedAt", "name", "color", "icon", "parentCategoryId" FROM `categories`;--> statement-breakpoint
DROP TABLE `categories`;--> statement-breakpoint
ALTER TABLE `__new_categories` RENAME TO `categories`;