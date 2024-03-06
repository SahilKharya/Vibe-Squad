-- CreateTable
CREATE TABLE "keylinks" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "contract" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "redirect" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "keylinks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "keylinks_key_key" ON "keylinks"("key");
