import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log("Populando o banco de dados... ⏳");

async function main() {
    await prisma.user.upsert({
        where: { username: "XxPedroxX" },
        update: {},
        create: {
            name: "Pedro Silva",
            username: "XxPedroxX",
            email: "pedro@example.com",
            password: "pedro123",
            dailyGoal: 20,
            streak: 2,
            notificationType: "Afternoon",
            readerType: "Medium",
            averageReading: 15,
        }
    });

    await prisma.user.upsert({
        where: { username: "Vitoria_Dantas12" },
        update: {},
        create: {
            name: "Vitoria Dantas",
            username: "Vitoria_Dantas12",
            email: "vitoria@example.com",
            password: "vitoria123",
            dailyGoal: 12,
            streak: 8,
            notificationType: "morning",
            readerType: "Light",
            averageReading: 28,
        }
    });

    await prisma.user.upsert({
        where: { username: "Liah" },
        update: {},
        create: {
            name: "Marilia Teles",
            username: "Liah",
            email: "Liah@example.com",
            password: "Liaha123",
            dailyGoal: 30,
            streak: 12,
            notificationType: "night",
            readerType: "Heavy",
            averageReading: 30,
        }
    });
}

main()
  .then(async () => {
    console.log("Banco de dados populado com sucesso! 👍");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
