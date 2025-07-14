import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log("Populando o banco de dados... ⏳");

async function main() {
    await prisma.user.upsert({
        where: { username: "XxPedroxX" },
        update: {},
        create: {
            username: "XxPedroxX",
            email: "pedro@example.com",
            password: "pedro123",
        }
    });

    await prisma.user.upsert({
        where: { username: "Vitoria_Dantas12" },
        update: {},
        create: {
            username: "Vitoria_Dantas12",
            email: "vitoria@example.com",
            password: "vitoria123",
        }
    });

    await prisma.user.upsert({
        where: { username: "Liah" },
        update: {},
        create: {
            username: "Liah",
            email: "Liah@example.com",
            password: "Liaha123",
            
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
