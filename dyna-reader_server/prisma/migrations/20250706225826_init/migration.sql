-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dailyGoal" INTEGER NOT NULL,
    "streak" INTEGER NOT NULL,
    "notificationType" TEXT NOT NULL,
    "readerType" TEXT NOT NULL,
    "averageReading" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "pages" INTEGER NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Progress" (
    "userID" TEXT NOT NULL,
    "bookID" TEXT NOT NULL,
    "pagesRead" INTEGER NOT NULL,
    "timeSpent" INTEGER NOT NULL,
    "percentage" INTEGER NOT NULL,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("userID","bookID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_bookID_fkey" FOREIGN KEY ("bookID") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
