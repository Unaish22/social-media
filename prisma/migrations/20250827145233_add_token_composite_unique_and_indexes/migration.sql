/*
  Warnings:

  - A unique constraint covering the columns `[userId,platformId]` on the table `Token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "Token_isActive_idx" ON "Token"("isActive");

-- CreateIndex
CREATE INDEX "Token_expiresAt_idx" ON "Token"("expiresAt");

-- CreateIndex
CREATE INDEX "Token_lastRefreshed_idx" ON "Token"("lastRefreshed");

-- CreateIndex
CREATE UNIQUE INDEX "Token_userId_platformId_key" ON "Token"("userId", "platformId");
