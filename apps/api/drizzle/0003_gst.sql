ALTER TABLE "addresses" ADD COLUMN "company" varchar(200);
--> statement-breakpoint
ALTER TABLE "addresses" ADD COLUMN "gstin" varchar(15);
--> statement-breakpoint
ALTER TABLE "orders" ADD COLUMN "tax_breakdown" jsonb;
