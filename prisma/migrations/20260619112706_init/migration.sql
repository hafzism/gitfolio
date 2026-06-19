-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "githubUsername" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "headline" TEXT,
    "bio" TEXT,
    "location" TEXT,
    "email" TEXT,
    "website" TEXT,
    "twitter" TEXT,
    "linkedin" TEXT,
    "githubUrl" TEXT,
    "skills" TEXT,
    "projects" TEXT,
    "stats" TEXT,
    "experience" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_slug_key" ON "Portfolio"("slug");
