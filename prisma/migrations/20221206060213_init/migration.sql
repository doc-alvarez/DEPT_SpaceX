-- CreateTable
CREATE TABLE "Launches" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flight_number" INTEGER NOT NULL,
    "mission_patch" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "rocket_name" TEXT NOT NULL,
    "rocket_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "cost_per_launch" INTEGER NOT NULL,
    "company" TEXT NOT NULL,
    "mission_name" TEXT NOT NULL,
    "launch_date_unix" INTEGER NOT NULL,
    "isFavourite" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Favourites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "flight_number" INTEGER NOT NULL,
    "mission_patch" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "rocket_name" TEXT NOT NULL,
    "rocket_id" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "cost_per_launch" INTEGER NOT NULL,
    "company" TEXT NOT NULL,
    "mission_name" TEXT NOT NULL,
    "launch_date_unix" INTEGER NOT NULL,
    "isFavourite" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Launches_mission_name_key" ON "Launches"("mission_name");

-- CreateIndex
CREATE UNIQUE INDEX "Favourites_mission_name_key" ON "Favourites"("mission_name");
