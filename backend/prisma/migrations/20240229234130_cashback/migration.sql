-- CreateTable
CREATE TABLE "cashbacks" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "productData" JSONB,
    "amount" DOUBLE PRECISION NOT NULL,
    "denom" TEXT NOT NULL,
    "metadata" JSONB,
    "status" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cashbacks_pkey" PRIMARY KEY ("id")
);
