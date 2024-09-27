-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "ci" VARCHAR(10) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255),
    "last_name" VARCHAR(255),
    "phonenumber" CHAR(15),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "birthday" VARCHAR(255),
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_ci_key" ON "Users"("ci");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
