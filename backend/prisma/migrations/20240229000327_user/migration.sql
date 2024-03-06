-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('Invited', 'New', 'Active', 'Deactivated', 'Banned');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "loginType" INTEGER NOT NULL DEFAULT 0,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "location" JSONB NOT NULL,
    "social" JSONB NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'New',
    "role" INTEGER NOT NULL DEFAULT 0,
    "images" JSONB NOT NULL,
    "lastLogin" TIMESTAMP(3) NOT NULL,
    "metadata" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_account_key" ON "users"("account");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
