-- CreateTable
CREATE TABLE "SpecialMove" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SpecialMove_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CharacterToSpecialMove" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CharacterToSpecialMove_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CharacterToSpecialMove_B_index" ON "_CharacterToSpecialMove"("B");

-- AddForeignKey
ALTER TABLE "_CharacterToSpecialMove" ADD CONSTRAINT "_CharacterToSpecialMove_A_fkey" FOREIGN KEY ("A") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CharacterToSpecialMove" ADD CONSTRAINT "_CharacterToSpecialMove_B_fkey" FOREIGN KEY ("B") REFERENCES "SpecialMove"("id") ON DELETE CASCADE ON UPDATE CASCADE;

